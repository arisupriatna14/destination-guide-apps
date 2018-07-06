const router = require('express').Router()
const models = require('../models')
const nodemailer = require('nodemailer')

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: "supriatnaarie24@gmail.com",
      pass: "arisupriatna990814"
  }
});

router.get('/destination-show/:id', (req, res) => {
  models.DestinationViewHistory.create({
    DestinationId: req.params.id,
    UserId: req.session.account.id
  })
  models.Destination.findOne({
    where: {
      id: req.params.id
    }
  })

  .then(showDestination => {
    //res.send(showDestination)
    res.render('show_destination', {
      id: showDestination.id,
      name_destination: showDestination.name_destination,
      harga: showDestination.harga,
      image: showDestination.image,
      city: showDestination.city,
      username: req.session.account.username,
      harga_guide: showDestination.harga_guide,
      maps: showDestination.maps
    })
  })
  // res.send('destination show')
  
})

router.post('/order/:id', (req, res) => {
  const request = req.body
  // const harga = request.harga 
  // res.send(request.time)
  models.Destination.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dataDestination => {
    // res.send(dataDestination)
    const username = req.session.account.username
    const nameDestination = dataDestination.name_destination
    const harga = dataDestination.harga
    const hargaGuide = dataDestination.harga_guide
    const totalOrder = models.Destination.getTotal(harga, hargaGuide)

    models.OrderHistory.create({
      UserId: req.session.account.id,
      DestinationId: req.params.id,
      tanggal: req.body.date
    })

    let mailOptions = {
      to: req.session.account.email,
      subject: "Order Destination",
      text: `Nama Pembeli: ${username} \n
            Nama Destinasi: ${nameDestination} \n
            Harga Destinasi: ${harga} \n
            Harga Guide: ${hargaGuide} \n
            Total Order: Rp. ${totalOrder}`
    }

    smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        res.end('Email Invalid')
      } 
    })
    res.redirect('/home')
    // res.send(totalOrder)
    // console.log(totalOrder)
  })
})

router.post('', (req, res) => {
  
})

router.post('', (req, res) => {
  
})

router.post('', (req, res) => {
  
})

router.post('', (req, res) => {
  
})

module.exports = router

