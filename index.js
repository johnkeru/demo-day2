require('dotenv').config()
const express = require('express')
require('./dbConnect')()
const methodOverride = require('method-override')
const postRouter = require('./routers/postRouter')
const userRouter = require('./routers/userRouter')
const session = require('express-session')
const { create } = require('connect-mongo')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// session config
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, // only store session if used ex. (req.session.userId = userId)
    resave: false, // prevent resaving if session is not changed
    store: create({
        collectionName: 'sessions',
        mongoUrl: process.env.DB_URL, // same url in connecting to mongodb
        ttl: 60 * 60 * 24 * 7 // unit is second
    }),
    cookie: { // this cookie will be sent to the client to access protected resource
        maxAge: 1000 * 60 * 60 * 24 * 7 // unit is milliseconds
    }
}))


app.use(postRouter)
app.use(userRouter)

app.listen(5000,
    () => console.log('Listening on: http://localhost:5000')
)