const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const indexRoutes = require('./routes')
const destinationRoutes = require('./routes/destination')

const port = 3030
app.use(bodyParser({extended: false}))
app.set('view engine','ejs')

app.use('/', indexRoutes);
app.use('/destination', destinationRoutes);

app.listen(port, () => {
  console.log(`Listening port http://localhost:${port}`);
})