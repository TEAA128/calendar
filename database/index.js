// const pgp = require('pg-promise')(/* options */);
// const db = pgp('postgres://username:password@host:port/database');

// db.one('SELECT $1 AS value', 123)
//   .then( (data) => {
//     console.log('DATA:', data.value);
//   })
//   .catch( (error) => {
//     console.log('ERROR:', error);
//   })

const { Client } = require('pg')
const client = new Client()
;(async () => {
  await client.connect()
  const res = await client.query('SELECT $1::text as message', ['Hello world!'])
  console.log(res.rows[0].message) // Hello world!
  await client.end()
})();