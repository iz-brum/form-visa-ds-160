require('dotenv').config();
const express = require('express');
const path = require('path');
const { getNameFromGeonameId, processFormData } = require('./formUtils');

const app = express();
const port = process.env.PORT || 3000;
const geonamesUsername = process.env.GEONAMES_USERNAME;

// Middlewares para analisar o corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Defina o caminho absoluto para o diretório public
const publicDirectoryPath = path.join(__dirname, '../docs/public');

// Use o diretório public
app.use(express.static(publicDirectoryPath, {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.set('Content-Type', 'text/javascript');
    }
  }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

// Nova rota para buscar dados da API Geonames
app.get('/api/countries', async (req, res) => {
    try {
        const response = await fetch(`https://secure.geonames.org/countryInfoJSON?username=izann_brum`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados da API de países' });
    }
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
