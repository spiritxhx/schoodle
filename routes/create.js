const express = require('express');
const router = express.Router();
const database = require('../db/database');
const { generateEventURLS } = require('../helper');

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
    // console.log(req.body);
    //get the input name and email
    const creator = {
      name: req.body.creatorName.toLowerCase(),
      email: req.body.creatorEmail.toLowerCase(),
    };

    //get the input event title and description
    const eventDetail = {
      eventTitle: req.body.eventTitle,
      eventDescription: req.body.eventDescription
    };

    let times = JSON.parse(JSON.stringify(req.body));
    delete times.creatorName;
    delete times.creatorEmail;
    delete times.eventTitle;
    delete times.eventDescription;
    console.log(times);

    //generate the urls for owner and the event
    const url = {
      eventURL: generateEventURLS().newEventURL,
      ownerURL: generateEventURLS().newOwnerURL
    };

    database.addEventDetails(eventDetail, creator, times, url);
    res.render("event-create-success", url);
  });
  return router;
};
