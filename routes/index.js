const router = require("express").Router();
const models = require("../models");
const Users = models.User;
const bcrypt = require('bcrypt')

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  const errorMessage = ''
  res.render("form_register", {errorMessage: errorMessage});
});

router.post("/signup", (req, res, next) => {

  Users.findAll({
    where: {
      email: req.body.email
    }
  })
  .then(findEmailDuplicate => {
    if (findEmailDuplicate.length >= 1) {
      let errorMessage = 'Email already exists'
      res.render('form_register', {errorMessage: errorMessage})
    } else {
      next()
    }
  })
  .catch(err => {
    res.render('form_register', {errorMessage: err.message})
  })
}, (req, res) => {
  const request = req.body;
  Users.create({
    username: request.username,
    first_name: request.first_name,
    last_name: request.last_name,
    email: request.email,
    password: request.password
  })
  .then(dataUser => {
    models.Destination.findAll().then(dataDestination => {
      res.render("homepage", {
        image: dataDestination,
        username: dataUser.username
      });
    });
  });
});

router.get("/login", (req, res) => {
  res.render("form_login");
});

router.post("/login", (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email,
    }
  })
  .then(user => {
    const salt = user.salt
    const pass = user.password
    var hash = bcrypt.hashSync(req.body.password, salt);
    if (pass === hash) {
      //session
      models.Destination.findAll().then(dataDestination => {
        res.render("homepage", {
          image: dataDestination,
          username: user.username,
          id: user.id
        });
      });
    } else {
      res.send('email or password wrong');
    }
  })
});

module.exports = router;
