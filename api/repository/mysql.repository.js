const mysql = require('mysql2');
const constants = require('../constants/constants');

const connection = mysql.createConnection(constants.dbConfig);

// Sample repository query functions
module.exports.executeQuery = async () => {
    connection.connect();
    query =  `SELECT * from clinics;`;
    const results = await connection.query(query).then((res) => {
        return res.rows[0];
    }).catch(() => Promise.reject(`Unable to execute query.`));
    connection.end();
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
    connection.connect();
    query =  ``;
    const results = await connection.query(query).then((res) => {
        return res;
    }).catch(() => Promise.reject(`Unable to execute query.`));
    connection.end();
    return results;
}

/** GET all appointment clinics */
module.exports.getAppointmentClinics = async () => {
    connection.connect();
    query =  `select * from appointment_clinic a inner join clinic c on a.FK_appointment_clinic_id = c.clinic_id;`;
    return connection.promise().query(query).then((e) => {
        return e[0]
    })
}

/** GET all walk in clinics */
module.exports.getWalkInClinics = async () => {
    connection.connect();
    query =  `select * from walkin_clinic w inner join clinic c on w.FK_walkin_clinic_id = c.clinic_id;`;
    return connection.promise().query(query).then((e) => {
        return e[0]
    })
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

