const express = require('express');
const router = express.Router();
const { timeFormatting } = require('../helper');
const database = require('../db/database');

module.exports = () => {
  //new invite for the event url page
  router.get("/attendee/:url", (req, res) => {
    let url_infos = database.checkURL(req.params.url);
    let fetchAttendees = database.fetchAttendees(req.params.url);
    Promise.all([url_infos, fetchAttendees])
      .then(values => {
        if (values[0]) {
          let templateVars = {
            data: values[0],
            attendees: values[1]
          }
          console.log('templateVars: ', templateVars);
          res.render('event-invite', templateVars);
        } else {
          res.status(404).send('Error - Page Does Not Exist!');
        }
      })
  });

  router.get("/organiser/:url", (req, res) => {
    let url_infos = database.checkOwnerURL(req.params.url);
    let fetchAttendees = database.fetchAttendees(req.params.url);
    let fetchEventId = database.fetchEventId(req.params.url);
    Promise.all([url_infos, fetchAttendees, fetchEventId])
      .then(values => {
        if (values[0]) {
          let templateVars = {
            data: values[0],
            attendees: values[1],
            eventId:values[2]
          };
          console.log('templateVars: ', templateVars);
          res.render('organiser-event-invite', templateVars);
        } else {
          res.status(404).send('Error - Page Does Not Exist!');
        }
      })
      .catch(err => console.log(err));
  });

  //attendee submitted availability success page
  router.get("/success", (req, res) => {
    res.render('event-invite-availability-submitted');
  });

  router.post("/modifyname", (req, res) => {
    let title = req.body['modify-name'][0];
    // let url = req.params.url;
    console.log("FUCKKKKKK");

    database.updateEventTitle(title);

    let urlInfo = database.checkOwnerURL(req.params.url);
    let fetchAttendees = database.fetchAttendees(req.params.url);
    Promise.all([urlInfo, fetchAttendees])
      .then(values => {
        if (values[0]) {
          let templateVars = {
            data: values[0],
            attendees: values[1]
          };
          res.render('organiser-event-invite', templateVars);
        } else {
          res.status(404).send('Error - Page Does Not Exist!');
        }
      })
      .catch(err => console.log(err));
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

