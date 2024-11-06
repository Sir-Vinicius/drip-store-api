const app =  require('./app');
const {port} = require('./config/dotenvConfig');

app.listen(port, () => {
    console.log(`O servidor está rodando na porta http://localhost:${port}`)
});