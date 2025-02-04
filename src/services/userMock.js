const faker = require('faker');
const User = require('../models/User');   

const generateUsers = async (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),   
    });
    await user.save();
    users.push(user);
  }
  return users;
};

module.exports = generateUsers;
