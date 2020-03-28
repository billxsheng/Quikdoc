const mysql = require('mysql');
const constants = require('../constants/constants');

const client = mysql.createConnection(constants.dbConfig);

// Sample repository query functions

module.exports.executeQuery = async () => {
    client.connect();
    query =  `SELECT * from clinics;`;
    const results = await client.query(query).then((res) => {
        return res.rows[0];
    }).catch(() => Promise.reject(`Unable to execute query.`));
    client.end();
    return results;
}

