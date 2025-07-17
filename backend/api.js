const app = require('./index'); // your Express app
const serverless = require('serverless-http'); // wrap it for Vercel

module.exports = serverless(app);
