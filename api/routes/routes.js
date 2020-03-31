const express = require('express');
const controllers = require('../controllers/controller');
const app = express.Router();

// Sample routes

/** Path params are used to specify a resource. Query params are used to filter the resource. */

// app.get('/:location', (req, res, next) => {
//     controllers.getByLocation(req.params.location, req.query.sentiment).then((data) => {
//         res.status(200).send(data);
//     }).catch((e) => {
//         res.status(400).send({
//             message: e
//         })
//     });
// });

// app.get('/', (req, res, next) => {
//     controllers.getAll(req.params.location, req.query.sentiment).then((data) => {
//         res.status(200).send(data);
//     }).catch((e) => {
//         res.status(400).send({
//             message: e
//         })
//     });
// });

/** GET all upcoming appointments */
app.get('/appointments', (req, res, next) => {
    controllers.getUpcomingAppointments(req.params.userId).then((rows) => {
        res.status(200).send(rows)
    });
});

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
    
});

/** GET patient record by clinic ID and patient health card number*/
app.get('/record', (req, res, next) => {
    
});

/** GET patient info by health card number*/
app.get('/patient', (req, res, next) => {
    
});

/** GET patient form by health card number and clinic ID*/
app.get('/forms/patient', (req, res, next) => {
    
});

/** GET clinic form by clinic ID*/
app.get('/forms/clinic', (req, res, next) => {
    
});

/** POST cancel appointment */
app.post('/appointment/cancel', (req, res, next) => {
    
});

/** POST book appointment */
app.post('/appointment/book', (req, res, next) => {
    
});

/** POST add form */
app.post('/forms/add', (req, res, next) => {
    
});

/** POST patient registration data */
app.post('/register', (req, res, next) => {
    
});

module.exports = app;


