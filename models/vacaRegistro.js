const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vacunaInfo = new Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    registrationDate:{
        type: Date,
        require: true
    },
    expirationDate:{
        type: Date,
        require: true
    }
});

const vacaRegistro = new Schema({
    _id:{
        type: String,
    },
    type:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        require: true
    },
    father:{
        type: String,
        require: true
    },
    mother:{
        type: String,
        require: true,
        default: ""
    },
    birthNumber: {
        type: Number,
        require: true
    },
    registroVacunas:[{
        type: vacunaInfo
    }]
});

module.exports.vacaRegistro = mongoose.model('vacaRegistro',vacaRegistro);
module.exports.vacunaInfo = mongoose.model('vacunaInfo',vacunaInfo);

