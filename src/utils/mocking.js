import { faker } from '@faker-js/faker';
import User from '../models/User.js';
import Product from '../models/Product.js';

 
export const generateUsers = async (numUsers) => {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
        const user = new User({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: Math.random() > 0.5 ? 'user' : 'admin',
            pets: [],
        });
        await user.save();
        users.push(user);
    }
    return users;
};

export const generateProducts = async (numProducts) => {
    const products = [];
    for (let i = 0; i < numProducts; i++) {
        const product = new Product({
            name: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price()),
            description: faker.commerce.productDescription(),
        });
        await product.save();
        products.push(product);
    }
    return products;
};
