const express = require('express');
require('dotenv').config();
const cors = require('cors');

const productRouter = require('./routes/productRoute')
const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');

const app = express();
app.use(cors({origin: 'http://localhost:5173',}));
app.use(express.json());
app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.listen(process.env.PORT, () => {
    console.log(`O servidor está rodando na porta http://localhost:${process.env.PORT}`)
});