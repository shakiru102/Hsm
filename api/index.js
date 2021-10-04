const { mongoose, express, cookieParser, env } = require("./modules");
const hsmUser = require("./routes/hsmUser")
const app = express(); 
env.config()
mongoose.connect('mongodb+srv://SAS1099:olashekoni@cluster0.hqgww.mongodb.net/Highschool_Manager', {
    useUnifiedTopology:true,
    useNewUrlParser: true,
})
.then(() => console.log('Connected to mongodb'))

app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use( hsmUser )


module.exports = app
