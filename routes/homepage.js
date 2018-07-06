const router = require('express').Router()
const models = require('../models')

router.get('/', (req, res) => {
  models.Destination.findAll()
  .then(dataDestination => {
    res.render('homepage', {
      image: dataDestination,
      username: req.session.account.username,
    })
  })
})



module.exports = router