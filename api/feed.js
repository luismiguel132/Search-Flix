import jwt from 'jsonwebtoken';
import { prisma } from './_lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function getUserId(req) {
  const auth = req.headers.authorization || req.headers['authorization'];
  if (!JWT_SECRET || !auth?.startsWith('Bearer ')) return null;
  try { return jwt.verify(auth.split(' ')[1], JWT_SECRET)?.userId ?? null; } catch { return null; }
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido' });

  const viewerId = getUserId(req);
  if (!viewerId) return res.status(401).json({ error: 'Faça login para ver seu feed' });

  try {
    const follows = await prisma.userFollow.findMany({
      where: { followerId: viewerId },
      select: { followingId: true },
    });
    const followedIds = follows.map(item => item.followingId);
    if (!followedIds.length) return res.status(200).json({ activity: [], followingCount: 0 });

    const [favorites, ratings] = await Promise.all([
      prisma.favorite.findMany({
        where: { userId: { in: followedIds } },
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
      }),
      prisma.userRating.findMany({
        where: { userId: { in: followedIds } },
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
      }),
    ]);

    const activity = [
      ...favorites.map(item => ({
        id: `favorite-${item.id}`, type: 'favorite', createdAt: item.createdAt,
        movieId: item.movieId, ehSerie: item.ehSerie, title: item.title, posterPath: item.posterPath,
        user: item.user,
      })),
      ...ratings.map(item => ({
        id: `rating-${item.id}`, type: 'rating', createdAt: item.createdAt,
        movieId: item.movieId, ehSerie: item.ehSerie, title: item.title, posterPath: item.posterPath,
        rating: item.rating, user: item.user,
      })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 100);

    return res.status(200).json({ activity, followingCount: followedIds.length });
  } catch (error) {
    console.error('Erro em /api/feed:', error);
    return res.status(500).json({ error: 'Erro interno ao carregar feed' });
  }
}
