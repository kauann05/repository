const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'seu_banco_de_dados'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota GET para buscar dados
app.get('/dados', (req, res) => {
  const query = 'SELECT * FROM sua_tabela';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Rota POST para adicionar dados
app.post('/dados', (req, res) => {
  const novoDado = req.body;
  const query = 'INSERT INTO sua_tabela SET ?';
  db.query(query, novoDado, (err, result) => {
    if (err) throw err;
    res.send('Dado adicionado com sucesso!');
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
