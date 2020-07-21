const { Pool } = require('pg');
const keys = require('./config.js');

const pool = new Pool({
  host: '204.236.188.132',
  port: '5432',
  user: keys.psqlUser,
  password: keys.psqlPassword,
  database: 'calendarteaa',
});

module.exports = pool;
