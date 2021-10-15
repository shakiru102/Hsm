const event = require("../models/events")

module.exports.createEvent = async (req, res) => {
    try{
        const { school_id, term_id, event_title, event_content, event_color, event_date } = req.body
        await  event.create({ school_id, term_id, event_title, event_content, event_color, event_date})

        const Event = await event.find({ school_id, term_id }).sort({ event_date: 1})
        res.status(200).json(Event)
    }catch(err){
      res.status(400).send('could not get events')
    }
}
module.exports.Events = async (req, res) => {
     const { school_id, term_id} = req.query
      try{ 
        const Event = await event.find({ school_id, term_id }).sort({ event_date: 1})
        res.status(200).json(Event)
      }catch (error) {
        res.status(400).send('could not get events')
      } 
}