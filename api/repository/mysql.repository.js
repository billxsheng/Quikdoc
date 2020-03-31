const mysql = require('mysql2');
const constants = require('../constants/constants');

const connection = mysql.createConnection(constants.dbConfig);

/** GET all appointment clinics */
module.exports.getAppointmentClinics = async () => {
    connection.connect();
    query =  `select * from appointment_clinic a inner join clinic c on a.FK_appointment_clinic_id = c.clinic_id order by a.avg_wait_days;`;
    return connection.promise().query(query).then((e) => {
        return e[0]
    })
}

/** GET all walk in clinics */
module.exports.getWalkInClinics = async () => {
    connection.connect();
    query =  `select * from walkin_clinic w inner join clinic c on w.FK_walkin_clinic_id = c.clinic_id order by w.avg_wait_time;`;
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

/** GET clinic form by clinic ID*/
module.exports.getClinicForm = async(id) => {
    connection.connect();
    query =  `select * from clinic_form f inner join clinic c on c.clinic_id = f.FK_clinic_id where c.clinic_id = ${id};`;
    
    return connection.promise().query(query).then((e) => {
        return e[0]
    })
}

/** GET patient form by health card number and clinic ID*/
module.exports.getPatientForm = async(id) => {
    connection.connect();
    query =  `select * from patient_form p inner join clinic c on c.clinic_id = p.FK_clinic_id where p.patient_form_id = "${id}";`;
    return connection.promise().query(query).then((e) => {
        return e[0]
    })
}

/** GET all forms for patient by health card number*/
module.exports.getAllPatientForms = async() => {
    connection.connect();
    query =  `select * from patient p inner join patient_form f inner join clinic c on p.health_card_no = f.FK_health_card_no and c.clinic_id = f.FK_clinic_id where p.health_card_no = 84975214;`;
    return connection.promise().query(query).then((e) => {
        return e[0]
    })
}

/** insert form data */
module.exports.addForm = async(fid, hcn, clinic, url) => {
    connection.connect();
    query =  `insert into patient_form(\`patient_form_id\`,\`FK_clinic_id\`,\`FK_health_card_no\`,\`patient_form_URL\`,\`patient_form_upload_datetime\`) values ("${fid}", ${clinic}, "${hcn}", "${url}", NOW());`;
    return connection.promise().query(query).then((e) => {
        return e;
    })
}

/** insert patient registration data */
module.exports.registerUser = async(fn, ln, pw, hcn, bt, email) => {
    connection.connect();
    query =  `insert into patient(\`health_card_no\`,\`first_name\`,\`last_name\`,\`password\`,\`blood_type\`,\`email\`) values (${hcn}, "${fn}", "${ln}", "${pw}", "${bt}", "${email}");`;
    return connection.promise().query(query).then((e) => {
        return e;
    })
}

/** GET all patient records by health card number*/
module.exports.getPatientRecords = async() => {
    connection.connect();
    query =  `select * from patient_record r inner join clinic c on r.FK_clinic_id = c.clinic_id where r.FK_health_card_no = 84975214 order by r.patient_record_date;`;
    return connection.promise().query(query).then((e) => {
        return e[0]
    })
}

/** GET patient record by patient record id*/
module.exports.getPatientRecord = async(id) => {
    connection.connect();
    query =  `select * from patient_record r inner join clinic c on r.FK_clinic_id = c.clinic_id where r.patient_record_id = "${id}";`;
    return connection.promise().query(query).then((e) => {
        return e[0]
    })
}

/** cancel appointment */
module.exports.cancelAppointment = async() => {
    
}

/** book appointment for a specific time */
module.exports.bookAppointment = async() => {
    
}