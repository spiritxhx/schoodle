const express = require('express');
const router = express.Router();
const database = require('../db/database');

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("event-create");
  });
  router.post("/", (req, res) => {
    console.log(req.body.creatorName);
    console.log(req.body.creatorEmail);
    console.log(req.body);
    let creator = {
      name: req.body.creatorName,
      email: req.body.creatorEmail,
    };

    let eventDetail = {
      eventTitle: req.body.eventTitle,
      eventDescription: req.body.eventDescription
    };

    let times = {
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };

    database.addCreator(creator);
    database.addEventDetails(eventDetail, creator);

  });
  return router;
};
