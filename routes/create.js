const express = require('express');
const router = express.Router();
const database = require('../db/database');
const { generateEventURLS, timeFormatting } = require('../helper');

module.exports = () => {
  // the home page (temperarily) thinking about making a another home page
  router.get("/", (req, res) => {
    res.render("event-create");
  });
  //the create success page
  router.get("/success", (req, res) => {
    res.render('event-create-success');
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    //get the input name and email
    const creator = {
      name: req.body.creatorName,
      email: req.body.creatorEmail,
    };

    //get the input event title and description
    const eventDetail = {
      eventTitle: req.body.eventTitle,
      eventDescription: req.body.eventDescription
    };

    //format the type of the time to be the same as timestamp in databse
    let times = {
      startDate: timeFormatting(req.body.startDate),
      endDate: timeFormatting(req.body.endDate)
    };
    console.log(times);

    //generate the urls for owner and the event
    const url = {
      eventURL: generateEventURLS().newEventURL,
      ownerURL: generateEventURLS().newOwnerURL
    };

    db.query(eventDetail, creator, times, url);
    res.redirect('/create/success');
  });
  return router;
};
