# API - Gerenciamento de Produtos

Esta API permite a criação e atualização de produtos, incluindo informações sobre nome, preço, imagens e categorias.

## Endpoints

### Criar Produto

- **Método HTTP**: `POST`
- **URL**: `http://localhost:3000/products`

#### Corpo da Requisição

```json
{
  "name": "Tênis Nike Air Max",
  "slug": "tenis-nike-air-max",
  "use_in_menu": true,
  "stock": 10,
  "price": 299,
  "price_with_discount": 259,
  "mark": "Nike",
  "colors": ["#FF5733", "#33FF57"],
  "backgrounds": ["#FFFFFF", "#F0F0F0"],
  "imagesUrl": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "category": "Corrida"
};

### Atualizar Produtos - PUT 
 **URL**: `http://localhost:3000/products/:id`


### Corpo da Requisição
{
  
  "name": "Tênis Nike Air Max - Atualizado",
  "slug": "tenis-nike-air-max-atualizado",
  "stock": 50,
  "description": "Descrição atualizada do produto.",
  "price": 289.99,
  "price_with_discount": 249.99,
  "mark": "Nike",
  "images": [
    { "id": 1, "deleted": true },
    { "id": 2, "path": "https://example.com/image2-updated.jpg" },
    { "content": "https://example.com/new-image.jpg" }
  ]
}


