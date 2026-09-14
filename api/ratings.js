import jwt from 'jsonwebtoken';
import { prisma } from './_lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function getUserFromToken(req) {
  const auth = req.headers.authorization || req.headers['authorization'];
  if (!JWT_SECRET || !auth?.startsWith('Bearer ')) return null;
  try { return jwt.verify(auth.split(' ')[1], JWT_SECRET); } catch { return null; }
}

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function parseRating(value) {
  const rating = Number(value);
  return Number.isInteger(rating) && rating >= 1 && rating <= 10 ? rating : null;
}

function formatRating(rating) {
  return {
    id: rating.id,
    movieId: rating.movieId,
    ehSerie: rating.ehSerie,
    rating: rating.rating,
    title: rating.title,
    posterPath: rating.posterPath,
    createdAt: rating.createdAt,
    updatedAt: rating.updatedAt,
  };
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const q = req.query || Object.fromEntries(new URL(req.url || '/', 'http://localhost').searchParams);
      const movieId = parseId(q.movieId);
      const ehSerie = q.ehSerie === 'true';

      if (q.mine === 'true') {
        const user = getUserFromToken(req);
        if (!user) return res.status(401).json({ error: 'Faça login para ver suas notas' });
        const ratings = await prisma.userRating.findMany({
          where: { userId: user.userId },
          orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json(ratings.map(formatRating));
      }

      if (!movieId) return res.status(400).json({ error: 'movieId inválido' });
      const ratings = await prisma.userRating.findMany({ where: { movieId, ehSerie } });
      const total = ratings.reduce((sum, item) => sum + item.rating, 0);
      const user = getUserFromToken(req);
      const mine = user ? ratings.find(item => item.userId === user.userId)?.rating ?? null : null;

      return res.status(200).json({
        average: ratings.length ? Number((total / ratings.length).toFixed(1)) : null,
        count: ratings.length,
        myRating: mine,
      });
    }

    const user = getUserFromToken(req);
    if (!user) return res.status(401).json({ error: 'Faça login para avaliar' });

    if (req.method === 'POST') {
      const { movieId: rawMovieId, ehSerie, rating: rawRating, title, posterPath } = req.body || {};
      const movieId = parseId(rawMovieId);
      const rating = parseRating(rawRating);
      const cleanTitle = title?.trim();

      if (!movieId) return res.status(400).json({ error: 'movieId inválido' });
      if (!rating) return res.status(400).json({ error: 'A nota deve estar entre 1 e 10' });
      if (!cleanTitle) return res.status(400).json({ error: 'Título do conteúdo é obrigatório' });

      const saved = await prisma.userRating.upsert({
        where: { userId_movieId_ehSerie: { userId: user.userId, movieId, ehSerie: !!ehSerie } },
        create: {
          userId: user.userId, movieId, ehSerie: !!ehSerie, rating,
          title: cleanTitle, posterPath: posterPath?.trim() || null,
        },
        update: {
          rating, title: cleanTitle, posterPath: posterPath?.trim() || null,
        },
      });
      return res.status(200).json(formatRating(saved));
    }

    if (req.method === 'DELETE') {
      const body = req.body || {};
      const movieId = parseId(body.movieId);
      if (!movieId) return res.status(400).json({ error: 'movieId inválido' });
      await prisma.userRating.delete({
        where: { userId_movieId_ehSerie: { userId: user.userId, movieId, ehSerie: !!body.ehSerie } },
      });
      return res.status(200).json({ message: 'Nota removida' });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    if (error?.code === 'P2025') return res.status(404).json({ error: 'Nota não encontrada' });
    console.error('Erro em /api/ratings:', error);
    return res.status(500).json({ error: 'Erro interno ao processar nota' });
  }
}
