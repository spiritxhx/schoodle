const express = require('express');
const router = express.Router();
const { timeFormatting } = require('../helper');
const database = require('../db/database');

module.exports = () => {
  //new invite for the event url page
  //contains all the information of the events
  //and including the table of availability
  router.get("/attendee/:url", (req, res) => {
    let url_infos = database.checkURL(req.params.url);
    let fetchAttendees = database.fetchAttendees(req.params.url);
    Promise.all([url_infos, fetchAttendees])
      .then(values => {
        //general event information
        let infos = {};
        infos.title = values[0][0].title;
        infos.description = values[0][0].description;
        infos.owner = values[0][0].name;
        infos.eventURL = values[0][0].eventurl;
        infos.eventId = values[0][0].eventid;
        //time slot information contains the attendee who is available in this time slot
        let timeslots = {};
        for (const timeslot of values[0]) {
          timeslots[timeslot.id] = {};
          timeslots[timeslot.id].start_date_time = timeslot.start_date_time;
          timeslots[timeslot.id].end_date_time = timeslot.end_date_time;
          timeslots[timeslot.id].attendees = [];
          if (values[1]) {
            for (attendee of values[1]) {
              if (attendee.datetimeid === timeslot.id) {
                if (!timeslots[timeslot.id].attendees.includes(attendee.datetimeid))
                  timeslots[timeslot.id].attendees.push(attendee.name);
              }
            }
          }
        }

        //the attendee names array without duplicate
        let attendeeNames = [];
        for (const attendee of values[1]) {
          if (!attendeeNames.includes(attendee.name)) {
            attendeeNames.push(attendee.name);
          }
        }
        if (values[0]) {
          let templateVars = {
            attendees: attendeeNames,
            infos: infos,
            timeslots: timeslots
          }
          // console.log('templateVars: ', templateVars);
          res.render('event-invite', templateVars);
        } else {
          res.status(404).send('Error - Page Does Not Exist!');
        }
      });
  });
  // without table
  // router.get("/organiser/:url", (req, res) => {
  //   let url_infos = database.checkOwnerURL(req.params.url);
  //   let fetchAttendees = database.fetchAttendees(req.params.url);
  //   let fetchEventId = database.fetchEventId(req.params.url);
  //   Promise.all([url_infos, fetchAttendees, fetchEventId])
  //     .then(values => {
  //       if (values[0]) {
  //         let templateVars = {
  //           data: values[0],
  //           attendees: values[1],
  //           eventid: values[2][0].id
  //           // eventId: values[2]
  //         };
  //         console.log('templateVars: ', templateVars);
  //         res.render('organiser-event-invite', templateVars);
  //       } else {
  //         res.status(404).send('Error - Page Does Not Exist!');
  //       }
  //     })
  //     .catch(err => console.log(err));
  // });

  // with table
  router.get("/organiser/:url", (req, res) => {
    let url_infos = database.checkOwnerURL(req.params.url);
    let fetchAttendees = database.fetchAttendeesForOwner(req.params.url);
    let fetchEventId = database.fetchEventId(req.params.url);
    Promise.all([url_infos, fetchAttendees, fetchEventId])
      .then(values => {
        // console.log("VALUES", values);
        //general event information
        let infos = {};
        infos.title = values[0][0].title;
        infos.description = values[0][0].description;
        infos.owner = values[0][0].name;

        //time slot information contains the attendee who is available in this time slot
        let timeslots = {};
        for (const timeslot of values[0]) {
          console.log('timeslot: ', timeslot);
          timeslots[timeslot.id] = {};
          timeslots[timeslot.id].start_date_time = timeslot.start_date_time;
          timeslots[timeslot.id].end_date_time = timeslot.end_date_time;
          timeslots[timeslot.id].attendees = [];
          if (values[1]) {
            for (let attendee of values[1]) {
              if (attendee.datetimeid === timeslot.id) {
                if (!timeslots[timeslot.id].attendees.includes(attendee.datetimeid))
                  timeslots[timeslot.id].attendees.push(attendee.name);
              }
            }
          }
        }

        //the attendee names array without duplicate
        let attendeeNames = [];
        if (values[1]) {
          for (const attendee of values[1]) {
            if (!attendeeNames.includes(attendee.name)) {
              attendeeNames.push(attendee.name);
            }
          }
        }

        if (values[0]) {
          let templateVars = {
            data: values[0],
            attendees: attendeeNames,
            infos: infos,
            timeslots: timeslots,
            eventid: values[2][0].id
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

  router.post("/organiser/modifyname", (req, res) => {
    let title = req.body['modify-name'][0];
    let eventid = req.body['eventIdVal'];

    database.updateEventTitle(title, eventid)
      .then(res2 => {
        let fetchEventInfo = database.fetchEventInfo(eventid);
        let fetchAttendees = database.fetchAttendeesByEventId(eventid);
        Promise.all([fetchEventInfo, fetchAttendees])
          .then(values => {
            let templateVars = {
              data: values[0],
              attendees: values[1],
              eventid: eventid
            };
            console.log('data: ', values[0]);
            res.render('organiser-event-invite', templateVars);
          })
          .catch(err => console.log(err));
      });

  });

  router.post("/organiser/modifydescription", (req, res) => {
    let title = req.body['modify-description'][0];
    let eventid = req.body['eventIdVal'];

    database.updateEventDescription(title, eventid)
      .then(res2 => {
        let fetchEventInfo = database.fetchEventInfo(eventid);
        let fetchAttendees = database.fetchAttendeesByEventId(eventid);
        Promise.all([fetchEventInfo, fetchAttendees])
          .then(values => {
            let templateVars = {
              data: values[0],
              attendees: values[1],
              eventid: eventid
            };
            console.log('data: ', values[0]);
            res.render('organiser-event-invite', templateVars);
          })
          .catch(err => console.log(err));
      });

  });


  router.post("/", (req, res) => {
    // console.log(req.body);
    const attendeeInfo = {
      name: req.body.attendeeName,
      email: req.body.attendeeEmail,
      eventURL: req.body.eventURL,
      eventId: req.body.eventId,
      timeslotId: req.body.timeslotId
    };
    console.log(attendeeInfo);
    if (!attendeeInfo.name || !attendeeInfo.email || !attendeeInfo.timeslotId) {
      res.status(400).send('Please input all the information! (including the timeslots, your name and email)');
    }
    database.addAttendeeDetails(attendeeInfo)
      .then(res2 => {
        let url='/event/attendee/' + attendeeInfo.eventURL;
        res.redirect(url);
      })
  });

  return router;
};

