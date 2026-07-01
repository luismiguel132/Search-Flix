import { PrismaClient } from '../generated/prisma/index.js';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient({
  datasourceUrl: process.env.SEARCHFLIX_PRISMA_DATABASE_URL,
});
const JWT_SECRET = process.env.JWT_SECRET;

function getUserFromToken(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try {
    return jwt.verify(auth.split(' ')[1], JWT_SECRET);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const user = getUserFromToken(req);
  if (!user) return res.status(401).json({ error: 'Não autorizado' });

  // GET — listar favoritos
  if (req.method === 'GET') {
    const favorites = await prisma.favorite.findMany({ where: { userId: user.userId } });
    return res.status(200).json(favorites);
  }

  // POST — adicionar favorito
  if (req.method === 'POST') {
    const { movieId, ehSerie } = req.body;
    if (!movieId) return res.status(400).json({ error: 'movieId obrigatório' });

    const fav = await prisma.favorite.upsert({
      where: { userId_movieId: { userId: user.userId, movieId: Number(movieId) } },
      update: {},
      create: { userId: user.userId, movieId: Number(movieId), ehSerie: !!ehSerie },
    });
    return res.status(201).json(fav);
  }

  // DELETE — remover favorito
  if (req.method === 'DELETE') {
    const { movieId } = req.body;
    if (!movieId) return res.status(400).json({ error: 'movieId obrigatório' });

    await prisma.favorite.deleteMany({
      where: { userId: user.userId, movieId: Number(movieId) },
    });
    return res.status(200).json({ message: 'Removido' });
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
