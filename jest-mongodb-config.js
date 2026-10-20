module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '7.0.3',
      skipMD5: true,
    },
    instance: {
      dbName: 'jest',
      storageEngine: 'wiredTiger',
    },
    autoStart: false,
  },
  mongoURLEnvName: 'MONGODB_URI',
};
