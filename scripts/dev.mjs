import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const children = [];

function run(command, args, label) {
  const child = spawn(command, args, {
    cwd: projectRoot,
    stdio: 'inherit',
    // Não use o shell do Windows: o caminho do Node normalmente contém
    // espaços (por exemplo, "C:\\Program Files\\nodejs") e seria truncado.
    shell: false,
    env: {
      ...process.env,
      API_PORT: process.env.API_PORT || '3001',
    },
  });

  child.on('exit', (code, signal) => {
    if (shuttingDown) return;
    console.error(`[${label}] encerrou (code=${code}, signal=${signal ?? 'none'})`);
    shutdown(code ?? 1);
  });

  children.push(child);
  return child;
}

let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM');
  }

  setTimeout(() => process.exit(exitCode), 300).unref();
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

run('node', ['./scripts/api-server.mjs'], 'api');
run(process.execPath, [path.join(projectRoot, 'node_modules/vite/bin/vite.js'), '--port', '3000'], 'vite');

console.log('Search-Flix: front em http://localhost:3000 | API em http://127.0.0.1:3001 (proxy /api)');
