// index.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/dbConfig');
const trackingRoutes = require('./src/routes/trackingRoutes');
const trackingModel = require('./src/models/trackingModel');
const cron = require('node-cron');


const app = express();
const port = 3000;

app.use(bodyParser.json());

async function syncDatabase() {
  try {
    await sequelize.sync();
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

const generateTrackingReport = async () => {
  try {
    const trackingSummary = await trackingModel.Shipment.findAll({
      attributes: ['tracking_status', [sequelize.fn('COUNT', sequelize.col('tracking_status')), 'count']],
      group: ['tracking_status'],
    });

    const result = {
      created_dt: new Date().toISOString(),
      trackingSummary: {},
    };

    trackingSummary.forEach((status) => {
      result.trackingSummary[status.tracking_status] = status.get('count');
    });

    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('Error generating tracking report:', error);
  }
};

if (require.main === module) {
  startServer();
  cron.schedule('0 12 * * *', () => {
    generateTrackingReport();
  });
}



module.exports = startServer;
