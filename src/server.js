import 'dotenv/config';
import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { getNameFromGeonameId, processFormData } from './formUtils.js';
import cors from 'cors';
import helmet from 'helmet';
import { logRequest } from './logger.js';
import csp from 'helmet-csp';

const app = express();
const port = process.env.PORT || 3000;
const geonamesUsername = process.env.GEONAMES_USERNAME || 'izann_brum';

app.use(helmet());
app.use(csp({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://code.jquery.com", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "https://secure.geonames.org"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: true,
    }
}));

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

// Configuração dos caminhos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '../docs/public');

// Servir arquivos estáticos
app.use('/public', express.static(publicDirectoryPath));

// Aplicando o middleware de logging em todas as rotas
app.use(logRequest);

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../docs/index.html'));
});

// Rota para obter informações de países da API Geonames
app.get('/api/countries', async (req, res) => {
    try {
        console.log('Accessing /api/countries route');
        const response = await fetch(`https://secure.geonames.org/countryInfoJSON?username=${geonamesUsername}`);
        if (!response.ok) {
            throw new Error(`Failed to access API: ${response.statusText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching pais data from API:', error);
        res.status(500).json({ error: 'Failed to fetch pais data from API' });
    }
});

// Rota para obter configurações da aplicação
app.get('/api/config', (req, res) => {
    try {
        const config = {
            username: geonamesUsername
        };
        res.json(config);
    } catch (error) {
        console.error('Error fetching configuration:', error);
        res.status(500).json({ error: 'Failed to fetch configuration' });
    }
});

// Rota para autorizar
app.get('/authorize', (req, res) => {
    res.json({ message: 'Authorize endpoint' });
});

// Rota para submissão de formulário
app.post('/submit', async (req, res) => {
    const formData = req.body;
    console.log("RAW DATA:");
    console.log(formData);

    const processedData = await processFormData(formData);

    console.log("PROCESSED DATA:");
    console.log(processedData);

    res.render('resumo', { processedData });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} environment on port ${port}`);
});
