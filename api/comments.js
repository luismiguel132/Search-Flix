import jwt from 'jsonwebtoken';
import { prisma } from './_lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;
const MAX_LEN = 1000;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function getQueryParams(req) {
  if (req.query && typeof req.query === 'object') return req.query;
  const url = new URL(req.url || '/', 'http://localhost');
  return Object.fromEntries(url.searchParams);
}

function getUserFromToken(req) {
  if (!JWT_SECRET) return null;
  const auth = req.headers.authorization || req.headers['authorization'];
  if (!auth?.startsWith('Bearer ')) return null;
  try { return jwt.verify(auth.split(' ')[1], JWT_SECRET); }
  catch { return null; }
}

function parseId(val) {
  const n = Number(val);
  return Number.isInteger(n) && n > 0 ? n : null;
}

function userSelect() {
  return { id: true, name: true, avatarUrl: true };
}

function fmtComment(c, loggedUserId = null) {
  return {
    id: c.id,
    content: c.content,
    edited: c.edited,
    createdAt: c.createdAt,
    likeCount: c._count?.likes ?? 0,
    likedByMe: loggedUserId ? c.likes?.some(l => l.userId === loggedUserId) : false,
    user: { id: c.user.id, name: c.user.name, avatarUrl: c.user.avatarUrl },
    replies: (c.replies ?? []).map(r => fmtReply(r, loggedUserId)),
  };
}

function fmtReply(r, loggedUserId = null) {
  return {
    id: r.id,
    content: r.content,
    edited: r.edited,
    commentId: r.commentId,
    createdAt: r.createdAt,
    likeCount: r._count?.likes ?? 0,
    likedByMe: loggedUserId ? r.likes?.some(l => l.userId === loggedUserId) : false,
    user: { id: r.user.id, name: r.user.name, avatarUrl: r.user.avatarUrl },
  };
}

