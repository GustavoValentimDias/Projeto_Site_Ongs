const knex = require('knex'); // Importanto o knex
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;