const { joi } = require("../modules");


const termschema =  joi.object({
   school_id: joi.string().required(),
   from: joi.string().required(),
   to: joi.string().required(),
   students_level: joi.array().required(),
   term_name: joi.string().required(),
})


const termvalid = async ({school_id, from, to, students_level, term_name}) => await termschema.validate({ school_id, from, to, students_level, term_name })

module.exports = {
    termvalid
}