const { mongoose } = require("../modules");
 
const staffSchema = new mongoose.Schema({
    school_id: String,
    first_name: String,
    last_name: String,
    address: String,
    staff_number: String,
    staff_category: String,
    staff_certificate: String,
    staff_task: String,
    staff_photo: String,
    gender: String,
    referAs: String,
    dob: String,
    date: { type: String, default: Date.now }
})

const Staff = mongoose.model('staffs', staffSchema)

module.exports = Staff