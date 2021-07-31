const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    email: { type: String },
    name: { type: String, required: true },
    old: { type: Number }
})
module.exports = mongoose.model('student', studentSchema)