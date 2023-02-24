const faker = require('faker');
const boom = require("@hapi/boom")
const pool = require("../libs/postgres.pool");

class productsServices {
  constructor(){
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }

  generate(){
    const limit=100;
    for(let index=0;index<limit;index++){
      this.products.push({
        id: faker.datatype.uuid(),
        name:faker.commerce.productName(),
        price:parseInt(faker.commerce.price(),10),
        image:faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
        count: ++index
      });
      index--;
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data // esto es Spread operation
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound("Product not found");
    }
    if (product.isBlock) {
      throw boom.conflict("Product is block");
    }
    return product;
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    } else {
      const product = this.products[index]
      this.products[index] = {
        ...product,
        ...changes
      }
      return this.products[index];
    }
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    this.products.splice(index,1);
    return { id }
  }
}

module.exports = productsServices;
