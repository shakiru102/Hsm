const { createEvent, Events } = require('../controllers/eventController')
const { express } = require('../modules')
const route = express.Router()

route.post('/createEvent', createEvent )
route.get('/Events', Events )


module.exports = route