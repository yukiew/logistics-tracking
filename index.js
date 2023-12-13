// index.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/dbConfig');
const trackingRoutes = require('./src/routes/trackingRoutes');
const { initDatabase } = require('./initDatabase');

const app = express();
const port = 3000;

app.use(bodyParser.json());

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database models:', error);
  }
}

async function startServer() {
  return new Promise(async (resolve, reject) => {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
  
      await syncDatabase();
      await initDatabase();
      app.use('/api', trackingRoutes);
  
      const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        resolve({ app, server });
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      reject(error);
    }
  });
}

if (require.main === module) {
  startServer();
}

module.exports = startServer;
