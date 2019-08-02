const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

//add event information into the database
const addEventDetails = (eventDetail, owner, times, url) => {

  const addOwnerQuery = `INSERT INTO attendees(name, email) VALUES ($1, $2)
    RETURNING *;`;
  const addEventQuery = `INSERT INTO events(title, description, owner_id, event_url, owner_url) VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`;
  const addTimeQuery = `INSERT INTO date_times(start_date_time, end_date_time, event_id) VALUES ($1, $2, $3)
    RETURNING *;`;
  return db.query(addOwnerQuery, [owner.name, owner.email])
    .then(res => {

      //wait till the owner has been created then insert it to events as a foreign key
      db.query(addEventQuery, [eventDetail.eventTitle, eventDetail.eventDescription, res.rows[0].id, url.eventURL, url.ownerURL])
        .then(res2 => {
          //deal with each of the time slot been sent in
          for (const time in times) {
            let startTime = times[time].split(' + ')[0];
            let endTime = times[time].split(' + ')[1];
            //wait till the event has been created then insert it to date_times as a foreign key
            db.query(addTimeQuery, [startTime, endTime, res2.rows[0].id])
              .then(res3 => res3.rows)
              .catch(err => console.log(err));
          }
        });
    });
};

//add attendee into the table
const addAttendeeDetails = attendee => {
  const addAttendeeDetailsQuery = `INSERT INTO attendees(name, email) VALUES ($1, $2) RETURNING *;`;
  const addEventAttendeeQuery = `INSERT INTO event_attendees(event_id, attendee_id) VALUES ($1, $2) RETURNING *;`;
  const addAttendeeDateTimeQuery = `INSERT INTO attendee_date_times(date_time_id, attendees_id) VALUES ($1, $2) RETURNING *;`;

  return db.query(addAttendeeDetailsQuery, [attendee.name, attendee.email])
    .then(res => {
      const addTable1 = db.query(addEventAttendeeQuery, [attendee.eventId, res.rows[0].id]);
      addTable1
        .then(res2 => {
          if (Array.isArray(attendee.timeslotId)) {
            for (const ts of attendee.timeslotId) {
              db.query(addAttendeeDateTimeQuery, [ts, res.rows[0].id]);
            }
          } else {
            db.query(addAttendeeDateTimeQuery, [attendee.timeslotId, res.rows[0].id])
              .then(res3 => res3.rows)
              .catch(err => console.log(err));
          }
        });
    });
};

