const connection = require('./config');
require('../../models/usersModel');

(async () => {
    try {
        // Testa conexão com banco de dados.
        await connection.authenticate();
        console.log('Conexão com o banco estabelecida com sucesso!')
        // Sincroniza os Modelos com o banco de dados.
        await connection.sync({alter:true})
        console.log('Modelos sincronizados com sucesso!')
    } catch (error) {
        console.log('Erro ao conectar ou sincronizar com o banco de dados:  ', error)
    } finally {
        // Encerra a conexão com o banco de dados após a sincronização
        await connection.close();
        console.log('Conexão com o banco de dados encerrada!')
    }
})();