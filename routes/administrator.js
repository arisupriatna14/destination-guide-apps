const routes = require("express").Router();
const models = require("../models/");
const Destination = models.Destination;
const Guide = models.Guide;
const User= models.User
const session = require("express-session");

routes.get("/", (req, res) => {
  res.render("./admin/administrator-page");
});

routes.get("/destinations", (req, res) => {
  Destination.findAll({ include: [Guide] })
    .then(destinations => {
      res.render("./admin/destinations", { destinations: destinations });
    })
    .catch(err => {
      res.send(err);
    });
});

routes.get("/destination-add", (req, res) => {
  let errorMessage = "";
  res.render("./admin/destination-add", { errorMessage: errorMessage });
});

routes.post("/destination-add", (req, res) => {
  Destination.create({
    name_destination: req.body.name_destination,
    harga: req.body.harga,
    image: req.body.image,
    city: req.body.city,
    maps: req.body.maps,
    description: req.body.description,
    harga_guide: req.body.harga_guide
  })
    .then(() => {
      res.redirect("/administrator/destinations");
    })
    .catch(err => {
      res.render("./admin/destination-add", { errorMessage: err.message });
    });
});

routes.get("/:destinationId/guides", (req, res) => {
  Destination.findAll().then(destination => {
    Guide.findAll(
      {
        where: {
          DestinationId: req.params.destinationId
        }
      },
      { include: [Destination] },
      { order: ["id", "asc"] }
    )
      .then(guides => {
        res.render("./admin/guides", {
          guides: guides,
          destinationId: req.params.destinationId
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
});

routes.get("/:destinationId/guide-add", (req, res) => {
  let errorMessage = "";
  res.render("./admin/guide-add", {
    errorMessage: errorMessage,
    destinationId: req.params.destinationId
  });
  // res.send('success')
});

routes.post("/:destinationId/guide-add", (req, res) => {
  console.log('--- guide add');
  
  Guide.create({
    name: req.body.name,
    kuota: req.body.kuota,
    schedule: req.body.schedule,
    DestinationId: req.params.destinationId
  })
    .then(res.redirect("/administrator/destinations"))
    .catch(err => {
      console.log(err);
    });
});

routes.get("/:guideId/guide-edit", (req, res) => {
  let errorMessage = "";
  Guide.findOne({
    where: { id: req.params.guideId }
  })
    .then(guideFind => {
      res.render("./admin/guide-edit", {
        guide: guideFind,
        errorMessage: errorMessage
      });
    })
    .catch(err => {
      console.log(err);
    });
});

routes.post("/:guideId/guide-edit", (req, res) => {
  Guide.update(
    {
      name: req.body.name,
      kuota: req.body.kuota,
      schedule: req.body.schedule
    },
    {
      where: { id: req.params.guideId }
    }
  )
    .then(res.redirect("/administrator/destinations"))
    .catch(err => {
      console.log(err);
    });
});

routes.get("/:guideId/guide-delete", (req, res) => {
  Guide.destroy({
    where: { id: req.params.guideId }
  })
    .then(res.redirect("/administrator/destinations"))
    .catch(err => {
      console.log(err);
    });
});

routes.get('/manage-data-user', (req, res) => {
  models.User.findAll({
    include: [models.Destination]
  })
  .then(dataUserWithDestination => {
    res.send(dataUserWithDestination)
  })
})

routes.get('/manage-data-order', (req,res) => {
  models.Destination.findAll({
    include: [models.User]
  })
  .then(dataOrderWithUser => {
    res.send(dataOrderWithUser)
    res.render('orders', {dataOrderWithUser: dataOrderWithUser})
  })
})

module.exports = routes;