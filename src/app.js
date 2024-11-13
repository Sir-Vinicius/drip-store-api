const express = require('express');
require('dotenv').config();
const cors = require('cors');

const productRouter = require('./routes/productRoute')
const userRouter = require('./routes/userRoute')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/products', productRouter)
app.use('/users', userRouter)

app.listen(process.env.PORT, () => {
    console.log(`O servidor está rodando na porta http://localhost:${process.env.PORT}`)
});