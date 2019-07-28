const express = require('express');
const router = express.Router();
const database = require('../db/database');
const generateEventURLS = require('../helper');

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("event-create");
  });
  router.get("/success", (req, res) => {
    res.render('event-create-success');
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    let creator = {
      name: req.body.creatorName,
      email: req.body.creatorEmail,
    };

    let eventDetail = {
      eventTitle: req.body.eventTitle,
      eventDescription: req.body.eventDescription
    };

    const timeFormatting = dateTime => {
      let date = dateTime.slice(0, 10);
      let time = dateTime.slice(11, 16);
      return `${date} ${time}:00`
    };

    let times = {
      startDate: timeFormatting(req.body.startDate),
      endDate: timeFormatting(req.body.endDate)
    };
    console.log(times);


    // database.addCreator(creator);
    database.addEventDetails(eventDetail, creator,times);
    // database.addDateTime(times);
    res.redirect('/create/success');
  });
  return router;
};
