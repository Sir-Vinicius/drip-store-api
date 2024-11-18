const Image = require('../models/productImageModel');
const Product = require('../models/productModel');
const imageUrls = [
  "https://i.ibb.co/XZzRvBJ/Layer-1aa-2.png",
  "https://cdn.awsli.com.br/600x450/1621/1621592/produto/178661445/fbaf991a78bc4896a3e9ad7800abcec6_9366-sugbwn-g7y1qcudzg.png",
  "https://cdnv2.moovin.com.br/santaclara/imagens/produtos/det/tenis-puma-flyer-runner-bdp-1950600237-824cd043841d6c0e9fb37a72304af3d9.png",
  "https://acdn.mitiendanube.com/stores/001/038/770/products/1011b189_750-png-accaae1be5b9a497fe17186329457606-1024-1024.png",
  "https://blog.wtennis.com.br/wp-content/uploads/2021/04/mizuno-wave-prophecy-X.png",
  "https://cdnv2.moovin.com.br/genko/imagens/produtos/det/tenis-new-balance-574-v2-ml574-gac-aec2e1870e0473423434b1324dc8b748.png",
  "https://cdn11.bigcommerce.com/s-azs446wiic/images/stencil/1280x1280/products/587/7407/o6wgvlrtcm8bugygtcma__12018.1688136695.png?c=2",
  "https://underarmourcol.vtexassets.com/arquivos/ids/528917/3023703-006_N11_1.png?v=638120963541900000",
  "https://images.tcdn.com.br/img/img_prod/772596/tenis_converse_chuck_taylor_all_star_cano_alto_hi_preto_ct15640001_1929_1_648e5e1a402f160837207192daa84b27.png",
  "https://adaptive-images.uooucdn.com.br/tr:w-1100,h-1594,c-at_max,pr-true,q-80/a22343-ogxys3ltwt0/pv/9d/b0/91/c8a60453ee47f940369c346f58.png",
  "https://i5.walmartimages.com/seo/Fila-Disruptor-Ii-X-Ray-Tracer-Mens-Shoes-Size-8-5-Color-White-Navy-Red_1bff748c-0484-46f4-8704-40e7903d4f3c.c5d183ef32beed4d9ad05edf3f248eb2.png",
  "https://17889.cdn.simplo7.net/static/17889/sku/mulheres-tenis-tenis-skechers-124206-go-walk-5-dreamy-com-solado-ultra-go--p-1699387855932.png",
  "https://www.rodrigoroehniss.com.br/wp-content/uploads/2021/01/Saucony_Kinvara_12_Site-removebg-preview.png",
  "https://www.brooksrunning.com/on/demandware.static/-/Sites-brooks-master-catalog/default/dw7f053f2b/original/120356/120356-531-l-ghost-14-womens-cushion-running-shoe.png",
  "https://i.ibb.co/Jysdmz6/White-Sneakers-PNG-Clipart-2.png",
  "https://sportamore.com/cdn/shop/products/60457-83_006.png?v=1680751838&width=720",
  "https://i5.walmartimages.com/seo/Skechers-Women-s-Summits-Fresh-Impression-Wide-Width-Available_21d6d3e1-8ba0-4240-9db1-a1676e174c94.970f4f1c03363d7937e9f755bfa1b363.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
  "https://i5.walmartimages.com/seo/Reebok-Flexagon-Force-4-Men-s-Training-Shoes_77f66c48-0a2e-4fdd-bc11-5df23f415711.3836ce9f512898f510a80e722b64cecd.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
  "https://i5.walmartimages.com/seo/Reebok-Flexagon-Energy-4-Men-s-Training-Shoes_d471c3d7-021b-48a5-a393-100eed46d379.5eb1d1074e13ebda7095a100d4045c4e.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"
]

const seedImages = async () => {
  try {
    const products = await Product.findAll();

    if (!products.length) {
      console.error('Nenhum produto encontrado no banco de dados!');
      return;
    }

    if (imageUrls.length > products.length) {
      console.warn('Existem mais imagens do que produtos. Algumas imagens serão ignoradas.');
    }
    const seedData = [];
    for (const product of products) {    
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        seedData.push({
          productId: product.id,
          path: imageUrls[randomIndex],
        });
      }
    }
    
    await Image.bulkCreate(seedData);
    console.log('Imagens dos produtos cadastradas com sucesso!');
    console.log('');
  } catch (error) {
    console.error('Erro ao cadastrar imagens dos produtos:', error);
  }
};

seedImages()