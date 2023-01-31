const faker = require('faker');

class usersServices {
  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    const limit = 20;
    for(let i=0;i<limit;i++){
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.imageUrl(),
        city: faker.address.cityName(),
        email: faker.internet.email(),
      })
    }
  }

  create(data){
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  find(){
    return this.users;
  }

  findOne(id){
    return this.users.find(item => item.id === id);
  }

  update(id, changes){
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("User not found! :(");
    } else {
      const user = this.users[index];
      this.users[index] = {
        ...user,
        ...changes
      }
    }
  }

  delete(id){
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error("User not found! :(");
    }
    this.users.splice(index, 1);
    return{ id };
  }
}

module.exports = usersServices;
