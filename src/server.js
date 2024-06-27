import 'dotenv/config';
import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { getNameFromGeonameId, processFormData } from './formUtils.js';
import cors from 'cors';
import { logRequest } from './logger.js'; // Importando o middleware de logging

const app = express();
const port = process.env.PORT || 3000;
const geonamesUsername = process.env.GEONAMES_USERNAME || 'izann_brum';

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '../docs/public');

app.use('/public', express.static(publicDirectoryPath));

// Aplicando o middleware de logging em todas as rotas
app.use(logRequest);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../docs/index.html'));
});

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

app.get('/authorize', (req, res) => {
    res.json({ message: 'Authorize endpoint' });
});

app.post('/submit', async (req, res) => {
    const formData = req.body;
    console.log("RAW DATA:");
    console.log(formData);

    const processedData = await processFormData(formData);

    console.log("PROCESSED DATA:");
    console.log(processedData);

    res.render('resumo', { processedData });
});

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} environment on port ${port}`);
});