function commentInclude(loggedUserId) {
  const likeFilter = loggedUserId
    ? { where: { userId: loggedUserId }, select: { userId: true } }
    : undefined;

  return {
    user: { select: userSelect() },
    _count: { select: { likes: true } },
    ...(likeFilter ? { likes: likeFilter } : {}),
    replies: {
      orderBy: { createdAt: 'asc' },
      include: {
        user: { select: userSelect() },
        _count: { select: { likes: true } },
        ...(likeFilter ? { likes: likeFilter } : {}),
      },
    },
  };
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const tokenUser = getUserFromToken(req);
  const loggedUserId = tokenUser?.userId ?? null;

  try {
    // ─── GET /api/comments?movieId=&ehSerie= ──────────────────────────
    if (req.method === 'GET') {
      const q = getQueryParams(req);
      const movieId = parseId(q.movieId);
      if (!movieId) return res.status(400).json({ error: 'movieId inválido' });
      const ehSerie = q.ehSerie === 'true';

      const comments = await prisma.comment.findMany({
        where: { movieId, ehSerie },
        orderBy: { createdAt: 'desc' },
        include: commentInclude(loggedUserId),
      });

      return res.status(200).json(comments.map(c => fmtComment(c, loggedUserId)));
    }

    // ─── POST /api/comments — publicar comentário ──────────────────────
    if (req.method === 'POST') {
      if (!tokenUser) return res.status(401).json({ error: 'Faça login para comentar' });

      const body = req.body ?? {};

      // Resposta a comentário
      if (body.action === 'reply') {
        const commentId = parseId(body.commentId);
        const content = body.content?.trim();
        if (!commentId) return res.status(400).json({ error: 'commentId inválido' });
        if (!content) return res.status(400).json({ error: 'Resposta vazia' });
        if (content.length > MAX_LEN) return res.status(400).json({ error: `Máximo ${MAX_LEN} caracteres` });

        const parent = await prisma.comment.findUnique({ where: { id: commentId } });
        if (!parent) return res.status(404).json({ error: 'Comentário não encontrado' });

        const reply = await prisma.reply.create({
          data: { commentId, userId: loggedUserId, content },
          include: {
            user: { select: userSelect() },
            _count: { select: { likes: true } },
          },
        });
        return res.status(201).json(fmtReply(reply, loggedUserId));
      }

      // Like/unlike num comentário
      if (body.action === 'like-comment') {
        const commentId = parseId(body.commentId);
        if (!commentId) return res.status(400).json({ error: 'commentId inválido' });

        const existing = await prisma.commentLike.findUnique({
          where: { commentId_userId: { commentId, userId: loggedUserId } },
        });

        if (existing) {
          await prisma.commentLike.delete({ where: { id: existing.id } });
          return res.status(200).json({ liked: false });
        } else {
          await prisma.commentLike.create({ data: { commentId, userId: loggedUserId } });
          return res.status(200).json({ liked: true });
        }
      }

      // Like/unlike numa resposta
      if (body.action === 'like-reply') {
        const replyId = parseId(body.replyId);
        if (!replyId) return res.status(400).json({ error: 'replyId inválido' });

        const existing = await prisma.replyLike.findUnique({
          where: { replyId_userId: { replyId, userId: loggedUserId } },
        });

        if (existing) {
          await prisma.replyLike.delete({ where: { id: existing.id } });
          return res.status(200).json({ liked: false });
        } else {
          await prisma.replyLike.create({ data: { replyId, userId: loggedUserId } });
          return res.status(200).json({ liked: true });
        }
      }

      // Novo comentário padrão
      const { movieId, ehSerie, content } = body;
      const parsedMovieId = parseId(movieId);
      const trimmedContent = content?.trim();

      if (!parsedMovieId) return res.status(400).json({ error: 'movieId inválido' });
      if (!trimmedContent) return res.status(400).json({ error: 'Comentário vazio' });
      if (trimmedContent.length > MAX_LEN) return res.status(400).json({ error: `Máximo ${MAX_LEN} caracteres` });

      const comment = await prisma.comment.create({
        data: { movieId: parsedMovieId, ehSerie: !!ehSerie, content: trimmedContent, userId: loggedUserId },
        include: commentInclude(loggedUserId),
      });

      return res.status(201).json(fmtComment(comment, loggedUserId));
    }

    // ─── PUT /api/comments — editar comentário ou resposta ────────────
    if (req.method === 'PUT') {
      if (!tokenUser) return res.status(401).json({ error: 'Não autorizado' });

      const body = req.body ?? {};
      const content = body.content?.trim();

      if (!content) return res.status(400).json({ error: 'Conteúdo vazio' });
      if (content.length > MAX_LEN) return res.status(400).json({ error: `Máximo ${MAX_LEN} caracteres` });

      // Editar resposta
      if (body.replyId) {
        const replyId = parseId(body.replyId);
        if (!replyId) return res.status(400).json({ error: 'replyId inválido' });

        const reply = await prisma.reply.findUnique({ where: { id: replyId } });
        if (!reply) return res.status(404).json({ error: 'Resposta não encontrada' });
        if (reply.userId !== loggedUserId) return res.status(403).json({ error: 'Sem permissão' });

        const updated = await prisma.reply.update({
          where: { id: replyId },
          data: { content, edited: true },
          include: {
            user: { select: userSelect() },
            _count: { select: { likes: true } },
            likes: { where: { userId: loggedUserId }, select: { userId: true } },
          },
        });
        return res.status(200).json(fmtReply(updated, loggedUserId));
      }

      // Editar comentário
      const commentId = parseId(body.commentId);
      if (!commentId) return res.status(400).json({ error: 'commentId inválido' });

      const comment = await prisma.comment.findUnique({ where: { id: commentId } });
      if (!comment) return res.status(404).json({ error: 'Comentário não encontrado' });
      if (comment.userId !== loggedUserId) return res.status(403).json({ error: 'Sem permissão' });

      const updated = await prisma.comment.update({
        where: { id: commentId },
        data: { content, edited: true },
        include: commentInclude(loggedUserId),
      });
      return res.status(200).json(fmtComment(updated, loggedUserId));
    }

    // ─── DELETE /api/comments — excluir comentário ou resposta ────────
    if (req.method === 'DELETE') {
      if (!tokenUser) return res.status(401).json({ error: 'Não autorizado' });

      const body = req.body ?? {};

      // Excluir resposta
      if (body.replyId) {
        const replyId = parseId(body.replyId);
        if (!replyId) return res.status(400).json({ error: 'replyId inválido' });

        const reply = await prisma.reply.findUnique({ where: { id: replyId } });
        if (!reply) return res.status(404).json({ error: 'Resposta não encontrada' });
        if (reply.userId !== loggedUserId) return res.status(403).json({ error: 'Sem permissão' });

        await prisma.reply.delete({ where: { id: replyId } });
        return res.status(200).json({ message: 'Resposta removida' });
      }

      // Excluir comentário
      const commentId = parseId(body.commentId);
      if (!commentId) return res.status(400).json({ error: 'commentId inválido' });

      const comment = await prisma.comment.findUnique({ where: { id: commentId } });
      if (!comment) return res.status(404).json({ error: 'Comentário não encontrado' });
      if (comment.userId !== loggedUserId) return res.status(403).json({ error: 'Sem permissão' });

      await prisma.comment.delete({ where: { id: commentId } });
      return res.status(200).json({ message: 'Comentário removido' });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('Erro em /api/comments:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
