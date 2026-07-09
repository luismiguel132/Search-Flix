import jwt from 'jsonwebtoken';
import { prisma } from './_lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function getUserFromToken(req) {
  if (!JWT_SECRET) return null;

  const auth = req.headers.authorization;
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

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!JWT_SECRET) {
    console.error('JWT_SECRET não configurado');
    return res.status(500).json({ error: 'Configuração do servidor incompleta' });
  }

  const user = getUserFromToken(req);
  if (!user) return res.status(401).json({ error: 'Não autorizado' });

  try {
    if (req.method === 'GET') {
      const favorites = await prisma.favorite.findMany({ where: { userId: user.userId } });
      return res.status(200).json(favorites);
    }

    if (req.method === 'POST') {
      const { movieId, ehSerie } = req.body ?? {};
      const parsedMovieId = parseMovieId(movieId);
      if (!parsedMovieId) return res.status(400).json({ error: 'movieId inválido' });

      const fav = await prisma.favorite.upsert({
        where: { userId_movieId: { userId: user.userId, movieId: parsedMovieId } },
        update: { ehSerie: !!ehSerie },
        create: { userId: user.userId, movieId: parsedMovieId, ehSerie: !!ehSerie },
      });
      return res.status(201).json(fav);
    }

    if (req.method === 'DELETE') {
      const { movieId } = req.body ?? {};
      const parsedMovieId = parseMovieId(movieId);
      if (!parsedMovieId) return res.status(400).json({ error: 'movieId inválido' });

      await prisma.favorite.deleteMany({
        where: { userId: user.userId, movieId: parsedMovieId },
      });
      return res.status(200).json({ message: 'Removido' });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('Erro em /api/favorites:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
