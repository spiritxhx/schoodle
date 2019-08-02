const express = require('express');
const router = express.Router();
const { timeFormatting } = require('../helper');
const database = require('../db/database');

module.exports = () => {
  //new invite for the event url page
  //contains all the information of the events
  //and includes the table of availability
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
        if (values[1]) {
          for (const attendee of values[1]) {
            if (!attendeeNames.includes(attendee.name)) {
              attendeeNames.push(attendee.name);
            }
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
          res.render('404');
        }
      });
  });

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
          res.render('organiser-event-invite', templateVars);
        } else {
          res.render('404');
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
          .then(res3 => {
            //refresh the page
            res.redirect('back');
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
          .then(res3 => {
            res.redirect('back');
          })
          .catch(err => console.log(err));
      });

  });


  router.post("/attendee/add", (req, res) => {
    // console.log(req.body);
    const attendeeInfo = {
      name: req.body.attendeeName.toLowerCase(),
      email: req.body.attendeeEmail.toLowerCase(),
      eventURL: req.body.eventURL,
      eventId: req.body.eventId,
      timeslotId: req.body.timeslotId,
      eventOwner: req.body.owner
    };
    if (!attendeeInfo.name || !attendeeInfo.email || !attendeeInfo.timeslotId) {
      res.render('404');
    } else {
      database.addAttendeeDetails(attendeeInfo)
        .then(res2 => {
          res.render('event-invite-availability-submitted', attendeeInfo);
        })
    }
  });

  //the update attendee availability function
  router.post("/attendee/update", (req, res) => {
    const attendeeInfo = {
      name: req.body.attendeeName.toLowerCase(),
      email: req.body.attendeeEmail.toLowerCase(),
      eventURL: req.body.eventURL,
      eventId: req.body.eventId,
      timeslotId: req.body.timeslotId,
      eventOwner: req.body.owner
    };
    // console.log("attendeeInfo: ", attendeeInfo);
    if (!attendeeInfo.name || !attendeeInfo.email || !attendeeInfo.timeslotId) {
      res.render('404');
    } else {
      database.updateAttendeeDetails(attendeeInfo)
        .then(res2 => {
          res.render('event-invite-availability-submitted', attendeeInfo);
        })
        .catch(err => console.log(err));
    }
  });

  return router;
};

