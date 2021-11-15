const Staff = require('../models/staff')

module.exports.savestaff = async (req, res) => {

    try {
        await Staff.create(req.body)
    const staffs = await Staff.find({ school_id: req.body.school_id }).sort({ last_name: 1 })
     res.status(200).json(staffs)
    } catch (error) {
       console.log(error.message)
       res.status(400).send('could not create staff') 
    }
    
}

module.exports.staffs = async (req, res) => {
   try {
    const staffs = await Staff.find({ school_id: req.query.school_id }).sort({ last_name: 1 })
       res.send(200).json(staffs)
   } catch (error) {
       res.send(400).send('could not get staff')
   }
}