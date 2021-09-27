const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appSchema = new Schema({
    fullname : {type:String, required:true},
    age:{type:Number, required:true},
    contact:{type:Number, required:true},
    gender:{type:String, required:true},
    description:{type:String, required:true},
    date:{type:Date, required:true},

}, {
    timestamps:true
});

const  Appointment = mongoose.model(' Appointment', appSchema);

module.exports =  Appointment;

