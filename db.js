const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: 'ryuusei0618',
  port: 60185,
});

module.exports = pool;
