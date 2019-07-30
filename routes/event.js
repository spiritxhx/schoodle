const express = require('express');
const router = express.Router();
const { timeFormatting } = require('../helper');
const database = require('../db/database');

module.exports = () => {
  //new invite for the event url page
  router.get("/url/:url", (req, res) => {
    database.checkURL(req.params.url)
      .then(infos => {
        if (infos) {
          let templateVars = {
            data: infos
          }
          res.render('event-invite', templateVars);
        } else {
          res.status(404).send('Page Not Exists!');
        }
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
