const { mongoose, express, cookieParser } = require("./modules");
const hsmUser = require("./routes/hsmUser")
const app = express(); 

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to mongodb'))

app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use( hsmUser )

module.exports = app
