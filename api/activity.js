import jwt from 'jsonwebtoken';
import { prisma } from './_lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function getViewerId(req) {
  const auth = req.headers.authorization || req.headers['authorization'];
  if (!JWT_SECRET || !auth?.startsWith('Bearer ')) return null;
  try { return jwt.verify(auth.split(' ')[1], JWT_SECRET)?.userId ?? null; } catch { return null; }
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido' });

  const query = req.query || Object.fromEntries(new URL(req.url || '/', 'http://localhost').searchParams);
  const userId = parseId(query.userId || query.id);
  if (!userId) return res.status(400).json({ error: 'Usuário inválido' });

  try {
    const [user, favorites, ratings] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true, name: true, avatarUrl: true, createdAt: true,
          _count: { select: { favorites: true, followers: true, following: true } },
        },
      }),
      prisma.favorite.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
      prisma.userRating.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
    ]);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const activity = [
      ...favorites.map(item => ({
        id: `favorite-${item.id}`, type: 'favorite', createdAt: item.createdAt,
        movieId: item.movieId, ehSerie: item.ehSerie, title: item.title, posterPath: item.posterPath,
      })),
      ...ratings.map(item => ({
        id: `rating-${item.id}`, type: 'rating', createdAt: item.createdAt,
        movieId: item.movieId, ehSerie: item.ehSerie, title: item.title, posterPath: item.posterPath,
        rating: item.rating,
      })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const viewerId = getViewerId(req);
    const isFollowing = viewerId && viewerId !== userId
      ? Boolean(await prisma.userFollow.findUnique({ where: { followerId_followingId: { followerId: viewerId, followingId: userId } } }))
      : false;

    return res.status(200).json({
      user: {
        id: user.id, name: user.name, avatarUrl: user.avatarUrl, createdAt: user.createdAt,
        favoritesCount: user._count.favorites,
        followersCount: user._count.followers,
        followingCount: user._count.following,
      },
      isFollowing,
      activity,
    });
  } catch (error) {
    console.error('Erro em /api/activity:', error);
    return res.status(500).json({ error: 'Erro interno ao carregar atividade' });
  }
}
