const mysql = require('mysql2');
const constants = require('../constants/constants');

const connection = mysql.createConnection(constants.dbConfig);

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
module.exports.getClinicByID = async(id) => {
    connection.connect();
    queryW =  `select * from walkin_clinic w inner join clinic c on w.FK_walkin_clinic_id = c.clinic_id where c.clinic_id = ${id};`;
    queryA =  `select * from appointment_clinic a inner join clinic c on a.FK_appointment_clinic_id = c.clinic_id where c.clinic_id = ${id};`;
    let w = await connection.promise().query(queryW).then((e) => {
        return e[0]
    })
    
    let a = await connection.promise().query(queryA).then((e) => {
        return e[0]
    })

    if(w.length < 1) {
        return a;
    } else {
        return w;
    }
}

/** GET all upcoming appointments for a specific patient */
module.exports.getUpcomingAppointments = async(userId) => {
    connection.connect();
    query =  `select * from patient p inner join appointment a inner join clinic c on p.health_card_no = a.FK_health_card_no and c.clinic_id = a.FK_clinic_id where p.health_card_no = 84975214 order by a.appointment_date, a.appointment_time;`;
    return connection.promise().query(query).then((e) => {
        return e[0]
    })
}

/** GET patient info by health card number*/
module.exports.getPatient = async() => {
    connection.connect();
    query =  `select * from patient where patient.health_card_no = 84975214;`;
    return connection.promise().query(query).then((e) => {
        return e[0]
    })
}

/** GET patient record by clinic ID and patient health card number*/
module.exports.getPatientRecord = async() => {
    connection.connect();
    query =  `select * from patient p inner join appointment a inner join clinic c on p.health_card_no = a.FK_health_card_no and c.clinic_id = a.FK_clinic_id where p.health_card_no = 84975214 order by a.appointment_date, a.appointment_time;`;
    return connection.promise().query(query).then((e) => {
        return e[0]
    })
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

