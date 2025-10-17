const express = require('express');
const app = express();
const port = 3000;

// Middleware para habilitar CORS (necessário para que o frontend app.wifinafesta.com.br possa chamar a api.wifinafesta.com.br)
app.use((req, res, next) => {
    // Altere '*' para 'https://app.wifinafesta.com.br' em produção para maior segurança,
    // mas por enquanto, manteremos o '*' para simplificar os testes de CORS.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Middleware para processar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rota de Health Check/Status
app.get('/status', (req, res) => {
    const uptimeSeconds = process.uptime();
    const uptimeMinutes = Math.floor(uptimeSeconds / 60);
    const uptimeHours = Math.floor(uptimeMinutes / 60);
    
    res.status(200).json({
        status: 'OK',
        message: 'API WifiNaFesta em execução e saudável.',
        environment: 'VPS Ubuntu',
        time: new Date().toISOString(),
        uptime: `${uptimeHours}h ${uptimeMinutes % 60}m ${Math.floor(uptimeSeconds) % 60}s`
    });
});

// Mensagem de log no console
app.listen(port, () => {
    console.log(`API Server rodando em http://localhost:${port}`);
    console.log(`Endpoint de status: /status`);
});

// Exporta o app (útil para testes futuros, mas mantém a estrutura)
module.exports = app;
