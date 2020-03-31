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

/** GET all upcoming appointments */
module.exports.getUpcomingAppointments = async(userId) => {
    return repository.getUpcomingAppointments(userId).then((rows) => {
        return rows;
    })
}

/** GET suggested clinics */
module.exports.getSuggestedClinics = async() => {

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

/** POST cancel appointment */
module.exports.cancelAppointment = async() => {
    
}

/** POST book appointment */
module.exports.bookAppointment = async() => {
    
}

/** POST add form */
module.exports.addForm = async() => {
    
}

/** POST patient registration data */
module.exports.registerUser = async() => {
    
}