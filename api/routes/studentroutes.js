const { express } = require('../modules')
const { saveStudent, getstudents } = require('../controllers/studentsController')
const route = express.Router()

route.post('/createStudent', saveStudent )
route.get('/getStudents', getstudents )

module.exports = route