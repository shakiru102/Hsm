const { express } = require('../modules')
const { saveterm } = require('../controllers/termController')
const route = express.Router()

route.post('/createterm', saveterm )

module.exports = route
