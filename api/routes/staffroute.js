const { express } = require('../modules')
const { savestaff, staffs, editstaff } = require('../controllers/staffController')
const route = express.Router()

route.post('/savestaff', savestaff);
route.get('/staffs', staffs)
route.post('/editstaff', editstaff);

module.exports = route