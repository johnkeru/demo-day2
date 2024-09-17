require('dotenv').config()
const express = require('express')
require('./dbConnect')()
const app = express()
const methodOverride = require('method-override')
const postRouter = require('./routers/postRouter')

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.use(postRouter)

app.listen(5000,
    () => console.log('Listening on: http://localhost:5000')
)