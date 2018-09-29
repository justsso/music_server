
var pg = require('pg');  

const pool = new pg.Pool({
  user: 'jishuya',
  host: '192.144.131.126',
  database: 'music',
  password: 'jishuya',
  port: 5432
})


pool.on('error', (err, client) => {
  console.error('Unexpected error.pug on idle client', err)
  process.exit(-1)
})

module.exports = pool;
