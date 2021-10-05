const { mongoose } = require("../modules");
 
const termSchema = new mongoose.Schema({
    school_id: String,
    from: String,
    to: String,
    students_level: [{ level: String, amount: Number}],
    term_name: String,
    date: { type: String, default: Date.now}
})

const term = mongoose.model('term', termSchema)

module.exports = term