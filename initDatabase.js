// initDatabase.js
const trackingModel = require('./src/models/trackingModel');

const { locations, recipients } = require('./data');


const initDatabase = async () => {
  try {
    // 檢查位置數據是否已存在
    const existingLocations = await trackingModel.Location.findAll();
    if (existingLocations.length === 0) {
      await trackingModel.Location.bulkCreate(locations);
      console.log('Locations data has been inserted into the database.');
    } else {
      console.log('Locations data already exists in the database.');
    }

    const existingRecipients = await trackingModel.Recipient.findAll();
    if (existingRecipients.length === 0) {
      await trackingModel.Recipient.bulkCreate(recipients);
      console.log('Recipients data has been inserted into the database.');
    } else {
      console.log('Recipients data already exists in the database.');
    }

    console.log('Initialization successful.');
  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

module.exports = { initDatabase };

