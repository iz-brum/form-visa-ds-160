import 'dotenv/config';
import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { getNameFromGeonameId, processFormData } from './formUtils.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const geonamesUsername = 'izann_brum';

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../docs/index.html'));
});

app.get('/api/countries', async (req, res) => {
    try {
        console.log('Accessing /api/countries route');
        const response = await fetch(`https://secure.geonames.org/countryInfoJSON?username=${geonamesUsername}`);
        console.log('Geonames API response:', response);
        if (!response.ok) {
            throw new Error(`Failed to access API: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Data received from Geonames API:', data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching country data from API:', error);
        res.status(500).json({ error: 'Failed to fetch country data from API' });
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
