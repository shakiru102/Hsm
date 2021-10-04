const hsmUser = require("../models/hsmUserModel")
const { bcrypt } = require("../modules")
const { token, verified } = require("../utils/jwt")

//signup controller
module.exports.signup = async (req, res) => {
    const { school_email, school_password, school_phonenum, school_name, school_address,  forgot_email, current_term, payment_verified,  payment_token } = req.body
    try {
        const verifyuser = await hsmUser.findOne({ school_email })
        if(verifyuser) throw Error('Email already exists')
        const salt = await bcrypt.genSalt()
        const password = await  bcrypt.hash(school_password, salt)
        const user  = await  hsmUser.create({ school_email, school_password: password, school_phonenum, school_name, school_address,  forgot_email, current_term, payment_verified,  payment_token })

        if(!user) throw Error('There is a problem creating this school account')
        const jwtToken = await token(user._id)
        res.cookie('HSM', jwtToken, { maxAge:  1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
        res.status(200).send('ok')
     
    } catch (error) {
        res.status(400).send({ error: error.message})
    }

}

//login controller
module.exports.login = async (req, res) => {
    const { school_email, school_password } = req.body
    try {
        const verifyUser = await hsmUser.findOne({ school_email })
        if(!verifyUser) throw Error('This is email does not exist')
        
        const verifyPassword = await bcrypt.compare( verifyUser.school_password , school_password)
        console.log(verifyPassword)
        if(!verifyPassword) throw Error('Invalid password')

        const jwtToken = await token(user._id)
        res.cookie('HSM', jwtToken, { maxAge:  1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
        res.status(200).send('ok')
     
    } catch (error) {
        res.status(400).send({ error: error.message})
    }

}

//authenticate user controller
module.exports.auth = async (req, res) => {
    const token = await req.cookies.HSM
    try {
        const pass = await verified(token)
        if(!pass) throw Error('session expired')
        const user = await hsmUser.findById({_id: pass.id})
        res.status(200).json({ 
            name: user.school_name,
            address: user.school_address,
            email: user.school_email,
            id: user._id,
            phonenumber: user.school_phonenum,
            current_term: user.current_term,
            payment_verified: user.payment_verified,
         })
    } catch (error) {
        res.status(400).send(error.message)
    }
}