// trackingController.js
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
  let { num } = req.query;

  // 確認num是正整數
  num = parseInt(num, 10);
  if (isNaN(num) || num <= 0) {
    return res.status(400).json({ status: 'error', error: { code: 400, message: 'Invalid input: num must be a positive number.' } });
  }

  try {
    const fakeData = await trackingService.generateFakeData(num);
    res.json(fakeData);
  } catch (error) {
    res.status(500).json({ status: 'error', error: { code: 500, message: 'Internal Server Error' } });
  }
};
