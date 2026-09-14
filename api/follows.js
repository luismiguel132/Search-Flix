import jwt from 'jsonwebtoken';
import { prisma } from './_lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function getUserId(req) {
  const auth = req.headers.authorization || req.headers['authorization'];
  if (!JWT_SECRET || !auth?.startsWith('Bearer ')) return null;
  try { return jwt.verify(auth.split(' ')[1], JWT_SECRET)?.userId ?? null; } catch { return null; }
}

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

async function followSummary(viewerId, targetId) {
  const [target, relationship] = await Promise.all([
    prisma.user.findUnique({
      where: { id: targetId },
      select: { _count: { select: { followers: true, following: true } } },
    }),
    viewerId && viewerId !== targetId
      ? prisma.userFollow.findUnique({ where: { followerId_followingId: { followerId: viewerId, followingId: targetId } } })
      : null,
  ]);
  if (!target) return null;
  return {
    followersCount: target._count.followers,
    followingCount: target._count.following,
    isFollowing: Boolean(relationship),
  };
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const query = req.query || Object.fromEntries(new URL(req.url || '/', 'http://localhost').searchParams);
    const targetId = parseId(query.userId || query.id || req.body?.userId || req.body?.followingId);
    if (!targetId) return res.status(400).json({ error: 'Usuário inválido' });

    const viewerId = getUserId(req);
    if (req.method === 'GET') {
      const summary = await followSummary(viewerId, targetId);
      if (!summary) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.status(200).json(summary);
    }

    if (!viewerId) return res.status(401).json({ error: 'Faça login para seguir usuários' });
    if (viewerId === targetId) return res.status(400).json({ error: 'Você não pode seguir a si mesmo' });

    const target = await prisma.user.findUnique({ where: { id: targetId }, select: { id: true } });
    if (!target) return res.status(404).json({ error: 'Usuário não encontrado' });

    if (req.method === 'POST') {
      await prisma.userFollow.upsert({
        where: { followerId_followingId: { followerId: viewerId, followingId: targetId } },
        create: { followerId: viewerId, followingId: targetId },
        update: {},
      });
      return res.status(200).json(await followSummary(viewerId, targetId));
    }

    if (req.method === 'DELETE') {
      await prisma.userFollow.deleteMany({ where: { followerId: viewerId, followingId: targetId } });
      return res.status(200).json(await followSummary(viewerId, targetId));
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('Erro em /api/follows:', error);
    return res.status(500).json({ error: 'Erro interno ao processar seguidores' });
  }
}
