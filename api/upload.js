import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
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
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const tokenUser = getUserFromToken(req);
  if (!tokenUser) {
    return res.status(401).json({ error: 'Não autorizado. Faça login novamente.' });
  }

  try {
    const { filename, fileData, contentType } = req.body ?? {};

    if (!fileData) {
      return res.status(400).json({ error: 'Nenhum arquivo ou dado de imagem enviado' });
    }

    const safeFilename = `avatar-${tokenUser.userId}-${Date.now()}-${(filename || 'image.png').replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // Se o token do Vercel Blob estiver configurado, tenta fazer upload via @vercel/blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = await import('@vercel/blob');
        const buffer = Buffer.from(fileData.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const blob = await put(safeFilename, buffer, {
          access: 'public',
          contentType: contentType || 'image/jpeg',
        });

        return res.status(200).json({
          url: blob.url,
          storage: 'vercel-blob',
          message: 'Imagem enviada para o Vercel Blob com sucesso!',
        });
      } catch (blobErr) {
        console.warn('Falha no upload do Vercel Blob, usando fallback:', blobErr);
      }
    }

    // Fallback: se for uma Data URL direta, retorna a própria URL / imagem para persistência
    if (fileData.startsWith('data:image/')) {
      return res.status(200).json({
        url: fileData,
        storage: 'data-url',
        message: 'Imagem processada com sucesso!',
      });
    }

    return res.status(200).json({
      url: fileData,
      storage: 'direct',
      message: 'Imagem processada!',
    });
  } catch (error) {
    console.error('Erro em /api/upload:', error);
    return res.status(500).json({ error: 'Erro ao processar imagem' });
  }
}
