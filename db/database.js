const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

//add event information into the database
const addEventDetails = (eventDetail, owner, times, url) => {

  const addOwnerQuery = `INSERT INTO attendees(name, email) VALUES ($1, $2)
    RETURNING *;`;

  const addEventQuery = `INSERT INTO events(title, description, owner_id, owner_url, event_url) VALUES ($1, $2, $3, $4, $5)
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
            console.log()
            //wait till the event has been created then insert it to date_times as a foreign key
            db.query(addTimeQuery, [startTime, endTime, res2.rows[0].id])
              .then(res3 => res3.rows)
              .catch(err => console.log(err));
          }
        });
    });
};


const addAttendeeDetails = (attendee) => {
  const addAttendeeDetailsQuery = `INSERT INTO attendees(name, email) VALUES ($1, $2) RETURNING *;`;
  const addAvailabilityQuery = `INSERT INTO attendee_date_times(date_time_id, attendee_id) VALUES ($1, $2);`;

  return db.query(addAttendeeDetailsQuery, [attendee.name, attendee.email])
    .then(res2 => {
      console.log("++++++++++++++", res2.rows[0].id);

      db.query(addAvailabilityQuery, [1, res2.rows[0].id])
        .catch(err => console.log(err));
    });
};

// exports.addDateTime = addDateTime;
exports.addEventDetails = addEventDetails;
exports.addAttendeeDetails = addAttendeeDetails;
