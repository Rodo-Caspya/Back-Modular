const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vacuna = new Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('vacuna',vacuna);

