import jwt from 'jsonwebtoken';
import { prisma } from './_lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;
const MAX_CONTENT_LENGTH = 1000;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function getQueryParams(req) {
  if (req.query && typeof req.query === 'object') return req.query;

  const rawUrl = req.url || '/';
  const url = new URL(rawUrl, 'http://localhost');
  return Object.fromEntries(url.searchParams);
}

function getUserFromToken(req) {
  if (!JWT_SECRET) return null;

  const auth = req.headers.authorization || req.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) return null;

  try {
    return jwt.verify(auth.split(' ')[1], JWT_SECRET);
  } catch {
    return null;
  }
}

function parseMovieId(movieId) {
  const parsed = Number(movieId);
  if (!Number.isInteger(parsed) || parsed <= 0) return null;
  return parsed;
}

function parseEhSerie(value) {
  return value === true || value === 'true' || value === '1';
}

function formatComment(comment) {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    user: {
      id: comment.user.id,
      name: comment.user.name,
      avatarUrl: comment.user.avatarUrl,
    },
  };
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!JWT_SECRET) {
    console.error('JWT_SECRET não configurado');
    return res.status(500).json({ error: 'Configuração do servidor incompleta' });
  }

  try {
    if (req.method === 'GET') {
      const query = getQueryParams(req);
      const movieId = parseMovieId(query.movieId);
      const ehSerie = parseEhSerie(query.ehSerie);

      if (!movieId) return res.status(400).json({ error: 'movieId inválido' });

      const comments = await prisma.comment.findMany({
        where: { movieId, ehSerie },
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true },
          },
        },
      });

      return res.status(200).json(comments.map(formatComment));
    }

    if (req.method === 'POST') {
      const user = getUserFromToken(req);
      if (!user) return res.status(401).json({ error: 'Faça login para comentar' });

      const { movieId, ehSerie, content } = req.body ?? {};
      const parsedMovieId = parseMovieId(movieId);
      const trimmedContent = content?.trim();

      if (!parsedMovieId) return res.status(400).json({ error: 'movieId inválido' });
      if (!trimmedContent) return res.status(400).json({ error: 'Comentário não pode estar vazio' });
      if (trimmedContent.length > MAX_CONTENT_LENGTH) {
        return res.status(400).json({ error: `Comentário deve ter no máximo ${MAX_CONTENT_LENGTH} caracteres` });
      }

      const comment = await prisma.comment.create({
        data: {
          movieId: parsedMovieId,
          ehSerie: !!ehSerie,
          content: trimmedContent,
          userId: user.userId,
        },
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true },
          },
        },
      });

      return res.status(201).json(formatComment(comment));
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('Erro em /api/comments:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
