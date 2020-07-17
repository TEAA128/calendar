const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'calendarteaa',
});

module.exports = pool;
