const express = require('express');
const { port } = require('./config/dotenvConfig');
const app = express();
app.use(express.json());

// app.use("/products", productsRouter);

app.listen(port, () => {
    console.log(`O servidor está rodando na porta http://localhost:${port}`)
});