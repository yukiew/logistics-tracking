// trackingRoutes.js
const express = require('express');
const trackingController = require('../controllers/trackingController');

const router = express.Router();

router.get('/query', (req, res) => {
  console.log('Received GET request to /query');
  trackingController.queryTracking(req, res);
});

router.get('/fake', (req, res) => {
  console.log('Received GET request to /fake');
  trackingController.generateFakeData(req, res);
});

module.exports = router;
