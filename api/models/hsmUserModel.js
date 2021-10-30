const { mongoose } = require("../modules");

 const hsmUserSchema = new mongoose.Schema({
     school_name: String,
     school_phonenum: String,
     school_email: String,
     school_password: String,
     school_address: String,
     logo: String,
     date: { type: String, default: Date.now},
     payment_token: String,
     payment_verified: Boolean,
     current_term: String,
     forgot_email: String,
     theme: Boolean,
     school_nameAbrr: String,

 })


 const hsmUser = mongoose.model("School_Accounts", hsmUserSchema  )

 module.exports = hsmUser