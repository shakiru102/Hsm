const student = require('../models/student')

module.exports.saveStudent = async (req, res) => {
 const { 
    school_id,
    term_id,
    level,
    expected_amount,
    amount_paid,
    name,
    address,
    kin_name,
    kin_number,
    kin_address,
    student_age,
    student_photo,
    payment_status,
    gender,
 } = req.body

 try {
    
    const Student = await student.create({
        school_id,
        term_id,
        level,
        expected_amount,
        amount_paid,
        name,
        address,
        kin_name,
        kin_number,
        kin_address,
        student_age,
        student_photo,
        payment_status,
        gender,
    })
    if(!Student) throw new Error('Could not create student')
    if (Student){
      const Students = await student.find({school_id, term_id}).sort({name: 1})
      res.status(200).json(Students)
    }
    
 } catch (error) {
     if(error.message == 'Could not create student' ) return res.status(400).send(error.message)
    res.status(400).send('There was a problem create this student')

 }
    
}

module.exports.getstudents = async (req, res) => {
   
   const {school_id, term_id } = req.query
   try {
        const Students = await student.find({school_id, term_id}).sort({name: 1})
        res.status(200).json(Students)
   } catch (error) {
      res.status(400).send('Could not get students')
   }
   
}