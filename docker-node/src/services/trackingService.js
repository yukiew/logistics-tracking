// trackingService.js
const redis = require('redis');
const { promisify } = require('util');

const Faker = require('faker/lib');
const trackingModel = require('../models/trackingModel');
const { locations, recipients } = require('../../data');

const redishost = process.env.REDIS_HOST;

const redisClient = redis.createClient({
  host: redishost,
  port: 6379 // 默认端口是 6379，如果您的 Redis 服务使用了不同的端口，请相应修改
});


// 使用 Promise
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

exports.queryTracking = async (sno) => {
  // 先嘗試從 Redis 中獲取數據
  const cachedData = await getAsync(sno);

  if (cachedData) {
    return {
      status: 200,
      data: JSON.parse(cachedData),
      message: 'Tracking information retrieved from cache.',
    };
  }

  // 如果在Redis中找不到數據則查詢
  try {
    const result = await trackingModel.Shipment.findOne({
      where: {
        sno: sno,
      },
      include: [
        { model: trackingModel.Recipient },
        { model: trackingModel.Location },
        { model: trackingModel.ShipmentDetail },
      ],
    });

    if (!result) {
      return {
        status: 404,
        message: 'Tracking information not found for the provided sno.',
      };
    }

    // 把查詢結果存入 Redis 以進行快取，設定適當的過期時間
    await setAsync(sno, JSON.stringify(result), 'EX', 3600); // 1h

    return {
      status: 200,
      data: result,
      message: 'Tracking information retrieved from the database.',
    };
  } catch (error) {
    console.error('Error querying tracking information:', error);
    return {
      status: 500,
      message: 'Internal server error.',
    };
  }
};


const faker = require('faker');

exports.generateFakeData = async (num) => {
  const fakeData = [];

  try {
    if (isNaN(num) || num <= 0) {
      throw new Error('Invalid input: num must be a positive number.');
    }

    // 生成假資料
    for (let i = 0; i < num; i++) {
      const order = {
        sno: faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
        tracking_status: faker.random.arrayElement([
          'Created',
          'Package Received',
          'In Transit',
          'Out for Delivery',
          'Delivery Attempted',
          'Delivered',
          'Returned to Sender',
          'Exception',
        ]),
        estimated_delivery: faker.date.future().toISOString().split('T')[0],
        id: faker.random.arrayElement(recipients).id,
        current_Location_Id: faker.random.arrayElement(locations).id,
        details: [],
      };

      const numDetails = faker.datatype.number({ min: 1, max: 5 });
      for (let j = 0; j < numDetails; j++) {
        const detail = {
          id: faker.datatype.number({ min: 1000, max: 9999 }),
          date: faker.date.recent().toISOString().split('T')[0],
          time: faker.date.recent().toLocaleTimeString('en-US', { hour12: false }),
          status: faker.random.arrayElement(['Package Received', 'In Transit', 'Out for Delivery', 'Delivered']),
          location_id: faker.random.arrayElement(locations).id,
          shipment_sno: order.sno
        };
        order.details.push(detail);
      }


      fakeData.push(order);
    }

    // 將假資料存入數據庫
    for (const order of fakeData) {
      const { details, ...shipmentData } = order;

      const shipment = await trackingModel.Shipment.create(shipmentData);

      for (const detail of details) {
        
        const shipmentDetail = await trackingModel.ShipmentDetail.create(detail);

        // 關聯Shipment與ShipmentDetail
        await shipment.addShipmentDetail(shipmentDetail);
      }
    }

    console.log('Fake data has been inserted into the database successfully.');
    return fakeData;
  } catch (error) {
    console.error('Error inserting fake data into the database:', error);
    return fakeData;
  }
};


