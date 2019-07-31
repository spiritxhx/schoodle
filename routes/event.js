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

        let infos = {};
        infos.title = values[0][0].title;
        infos.description = values[0][0].description;
        infos.owner = values[0][0].name;

        let timeslots = {};
        for (const timeslot of values[0]) {
          timeslots[timeslot.id] = {};
          timeslots[timeslot.id].start_date_time = timeslot.start_date_time;
          timeslots[timeslot.id].end_date_time = timeslot.end_date_time;
          // timeslots[timeslot.id].id = timeslot.id;
          timeslots[timeslot.id].attendees = [];
          if (values[1]) {
            for (attendee of values[1]) {
              // console.log('attendee: ', attendee);
              if (attendee.datetimeid === timeslot.id) {
                if (!timeslots[timeslot.id].attendees.includes(attendee.datetimeid))
                  timeslots[timeslot.id].attendees.push(attendee.name);
              }
            }
          }
        }
        let attendeeNames = [];
        for (const attendee of values[1]) {
          if (!attendeeNames.includes(attendee.name)){
            attendeeNames.push(attendee.name);
          }
        }
        if (values[0]) {
          let templateVars = {
            data: values[0],
            attendees: attendeeNames,
            infos: infos,
            timeslots: timeslots
          }
          // console.log('templateVars: ', templateVars);
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
            eventId: values[2]
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

