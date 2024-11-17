const productList = [
  {
    name: "K-Swiss V8 - Masculino",
    mark: "Adidas",
    model: "Casual",
    price: 300,
    price_with_discount: 250,
    colors: ["#6FEEFF", "#FF6969", "#5E5E5E", "#6D70B7"],
    backgrounds: ["#E2E3FF", "#FFE8BC", "#FFC0BC", "#DEC699", "#E8DFCF"]
  },
  {
    name: "Tênis Adidas Ultraboost 22 Masculino",
    mark: "Adidas",
    model: "Running",
    price: 600,
    price_with_discount: 540,
   colors: ["#FF5733", "#C70039", "#900C3F", "#581845"],
    backgrounds: ["#F0E68C", "#FFD700", "#FF6347", "#4682B4", "#D3D3D3"]
  },
  {
    name: "Tênis Puma Flyer Runner BDP",
    mark: "Puma",
    model: "Running",
    referencia: "57382014",
    price: 350,
    price_with_discount: 315,
    colors: ["#4B0082", "#800080", "#FF00FF", "#FF1493"],
    backgrounds: ["#8A2BE2", "#7FFF00", "#D2691E", "#FF4500", "#2E8B57"]
  },
  {
    name: "Tênis Asics Gel-Kayano 28",
    mark: "Asics",
    model: "Running",
    referencia: "64829103",
    price: 700,
    price_with_discount: 630,
    colors: ["#00FF00", "#ADFF2F", "#32CD32", "#7FFF00"],
    backgrounds: ["#98FB98", "#00FA9A", "#00FF7F", "#2E8B57", "#3CB371"]
  },
  {
    name: "Tênis Mizuno Wave Prophecy X",
    mark: "Mizuno",
    model: "Running",
    price: 800,
    price_with_discount: 720,
   colors: ["#FFD700", "#FFA500", "#FF8C00", "#FF4500"],
    backgrounds: ["#FFD700", "#FFA500", "#FF8C00", "#FF4500", "#DAA520"]
  },
  {
    name: "Tênis New Balance 574",
    mark: "New Balance",
    model: "Casual",
    price: 500,
    price_with_discount: 450,
    colors: ["#0000FF", "#000080", "#4169E1", "#6495ED"],
    backgrounds: ["#87CEEB", "#4682B4", "#1E90FF", "#00BFFF", "#5F9EA0"]
  },
  {
    name: "Tênis Reebok Nano X1",
    mark: "Reebok",
    model: "Training",
    price: 400,
    price_with_discount: 360,
    colors: ["#A52A2A", "#B22222", "#DC143C", "#FF0000"],
    backgrounds: ["#FA8072", "#E9967A", "#F08080", "#CD5C5C", "#8B0000"]
  },
  {
    name: "Tênis Under Armour Charged Commit 3",
    mark: "Under Armour",
    model: "Training",
    price: 450,
    price_with_discount: 405,
   colors: ["#FF69B4", "#FF1493", "#DB7093", "#C71585"],
    backgrounds: ["#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#DB7093"]
  },
  {
    name: "Tênis Converse Chuck Taylor All Star",
    mark: "Converse",
    model: "Casual",
    price: 250,
    price_with_discount: 225,
    colors: ["#FFFFFF", "#DCDCDC", "#C0C0C0", "#A9A9A9"],
    backgrounds: ["#F5F5F5", "#DCDCDC", "#C0C0C0", "#A9A9A9", "#808080"]
  },
  {
    name: "Tênis Vans Old Skool",
    mark: "Vans",
    model: "Casual",
    price: 300,
    price_with_discount: 270,
   colors: ["#000000", "#2F4F4F", "#696969", "#808080"],
    backgrounds: ["#000000", "#2F4F4F", "#696969", "#808080", "#A9A9A9"]
  },
  {
    name: "Tênis Fila Disruptor 2",
    mark: "Fila",
    model: "Casual",
    price: 320,
    price_with_discount: 288,
   colors: ["#FF0000", "#B22222", "#8B0000", "#FF6347"],
    backgrounds: ["#FF4500", "#FF6347", "#FF7F50", "#FFA07A", "#CD5C5C"]
  },
  {
    name: "Tênis Skechers Go Walk 5",
    mark: "Skechers",
    model: "Casual",
   
    price: 380,
    price_with_discount: 342,
   colors: ["#FFD700", "#DAA520", "#B8860B", "#FF8C00"],
    backgrounds: ["#FFD700", "#DAA520", "#B8860B", "#FF8C00", "#FFA500"]
  },
  {
    name: "Tênis Saucony Kinvara 12",
    mark: "Saucony",
    model: "Running",
    price: 550,
    price_with_discount: 495,
   colors: ["#008080", "#20B2AA", "#40E0D0", "#48D1CC"],
    backgrounds: ["#AFEEEE", "#7FFFD4", "#66CDAA", "#5F9EA0", "#4682B4"]
  },
  {
    name: "Tênis Brooks Ghost 14",
    mark: "Brooks",
    model: "Running",
    price: 620,
    price_with_discount: 558,
   colors: ["#8A2BE2", "#4B0082", "#6A5ACD", "#483D8B"],
    backgrounds: ["#9370DB", "#8A2BE2", "#4B0082", "#6A5ACD", "#483D8B"]
  },
  {
    name: "Tênis Hoka One One Clifton 8",
    mark: "Hoka One One",
    model: "Running",
    price: 650,
    price_with_discount: 585,
    backgrounds: ["#FF6347", "#FF4500", "#FF7F50", "#FF8C00", "#FFD700"]
  },
  {
    name: "Tênis Nike Revolution 6 Next Nature Masculino",
    mark: "Nike",
    model: "Casual",
    price: 300,
    price_with_discount: 250,
   colors: ["#6FEEFF", "#FF6969", "#5E5E5E", "#6D70B7"],
    backgrounds: ["#E2E3FF", "#FFE8BC", "#FFC0BC", "#DEC699", "#E8DFCF"]
  }
];

const productsMap = productList.map((product)=> {
  product.slug = product.name.toLowerCase().replace(/\s+/g, '-');
  return product;
})

module.exports = productsMap;