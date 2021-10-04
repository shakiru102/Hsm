const { mongoose } = require("../modules");
 
const termSchema = new mongoose.Schema({
    school_id: String,
    duration: String,
    students_level: [{ level: String, amount: String}],
    term_name: String,
    date: { type: String, default: Date.now}
})

const term = mongoose.model('term', termSchema)

module.exports = term