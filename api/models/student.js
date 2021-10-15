const { mongoose } = require("../modules");
 
const studentSchema = new mongoose.Schema({
    school_id: String,
    term_id: String,
    level: String,
    expected_amount: Number,
    amount_paid: Number,
    name: String,
    address: String,
    kin_name: String,
    kin_number: String,
    kin_address: String,
    student_age: String,
    student_photo: String,
    payment_status: String,
    gender: String,
    date: { type: String, default: Date.now}
})

const student = mongoose.model('students', studentSchema)

module.exports = student