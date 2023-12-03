const sequelize = require('./config/dbConfig');
const trackingModel = require('./src/models/trackingModel');

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

generateTrackingReport();