const updateAttendeeDetails = attendee => {
  const deleteQuery = `DELETE FROM attendee_date_times
  WHERE attendees_id IN (SELECT attendees.id
  FROM attendees
  WHERE attendees.name=$1 AND attendees.email=$2);`;
  const getAttendeeIdQuery = `SELECT attendees.id FROM attendees
  WHERE attendees.name=$1 AND attendees.email=$2;`;
  const addAttendeeDateTimeQuery = `INSERT INTO attendee_date_times(date_time_id, attendees_id) VALUES ($1, $2) RETURNING *;`;
  //delete information in date_time_attendee with the attendee first
  return db.query(deleteQuery, [attendee.name, attendee.email])
    .then(res => {
      db.query(getAttendeeIdQuery, [attendee.name, attendee.email])
        .then(res2 => {
          console.log('res2.rows[0]: ', res2.rows[0]);
          if (Array.isArray(attendee.timeslotId)) {
            for (const ts of attendee.timeslotId) {
              db.query(addAttendeeDateTimeQuery, [ts, res2.rows[0].id]);
            }
          } else {
            db.query(addAttendeeDateTimeQuery, [attendee.timeslotId, res2.rows[0].id])
              .then(res3 => res3.rows)
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    });
};

const checkURL = url => {
  const checkURLQuery = `SELECT title, description, start_date_time, end_date_time, name, date_times.id,
  events.event_url as eventURL, events.id as eventId
  FROM events JOIN date_times on events.id=event_id
  FULL JOIN attendees on attendees.id=owner_id WHERE event_url = $1`;
  return db.query(checkURLQuery, [url])
    .then(res => {
      return res.rows.length ? res.rows : undefined;
    })
    .catch(err => console.log(err));
};

const checkOwnerURL = url => {
  const checkURLQuery = `SELECT title, description, start_date_time, end_date_time, name, date_times.id
  FROM events JOIN date_times on events.id=event_id
  FULL JOIN attendees on attendees.id=owner_id WHERE owner_url = $1`;
  return db.query(checkURLQuery, [url])
    .then(res => {
      return res.rows.length ? res.rows : undefined;
    })
    .catch(err => console.log(err));
};

const fetchAttendees = url => {
  //fetch the names and date_times of the attendees going to this event
  const fetchQuery = `SELECT attendees.id as attendeeId, attendees.name, start_date_time, end_date_time, date_times.id as dateTimeId
  FROM event_attendees JOIN attendees on attendees.id = attendee_id
  JOIN events on event_id = events.id
  JOIN attendee_date_times on attendees.id = attendee_id
  JOIN date_times on date_times.id = date_time_id
  WHERE event_url = $1 AND attendees.id=attendee_date_times.attendees_id`;
  return db.query(fetchQuery, [url])
    .then(res => {
      // console.log('res.rows2: ', res.rows);
      return res.rows.length ? res.rows : undefined;
    })
    .catch(err => console.log(err));
};

const fetchAttendeesForOwner = url => {
  //fetch the names and date_times of the attendees going to this event
  const fetchQuery = `SELECT attendees.id as attendeeId, attendees.name, start_date_time, end_date_time, date_times.id as dateTimeId
  FROM event_attendees JOIN attendees on attendees.id = attendee_id
  JOIN events on event_id = events.id
  JOIN attendee_date_times on attendees.id = attendee_id
  JOIN date_times on date_times.id = date_time_id
  WHERE owner_url = $1 AND attendees.id=attendee_date_times.attendees_id`;
  return db.query(fetchQuery, [url])
    .then(res => {
      console.log('res.rows2: ', res.rows);
      return res.rows.length ? res.rows : undefined;
    })
    .catch(err => console.log(err));
};

const fetchAttendeesByEventId = eventid => {
  //fetch the names and date_times of the attendees going to this event using the event id
  const fetchQuery = `SELECT attendees.id as attendeeId, attendees.name, start_date_time, end_date_time, date_times.id as dateTimeId
  FROM event_attendees JOIN attendees on attendees.id = attendee_id
  JOIN events on event_id = events.id
  JOIN attendee_date_times on attendees.id = attendee_id
  JOIN date_times on date_times.id = date_time_id
  WHERE events.id = $1 AND attendees.id=attendee_date_times.attendees_id;`;
  return db.query(fetchQuery, [eventid])
    .then(res => {
      // console.log('res.rows2: ', res.rows);
      return res.rows.length ? res.rows : undefined;
    })
    .catch(err => console.log(err));
};

const fetchEventId = url => {
  const eventIdQuery = `SELECT id FROM events WHERE owner_url = $1;`;
  return db.query(eventIdQuery, [url])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.log(err));
};

const updateEventTitle = (title, eventid) => {
  let updateQuery = `UPDATE events SET title = $1 WHERE id = $2;`;
  return db.query(updateQuery, [title, eventid])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.log(err));
};

const updateEventDescription = (title, eventid) => {
  let updateQuery = `UPDATE events SET description = $1 WHERE id = $2;`;
  return db.query(updateQuery, [title, eventid])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.log(err));
};

const fetchEventInfo = eventid => {
  const fetchEventInfoQuery = `SELECT title, description, owner_url, start_date_time, end_date_time, name, date_times.id, events.id
  FROM events JOIN date_times on events.id=event_id
  FULL JOIN attendees on attendees.id=owner_id WHERE events.id = $1`;
  return db.query(fetchEventInfoQuery, [eventid])
    .then(res => {
      // console.log(res);
      return res.rows;
    })
    .catch(err => console.log(err));
};


// exports.addDateTime = addDateTime;
exports.addEventDetails = addEventDetails;
exports.addAttendeeDetails = addAttendeeDetails;
exports.updateAttendeeDetails = updateAttendeeDetails;
exports.checkURL = checkURL;
exports.fetchAttendees = fetchAttendees;
exports.checkOwnerURL = checkOwnerURL;
exports.updateEventTitle = updateEventTitle;
exports.updateEventDescription = updateEventDescription;
exports.fetchEventId = fetchEventId;
exports.fetchEventInfo = fetchEventInfo;
exports.fetchAttendeesByEventId = fetchAttendeesByEventId;
exports.fetchAttendeesForOwner = fetchAttendeesForOwner;
