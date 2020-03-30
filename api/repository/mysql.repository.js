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

module.exports.getAll = async () => {
    return repository.getAll().then((data) => {
        return data;
    }).catch((e) => {
        return Promise.reject(e);
    });
}

/** GET all upcoming appointments for a specific patient */
module.exports.getUpcomingAppointments = async(userId) => {
    client.connect();
    query =  `SELECT * from appointments join patient where userId = ${userId};`;
    const results = await client.query(query).then((res) => {
        return res;
    }).catch(() => Promise.reject(`Unable to execute query.`));
    client.end();
    return results;
}

/** GET suggested clinics */
module.exports.getSuggestedClinics = async() => {
    
}

/** GET all clinics */
module.exports.getClinics = async() => {
    
}

/** GET clinic by ID */
module.exports.getClinicByID = async() => {
    
}

/** GET patient record by clinic ID and patient health card number*/
module.exports.getPatientRecord = async() => {
    
}

/** GET patient info by health card number*/
module.exports.getPatient = async() => {
    
}

/** GET patient form by health card number and clinic ID*/
module.exports.getPatientForm = async() => {
    
}

/** GET clinic form by clinic ID*/
module.exports.getClinicForm = async() => {
    
}

/** cancel appointment */
module.exports.cancelAppointment = async() => {
    
}

/** book appointment for a specific time */
module.exports.bookAppointment = async() => {
    
}

/** insert form data */
module.exports.addForm = async() => {
    
}

/** insert patient registration data */
module.exports.registerUser = async() => {
    
}

