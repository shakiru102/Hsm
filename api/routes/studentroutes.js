const { express } = require('../modules')
const { saveStudent, getstudents, updatestudent } = require('../controllers/studentsController')
const route = express.Router()


route.post('/createStudent', saveStudent )
route.get('/getStudents', getstudents )
route.post('/updateStudent', updatestudent )

module.exports = route