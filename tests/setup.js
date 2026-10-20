beforeAll(async () => {
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState === 2) await mongoose.connection.asPromise();
});

afterAll(async () => {
  await require('mongoose').disconnect();
});
