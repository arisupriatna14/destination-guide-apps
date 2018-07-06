const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const session    = require('express-session')
const bcrypt     = require('bcrypt')
const port       = 3030

const indexRoutes       = require('./routes')
const destinationRoutes = require('./routes/destination')
const homepageRoutes    = require('./routes/homepage')
const administratorRoutes = require('./routes/administrator')

app.locals.convertMoney  = require('./helper/convert_money');
app.locals.total = require('./helper/countTotal')

app.use(bodyParser({extended: false}))

app.set('view engine','ejs')
app.set('trust proxy', 1)
app.use(session({
  secret: "SECRET_KEY",
  saveUninitialized: true,
  cookie: {}
}))

app.use('/', indexRoutes);
app.use('/destination', destinationRoutes);
app.use('/home', homepageRoutes)
app.use('/administrator', administratorRoutes)


app.listen(port, () => {
  console.log(`Listening port http://localhost:${port}`);
})