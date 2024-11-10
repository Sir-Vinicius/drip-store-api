const express = require('express');
require('dotenv').config();

const productRouter = require('./routes/productRoute')

const app = express();
app.use(express.json());
app.use('/products', productRouter)

app.listen(process.env.PORT, () => {
    console.log(`O servidor está rodando na porta http://localhost:${process.env.PORT}`)
});