const express = require('express');
const trackingController = require('../controllers/trackingController');

const router = express.Router();

router.get('/query', trackingController.queryTracking);
router.get('/fake', trackingController.generateFakeData);

module.exports = router;
