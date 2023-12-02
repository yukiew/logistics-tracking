const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql', // or 'postgres'
  host: 'localhost',
  username: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

module.exports = sequelize;
