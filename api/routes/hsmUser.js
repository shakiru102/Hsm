const { signup, auth, login } = require('../controllers/userAuthControl')
const { express } = require('../modules')

const route = express.Router()

route.post('/userauth/signup', signup )
route.post('/userauth/login', login )
route.get('/userauth', auth )

module.exports = route