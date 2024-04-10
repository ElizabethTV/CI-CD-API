const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '192.168.1.7',
    database: 'Universidad',
    password: 'password',
    port: 5432
});

module.exports = { pool };