const hsmUser = require("../models/hsmUserModel")
const term = require("../models/term")

module.exports.saveterm = async (req, res) => {
     const {school_id, from, to, students_level, term_name} =req.body
        try {
            const newterm  = await term.create({school_id, from, to, students_level, term_name})
             await hsmUser.updateOne({_id:newterm.school_id}, { current_term: newterm._id })
             const user = await hsmUser.findById({_id: newterm.school_id})
            res.status(200).json({
            name: user.school_name,
            address: user.school_address,
            email: user.school_email,
            id: user._id,
            phonenumber: user.school_phonenum,
            current_term: user.current_term,
            payment_verified: user.payment_verified,
            logo: user.logo
            })   
        } catch (error) {
            console.log(error.message);
            res.status(400).send(' Could not create term')
        }
   
    
}