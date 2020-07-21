const { Pool } = require('pg');
const keys = require('./config.js');

const pool = new Pool({
  host: '54.183.25.226',
  port: '5432',
  user: keys.psqlUser,
  password: keys.psqlPassword,
  database: 'calendarteaa',
});

module.exports = pool;
