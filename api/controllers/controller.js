const repository = require('../repository/mysql.repository');
const utils = require('../utils/string.utils');
const constants = require('../constants/constants');

// Sample controller functions
module.exports.getByLocation = async (location, sentiment) => {
    let locationFormatted = utils.toTitleCase(location);
    if(sentiment == null) {
        return repository.getByLocation(locationFormatted).then((data) => {
            return data;
        }).catch((e) => {
            return Promise.reject(e);
        });
    }
    let sentimentFormatted = utils.toTitleCase(sentiment);
    if(!constants.sentiments.includes(sentimentFormatted)) {
        return Promise.reject(constants.errors.invalidSentiment);
    }
    return repository.getByLocationAndSentiment(locationFormatted, sentimentFormatted).then((data) => {
        return data;
    }).catch((e) => {
        return Promise.reject(e);
    });
}

module.exports.getAll = async () => {
    return repository.getAll().then((data) => {
        return data;
    }).catch((e) => {
        return Promise.reject(e);
    });
}

/** GET all appointment clinics */
module.exports.getAppointmentClinics = async() => {
    return repository.getAppointmentClinics();
}

/** GET all walk in clinics */
module.exports.getWalkInClinics = async() => {
    return repository.getWalkInClinics();
}

/** GET clinic by ID */
module.exports.getClinicByID = async(id) => {
    return repository.getClinicByID(id).then((rows) => {
        return rows;
    })
}

/** GET all upcoming appointments */
module.exports.getUpcomingAppointments = async(body) => {
    return repository.getUpcomingAppointments(body.id).then((rows) => {
        return rows;
    })
}

/** GET patient info by health card number*/
module.exports.getPatient = async(body) => {
    return repository.getPatient(body.id).then((rows) => {
        return rows;
    })
}

/** GET clinic form by clinic ID*/
module.exports.getClinicForm = async(id) => {
    return repository.getClinicForm(id).then((rows) => {
        return rows;
    }) 
}

/** GET patient form by health card number and clinic ID*/
module.exports.getPatientForm = async(id) => {
    return repository.getPatientForm(id).then((rows) => {
        return rows;
    }) 
}

/** GET all forms for patient by health card number*/
module.exports.getAllPatientForms = async(body) => {
    return repository.getAllPatientForms(body.id).then((rows) => {
        return rows;
    }) 
}

/** POST add form */
module.exports.addForm = async(body) => {
    return repository.addForm(body.fid, body.hcn, body.clinic, body.formURL).then((rows) => {
        return rows;
    }) 
}

/** POST patient registration data */
module.exports.registerUser = async(body) => {
    return repository.registerUser(body.fn, body.ln, body.password, body.healthCardNumber, body.bloodType, body.email).then((rows) => {
        return rows;
    }) 
}

/** GET all patient records by health card number*/
module.exports.getPatientRecords = async(body) => {
    return repository.getPatientRecords(body.id).then((rows) => {
        return rows;
    }) 
}

/** GET patient record by patient record id*/
module.exports.getPatientRecord = async(id) => {
    return repository.getPatientRecord(id).then((rows) => {
        return rows;
    }) 
}

/** POST cancel appointment */
module.exports.cancelAppointment = async(body) => {
    return repository.cancelAppointment(body.id).then((rows) => {
        return rows;
    }) 
}

/** POST book appointment */
module.exports.bookAppointment = async(body) => {
    return repository.bookAppointment(body.clinic, body.healthCardNumber, body.date, body.time).then((rows) => {
        return rows;
    })
}

/** GET user by hcn and password*/
module.exports.loginUser = async(body) => {
    return repository.loginUser(body.hcn, body.password).then((rows) => {
        return rows;
    })
}