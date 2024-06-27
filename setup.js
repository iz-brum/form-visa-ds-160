import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lista de diretórios a serem criados
const directories = [
  path.join(__dirname, 'logs')
];

// Função para criar diretórios
function createDirectories() {
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Diretório criado: ${dir}`);
    } else {
      console.log(`Diretório já existe: ${dir}`);
    }
  });
}

// Criar diretórios
createDirectories();
