const faker = require('faker');
const Product = require('./models/Product');   

const generateProducts = async (count) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    const product = new Product({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
    });
    await product.save();
    products.push(product);
  }
  return products;
};

module.exports = generateProducts;
