const { mongoose } = require("../modules");
 
const studentSchema = new mongoose.Schema({
    school_id: String,
    term_id: String,
    level: String,
    expect_amount: Number,
    amount_paid: Number,
    name: String,
    address: String,
    kin_name: String,
    kin_number: String,
    student_number: String,
    student_photo: String,
    date: { type: String, default: Date.now}
})

const student = mongoose.model('term', studentSchema)

module.exports = student