const { BCRYPT_SALT } = require('../config/env');
const User = require('../models/user.model');
const { generateSalt, hashPassword } = require('../utils');

const seedAdmin = async () => {
  const foundAdmin = await User.find({ role: 'admin' });
  if (foundAdmin.length < 1) {
    const salt = await generateSalt(Number(BCRYPT_SALT));
    const data = {
      firstName: 'Church',
      lastName: 'Admin',
      email: 'admin@gmail.com',
      phone: '08011223344',
      password: await hashPassword('testing', salt),
      address: 'F5 Police Estate Kubwa',
      dateOfBirth: '26/08/1996',
      occupation: 'Admin',
      role: 'admin',
      gender: 'male',
      isMarried: false,
      units: ['Choir'],
      profileImg: 'image url here',
    };

    const createdAdmin = await User.create(data);
    if (!createdAdmin) {
      console.log('Unable to seed data');
      return;
    }
    console.log('Admin Seeding Successful');
    return;
  }
  return;
};

module.exports = seedAdmin;
