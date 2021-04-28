if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser= require('body-parser')

//from index.js routes folder
const indexRouter = require('./routes/index') // module.exports = router
const authorRouter = require('./routes/authors') // module.exports = router
// app.use('/', indexRouter)


//Configure express application//
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit : '10mb', extended : false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) // never hardcode connection  pass a string from environment variable such as dot env
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter) // every route within author router will prepend the route with /authors

app.listen(process.env.PORT || 3000) // pull from an environment variable when we deploy. Server tells us what server listening too


