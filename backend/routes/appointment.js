const router = require('express').Router();
let Appointment = require('../models/appointment.model');


//get appointment from db
router.route('/').get((req,res) => {
    Appointment.find()
        .then(appointment => res.json(appointment))
        .catch(err => res.status(400).json('Error:' +err));
});

//add new appointment
router.route('/add-appointment').post((req,res) => {
    const fullname = req.body.fullname;
    const age= req.body.age;
    const contact = req.body.contact;
    const gender = req.body.gender;
    const description = req.body.description;
    const date = req.body.date;

    const newAppointment = new Appointment({
        fullname,
        age,
        contact,
        gender,
        description,
        date,
    });

    newAppointment.save()
        .then(() => res.json("Appointment added"))
        .catch(err => res.status(400).json('Error:'+err));
    

})

//find a single appointment by id
router.route('/:id').get((req,res) => {
    Appointment.findById(req.params.id)
        .then(appointment => res.json(appointment))
        .catch(err => res.status(400).json('Error:'+err))
})

//delete appointment by id
router.route('/:id').delete((req,res) => {
    Appointment.findByIdAndDelete(req.params.id)
        .then(appointment => res.json("Appointment deleted"))
        .catch(err => res.status(400).json('Error:'+err))
})

//update an appointment
router.route('/update-appointment/:id').post((req,res) => {
    Appointment.findById(req.params.id)
        .then(appointment => {
            appointment.fullname = req.body.fullname;
            appointment.age= req.body.age;
            appointment.contact = Number(req.body.contact);
            appointment.gender = req.body.gender;
            appointment.description = req.body.description;
            appointment.date = Date.parse(req.body.date)

            appointment.save()
                .then(() => res.json('Appointment updated!'))
                .catch(err => res.status(400).json('Error:'+err))
        })
})

module.exports = router;