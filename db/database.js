const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

const addEventDetails = (eventDetail, creator) => {
  const addCreatorQuery = `INSERT INTO attendees(name, email, start_date_time, end_date_time) VALUES ($1, $2)
    RETURNING *;`;
  const addEventQuery = `INSERT INTO events(title, description, creator_id) VALUES ($1, $2, $3)
    RETURNING *;`;
  return db.query(addCreatorQuery, [creator.name, creator.email])
    .then(res => {
      db.query(addEventQuery, [eventDetail.eventTitle, eventDetail.eventDescription, res.rows[0].id])
        .then(res => res.rows)
        .catch(err => console.log(err));
    })
};

const addDateTime = times => {
  const addTimeQuery = `INSERT INTO date_times(start_date_time, end_date_time) VALUES ($1, $2)
    RETURNING *;`;
  return db.query(addTimeQuery, [times.startDate, times.endDate])
    .then(res => res.rows)
    .catch(err => console.log(err));
};

exports.addDateTime = addDateTime;
exports.addEventDetails = addEventDetails;
