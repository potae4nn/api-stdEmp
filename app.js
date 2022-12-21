const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
require('dotenv').config()
require('./config/passport')
const path = require('path')

let PORT
process.env.NODE_ENV === "production"
    ? (PORT = process.env.PROD_PORT)
    : (PORT = process.env.DEV_PORT)

const corsOptions = {
    origin: "*"
};

const db = require("./models");
db.sequelize.sync({ force: false, alter: false })
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static('public'));
// register route
const std_empm = require('./routes/std_employment')
const student = require('./routes/student.router')
const auth = require('./routes/auth')
const subdivition = require('./routes/subdivition')
const pdf = require('./routes/pdf')

//Routers
app.use('/api/studentTest', cors(corsOptions), passport.authenticate('jwt', { session: false }), std_empm)
app.use('/api/student', cors(corsOptions), passport.authenticate('jwt', { session: false }), student)
app.use('/api/pdf', cors(corsOptions), pdf)
app.use('/api/auth', cors(corsOptions), auth)
app.use('/api/subdivition', cors(corsOptions), subdivition)

app.use('/api/image/', express.static(__dirname + '/public/uploads'))
app.use('/css/', express.static(__dirname + '/css/stylesheet.css'))
app.use('/fonts/', express.static(__dirname + '/public/assets/fonts'))

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');
// app.get('/', (req, res) => {
//     res.send('Hello World!ssss')
// })

app.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
})

app.get('/test', (req, res) => {
    res.render('test', { title: 'test' });
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT} ${process.env.NODE_ENV} mode`)
})