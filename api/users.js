import { prisma } from './_lib/prisma.js';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido' });

  const query = req.query || Object.fromEntries(new URL(req.url || '/', 'http://localhost').searchParams);
  const userId = parseId(query.id || query.userId);
  if (!userId) return res.status(400).json({ error: 'Usuário inválido' });

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, name: true, avatarUrl: true, createdAt: true,
        _count: { select: { favorites: true } },
        ratings: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    return res.status(200).json({
      user: {
        id: user.id, name: user.name, avatarUrl: user.avatarUrl, createdAt: user.createdAt,
        favoritesCount: user._count?.favorites ?? 0,
        ratings: user.ratings,
      },
    });
  } catch (error) {
    console.error('Erro em /api/users:', error);
    return res.status(500).json({ error: 'Erro interno ao carregar perfil' });
  }
}
