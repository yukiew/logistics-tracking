const express = require('express');
const bodyParser = require('body-parser');
const trackingRoutes = require('./src/routes/trackingRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Routes
app.use('/api', trackingRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
