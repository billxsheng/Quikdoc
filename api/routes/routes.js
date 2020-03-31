const express = require('express');
const controllers = require('../controllers/controller');
const app = express.Router();

/** GET all appointment clinics */
app.get('/appointment_clinics', (req, res, next) => {
    controllers.getAppointmentClinics().then((rows) => {
        res.status(200).send(rows);
    })
});

/** GET all walk in clinics */
app.get('/walkin_clinics', (req, res, next) => {
    controllers.getWalkInClinics().then((rows) => {
        res.status(200).send(rows);
    })
});

/** GET clinic by ID */
app.get('/clinics/:id', (req, res, next) => {
    controllers.getClinicByID(req.params.id).then((rows) => {
        res.status(200).send(rows);
    })    
});

/** GET all upcoming appointments */
app.get('/appointments', (req, res, next) => {
    controllers.getUpcomingAppointments(req.params.userId).then((rows) => {
        res.status(200).send(rows)
    });
});

/** GET patient info by health card number*/
app.get('/patient', (req, res, next) => {
    controllers.getPatient().then((rows) => {
        res.status(200).send(rows)
    });
});

/** GET clinic form by clinic ID*/
app.get('/forms/clinic/:id', (req, res, next) => {
    controllers.getClinicForm(req.params.id).then((rows) => {
        res.status(200).send(rows);
    }) 
});

/** GET patient form by health card number and clinic ID*/
app.get('/forms/patient/:id', (req, res, next) => {
    controllers.getPatientForm(req.params.id).then((rows) => {
        res.status(200).send(rows);
    }) 
});

/** GET all forms for patient by health card number*/
app.get('/forms', (req, res, next) => {
    controllers.getAllPatientForms().then((rows) => {
        res.status(200).send(rows);
    }) 
});

/** POST add form */
app.post('/forms/add', (req, res, next) => {
    controllers.addForm(req.body).then((rows) => {
        res.status(200).send(rows);
    }) 
});

/** POST patient registration data */
app.post('/register', (req, res, next) => {
    controllers.registerUser(req.body).then((rows) => {
        res.status(200).send(rows);
    }) 
});

/** GET all patient record by health card number sorted by datetime*/
app.get('/records', (req, res, next) => {
    controllers.getPatientRecords().then((rows) => {
        res.status(200).send(rows);
    }) 
});

/** GET patient record by clinic ID and patient health card number*/
app.get('/records/:id', (req, res, next) => {
    controllers.getPatientRecord(req.params.id).then((rows) => {
        res.status(200).send(rows);
    }) 
});

/** POST cancel appointment */
app.post('/appointment/cancel', (req, res, next) => {
    controllers.cancelAppointment(req.body).then((rows) => {
        res.status(200).send(rows);
    })
});

/** POST book appointment */
app.post('/appointment/book', (req, res, next) => {
    controllers.bookAppointment(req.body).then((rows) => {
        res.status(200).send(rows);
    })
});

module.exports = app;


