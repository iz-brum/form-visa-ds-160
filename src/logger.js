import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração dos caminhos dos arquivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, '../logs/access.log');

// Objeto para armazenar contagens de acessos
let accessCounts = {};

// Função para incrementar a contagem de acessos a uma rota
function incrementAccessCount(route, ip) {
    if (!accessCounts[route]) {
        accessCounts[route] = { count: 0, ips: new Set() };
    }
    accessCounts[route].count += 1;
    accessCounts[route].ips.add(ip);
}

// Middleware para registrar acessos
export function logRequest(req, res, next) {
    const route = req.originalUrl;
    const ip = req.ip;

    incrementAccessCount(route, ip);

    const logEntry = `${new Date().toISOString()} - ${ip} - ${route}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Erro ao registrar acesso:', err);
        }
    });

    next();
}

// Função para salvar as contagens de acesso periodicamente
function saveAccessCounts() {
    const countsFilePath = path.join(__dirname, '../logs/accessCounts.json');
    const countsData = {};
    for (const route in accessCounts) {
        countsData[route] = {
            count: accessCounts[route].count,
            ips: Array.from(accessCounts[route].ips)
        };
    }
    fs.writeFile(countsFilePath, JSON.stringify(countsData, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar contagens de acesso:', err);
        }
    });
}

// Salvar as contagens de acesso a cada minuto
setInterval(saveAccessCounts, 60000);

export default { logRequest };
