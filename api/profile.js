import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './_lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!JWT_SECRET) {
    console.error('JWT_SECRET não configurado');
    return res.status(500).json({ error: 'Configuração do servidor incompleta' });
  }

  const tokenUser = getUserFromToken(req);
  if (!tokenUser) {
    return res.status(401).json({ error: 'Sessão inválida ou expirada. Faça login novamente.' });
  }

  try {
    if (req.method === 'GET') {
      const user = await prisma.user.findUnique({
        where: { id: tokenUser.userId },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          createdAt: true,
          _count: {
            select: { favorites: true },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
          createdAt: user.createdAt,
          favoritesCount: user._count?.favorites ?? 0,
        },
      });
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const { name, avatarUrl, currentPassword, newPassword } = req.body ?? {};

      const existingUser = await prisma.user.findUnique({
        where: { id: tokenUser.userId },
      });

      if (!existingUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const updateData = {};

      // Atualização de nome (pode ser preenchido ou alterado)
      if (name !== undefined) {
        updateData.name = name?.trim() || null;
      }

      // Atualização de foto/avatar
      if (avatarUrl !== undefined) {
        updateData.avatarUrl = avatarUrl?.trim() || null;
      }

      // Atualização de senha
      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({ error: 'Informe a senha atual para alterá-la' });
        }

        const valid = await bcrypt.compare(currentPassword, existingUser.password);
        if (!valid) {
          return res.status(400).json({ error: 'Senha atual incorreta' });
        }

        if (newPassword.length < 6) {
          return res.status(400).json({ error: 'A nova senha deve ter no mínimo 6 caracteres' });
        }

        updateData.password = await bcrypt.hash(newPassword, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id: tokenUser.userId },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          createdAt: true,
          _count: {
            select: { favorites: true },
          },
        },
      });

      return res.status(200).json({
        message: 'Perfil atualizado com sucesso',
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          avatarUrl: updatedUser.avatarUrl,
          createdAt: updatedUser.createdAt,
          favoritesCount: updatedUser._count?.favorites ?? 0,
        },
      });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('Erro em /api/profile:', error);
    return res.status(500).json({ error: 'Erro interno ao processar perfil' });
  }
}
