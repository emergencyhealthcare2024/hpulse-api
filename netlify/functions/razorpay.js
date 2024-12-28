const serverlessExpress = require('@vendia/serverless-express');
const app = require('../../src/app'); // Adjust path based on your structure

module.exports.handler = serverlessExpress({ app });
