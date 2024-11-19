# Drip Store Api

## Link para o Frontend

O frontend deste projeto pode ser encontrado no repositório abaixo:

[Frontend - Drip Store](https://github.com/darlison-calm/projeto-digital-store)

## Descrição do Projeto

A **Drip Store API** é uma aplicação backend desenvolvida como parte do projeto final do curso **Desenvolvimento Web Full Stack** da **Geração Tech**, uma iniciativa do **IEL Ceará** em parceria com o **Governo do Estado do Ceará** por meio da **Agência de Desenvolvimento do Estado do Ceará (Adece)**. O curso visa capacitar jovens na área de tecnologia, e as aulas são ministradas no **Digital College Brasil**.

Este projeto tem como objetivo implementar a API de uma loja online, lidando com funcionalidades básicas como a gestão de **usuários**, **produtos** e **categorias**, além de garantir a segurança das rotas através de **autenticação JWT**.

## Tecnologias Utilizadas

A API foi desenvolvida utilizando as seguintes tecnologias:

- **Node.js**: Para fornecer a possibilidade de executar JavaScript no lado do servidor.
- **Express.js**: Framework utilizado para criar e gerenciar as rotas da API.
- **Dotenv**: Usado para facilitar a configuração de variáveis de ambiente de forma segura e prática.
- **Nodemon**: Ferramenta que ajuda na produtividade durante o desenvolvimento, reiniciando automaticamente a aplicação ao detectar mudanças no código.
- **MySQL**: Banco de dados relacional utilizado para persistência de dados.
- **Sequelize**: ORM que facilita a interação com o banco de dados MySQL e melhora a produtividade ao manipular dados.
- **JWT (JSON Web Tokens)**: Utilizado para adicionar segurança e controle de acesso às rotas da API, gerenciando a autenticação do usuário.
- **Joi**: Biblioteca para validação de dados de entrada, garantindo que as informações recebidas na API estejam corretas e completas.
- **Bcrypt**: Usado para hash de senhas, garantindo que as credenciais dos usuários sejam armazenadas de forma segura.

## Como iniciar

### Requisitos

Para iniciar o projeto, você precisará ter o [Node.js](https://nodejs.org) instalado em sua máquina.

### 1. Instalação das dependências

Após instalar o Node.js, rode o seguinte comando para instalar as dependências do projeto:

```bash
npm install
```

### 2. Iniciar o banco de dados

Certifique-se de que o banco de dados esteja configurado corretamente e em execução. Para iniciar o banco de dados, use o comando:

```bash
npm run db
```

### 3. Iniciar a API

Para iniciar o servidor da API, execute o seguinte comando:

```bash
npm run dev
```

### 4. Configuração do ambiente

Certifique-se de que o arquivo `.env` esteja presente na raiz do projeto. Este arquivo contém as configurações necessárias, como a URL do banco de dados e a porta da API. Você pode usar o arquivo `.env.example` como referência para configurar o seu arquivo `.env`.

> **Nota**: É necessário ter o banco de dados rodando para que a API possa criar as tabelas e realizar as operações corretamente.

## Scripts do package.json

O arquivo `package.json` contém alguns scripts úteis para facilitar o desenvolvimento. Aqui estão os comandos mais importantes:

* **`npm run dev`**: Inicia o servidor da API em modo de desenvolvimento com `nodemon`, que reinicia automaticamente o servidor ao detectar mudanças no código.
* **`npm run db`**: Executa o script que sincroniza o banco de dados com os modelos definidos no Sequelize.
* **`npm run seed-products`**: Popula o banco de dados com dados de exemplo para os produtos (utilizando o arquivo `productsSeed.js`).
* **`npm run seed-products-images`**: Popula o banco de dados com imagens de exemplo para os produtos (utilizando o arquivo `productsImageSeed.js`).
