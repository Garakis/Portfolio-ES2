const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configs
app.use(cors());
app.use(express.json());

// Servir o Frontend Estático
app.use(express.static(path.join(__dirname, '../frontend')));

// Mock Dabase 
const projectsFilePath = path.join(__dirname, 'data', 'projects.json');

// API - Obter projetos
app.get('/api/projects', (req, res) => {
    fs.readFile(projectsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler projetos:', err);
            return res.status(500).json({ error: 'Falha ao carregar os projetos.' });
        }
        res.json(JSON.parse(data));
    });
});

// API - Envio de contato
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Validação básica
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Aqui simularia o envio de e-mail ou adição num BD
    console.log(`Nova mensagem de contato de ${name} (${email}): ${message}`);

    // Resposta simulando sucesso do servidor
    setTimeout(() => {
        res.status(201).json({ success: true, message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.' });
    }, 1000); // Simulando delay de rede/processamento
});

// Qualquer outra rota é redirecionada para o index.html (SPA feel)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse http://localhost:${PORT}`);
});
