const { Pool } = require('pg');

const pool = new Pool({
  host: '54.183.25.226',
  port: '5432',
  user: 'teaa',
  password: 'pass',
  database: 'calendarteaa',
});

module.exports = pool;
