import 'dotenv/config';
import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { getNameFromGeonameId, processFormData } from './formUtils.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const geonamesUsername = process.env.GEONAMES_USERNAME;

// Middleware CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

// Defina o caminho absoluto para o diretório public
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '../docs/public');

// Use o diretório public com o prefixo /public
app.use('/public', express.static(publicDirectoryPath));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

// Nova rota para buscar dados da API Geonames
app.get('/api/countries', async (req, res) => {
  try {
    console.log('Rota /api/countries acessada');
    const response = await fetch(`https://secure.geonames.org/countryInfoJSON?username=${geonamesUsername}`);
    console.log('Resposta da API Geonames:', response);
    if (!response.ok) {
      throw new Error(`Erro ao acessar API: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Dados recebidos da API Geonames:', data);
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados da API de países:', error);
    res.status(500).json({ error: 'Erro ao buscar dados da API de países' });
  }
});

// Nova rota authorize (exemplo de implementação)
app.get('/authorize', (req, res) => {
  res.json({ message: 'Authorize endpoint' });
});

app.post('/submit', async (req, res) => {
  const formData = req.body;
  console.log("DADOS BRUTOS:");
  console.log(formData);

  // Processar os dados do formulário para obter os nomes correspondentes
  const processedData = await processFormData(formData);

  console.log("DADOS PROCESSADOS:");
  console.log(processedData);

  res.render('resumo', { processedData });
});

app.listen(port, () => {
  console.log(`Servidor rodando no ambiente ${process.env.NODE_ENV || 'desenvolvimento'} na porta ${port}`);
});
