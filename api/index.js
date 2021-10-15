const { mongoose, express, cookieParser, env } = require("./modules");

const hsmUser = require("./routes/hsmUser")
const termroutes = require("./routes/termroutes")
const eventroutes = require("./routes/eventroutes")
const studentroutes = require("./routes/studentroutes")
const app = express(); 
env.config()
mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology:true,
    useNewUrlParser: true,
})
.then(() => console.log('Connected to mongodb'))

app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use( hsmUser )
app.use( termroutes )
app.use(eventroutes)
app.use(studentroutes)


module.exports = app
