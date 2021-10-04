const { jwt } = require("../modules");

 const token = async (id) => await jwt.sign({ id }, process.env.JWT_SIGNATURE, { expiresIn:  1 * 24 * 60 * 60  })
 const verified = async (token) => await jwt.verify( token, process.env.JWT_SIGNATURE )
 module.exports = { token, verified };