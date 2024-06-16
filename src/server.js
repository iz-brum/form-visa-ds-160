const express = require('express');
const path = require('path');
const { getNameFromGeonameId, processFormData } = require('./formUtils');

const app = express();
const port = 3000;

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
  console.log(`Servidor rodando em http://localhost:${port}`);
});
