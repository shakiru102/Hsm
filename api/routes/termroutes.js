const { express } = require('../modules')
const { saveterm, getTerm  } = require('../controllers/termController')
const route = express.Router()

route.post('/createterm', saveterm )
route.get('/currentTerm', getTerm )

module.exports = route
