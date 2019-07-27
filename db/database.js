const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

const addEventDetails = (eventDetail, creator) => {
  const addCreatorQuery = `INSERT INTO attendees(name, email) VALUES ($1, $2)
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

// exports.addCreator = addCreator;
exports.addEventDetails = addEventDetails;
