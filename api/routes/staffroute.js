const { express } = require('../modules')
const { savestaff, staffs } = require('../controllers/staffController')
const route = express.Router()

route.post('/savestaff', savestaff);
route.get('/staffs', staffs)

module.exports = route