const trackingService = require('../services/trackingService');

exports.queryTracking = async (req, res) => {
  const { sno } = req.query;
  try {
    const result = await trackingService.queryTracking(sno);
    res.json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', error: { code: 500, message: 'Internal Server Error' } });
  }
};

exports.generateFakeData = async (req, res) => {
  const { num } = req.query;
  try {
    const fakeData = await trackingService.generateFakeData(num);
    res.json(fakeData);
  } catch (error) {
    res.status(500).json({ status: 'error', error: { code: 500, message: 'Internal Server Error' } });
  }
};
