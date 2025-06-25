const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DB_FILE = './clientes.json';

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, '[]');
}

app.post('/api/clientes', (req, res) => {
  const { nome, email, telefone } = req.body;
  if (!nome || !email || !telefone) {
    return res.status(400).json({ erro: 'Campos obrigatórios faltando!' });
  }

  const clientes = JSON.parse(fs.readFileSync(DB_FILE));
  clientes.push({ nome, email, telefone });
  fs.writeFileSync(DB_FILE, JSON.stringify(clientes, null, 2));
  res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!' });
});

app.get('/api/clientes', (req, res) => {
  const clientes = JSON.parse(fs.readFileSync(DB_FILE));
  res.json(clientes);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
