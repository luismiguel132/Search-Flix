import bcrypt from 'bcryptjs';
import { prisma } from './_lib/prisma.js';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  try {
    const { name, email, password } = req.body ?? {};

    if (!email?.trim() || !password)
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });

    if (password.length < 6)
      return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name?.trim() || null;

    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) return res.status(409).json({ error: 'E-mail já cadastrado' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: trimmedName,
        email: normalizedEmail,
        password: hashed,
        avatarUrl: null,
      },
    });

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      userId: user.id,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    console.error('Erro em /api/register:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
