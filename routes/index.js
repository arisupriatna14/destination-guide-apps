const router = require("express").Router();
const models = require("../models");
const Users = models.User;
const bcrypt = require("bcrypt");
const session = require("express-session");
const nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "supriatnaarie24@gmail.com",
    pass: "arisupriatna990814"
  }
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  const errorMessage = "";
  res.render("form_register", { errorMessage: errorMessage });
});

router.post(
  "/signup",
  (req, res, next) => {
    Users.findAll({
      where: {
        email: req.body.email
      }
    })
      .then(findEmailDuplicate => {
        if (findEmailDuplicate.length >= 1) {
          let errorMessage = "Email already exists";
          res.render("form_register", { errorMessage: errorMessage });
        } else {
          next();
        }
      })
      .catch(err => {
        res.render("form_register", { errorMessage: err.message });
      });
  },
  (req, res) => {
    const request = req.body;
    Users.create({
      username: request.username,
      first_name: request.first_name,
      last_name: request.last_name,
      email: request.email,
      password: request.password
    }).then(dataUser => {
      let mailOptions = {
        to: dataUser.email,
        subject: "Registes Success",
        text: `Welcome to Destination Guide, ${dataUser.username}`
      };

      smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
          res.end("Email Invalid");
        }
      });

      req.session.account = dataUser;
      models.Destination.findAll().then(dataDestination => {
        res.render("homepage", {
          image: dataDestination,
          username: dataUser.username
        });
      });
    });
  }
);

router.get("/login", (req, res) => {
  res.render("form_login", { errorMessage: null });
});

router.post("/home", (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      const salt = user.salt;
      const pass = user.password;
      var hash = bcrypt.hashSync(req.body.password, salt);
      req.session.account = user;
      if (pass === hash) {
        //session
        if (user.role === 1) {
          res.redirect("/administrator");
        } else {
          models.Destination.findAll().then(dataDestination => {
            res.render("homepage", {
              image: dataDestination,
              username: user.username,
              id: user.id
            });
          });
        }
      }
    })
    .catch(err => {
      res.render("form_login", { errorMessage: "Email or password wrong" });
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.redirect("/");
  });
});

module.exports = router;
