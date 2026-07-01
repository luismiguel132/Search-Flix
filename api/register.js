import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: 'Preencha todos os campos' });

  if (password.length < 6)
    return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'E-mail já cadastrado' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, password: hashed } });

  return res.status(201).json({ message: 'Usuário criado com sucesso', userId: user.id });
}
