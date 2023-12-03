const { generateFakeData } = require('../trackingService');

async function testGenerateFakeData() {
  try {
    const num = 5;
    const fakeData = await generateFakeData(num);
    console.log('Generated Fake Data:', fakeData);

  } catch (error) {
    console.error('Error generating fake data:', error);
  }
}

// 執行測試
testGenerateFakeData();
