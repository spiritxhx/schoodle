const express = require('express');
const router = express.Router();
const { timeFormatting } = require('../helper');
const database = require('../db/database');

module.exports = () => {
  //new invite for the event url page
  router.get("/:url", (req, res) => {
    database.checkURL(req.params.url)
      .then(info => {
        console.log('event_id: ', info.id);
        console.log('event_title: ', info.title);
        console.log('event_description: ', info.description);
        info ? res.render('event-invite') : res.status(404).send('Page Not Exists!');
      });
  });

  //attendee submitted availability success page
  router.get("/success", (req, res) => {
    res.render('event-invite-availability-submitted');
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    const attendeeDetails = {
      name: req.body.attendeeName,
      email: req.body.attendeeEmail,
    };

    // let availabilitySelection = {

    // };
    database.addAttendeeDetails(attendeeDetails);
    res.redirect('/event/success');
  });
  return router;
};

