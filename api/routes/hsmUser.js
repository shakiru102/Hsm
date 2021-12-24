const { signup, auth, login, signout } = require('../controllers/userAuthControl')
const { express } = require('../modules')

const route = express.Router()

route.post('/userauth/signup', signup )
route.post('/userauth/login', login )
route.get('/userauth', auth )
route.get('/signout', signout )

module.exports = route