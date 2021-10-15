const { mongoose } = require("../modules");
 
const eventSchema = new mongoose.Schema({
    school_id: String,
    term_id: String,
    event_title: String,
    event_content: String,
    event_color: String,
    event_date: String,
    date: { type: String, default: Date.now}
})

const event = mongoose.model('events', eventSchema)

module.exports = event