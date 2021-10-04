const { mongoose } = require("../modules");
 
const staffSchema = new mongoose.Schema({
    school_id: String,
    term_id: String,
    level: String,
    expect_amount: Number,
    amount_paid: Number,
    name: String,
    address: String,
    kin_name: String,
    kin_number: String,
    staff_number: String,
    staff_position: String,
    staff_photo: String,
    date: { type: String, default: Date.now}
})

const staff = mongoose.model('term', staffSchema)

module.exports = staff