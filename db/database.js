const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

const addCreator = creator => {
  const addCreatorQuery = `INSERT INTO attendees(name, email) VALUES ($1, $2)
    RETURNING *;`
  return db.query(addCreatorQuery, [creator.name, creator.email])
    .then(res => res.row)
    .catch(err => console.log(err));
};

const addEventDetails = (eventDetail, creator) => {
  const addEventQuery = `INSERT INTO events(title, description, creator_email) VALUES ($1, $2, $3)
    RETURNING *;`
  return db.query(addEventQuery, [eventDetail.eventTitle, eventDetail.eventDescription])
    .then(res => res.row)
    .catch(err => console.log(err));
};

exports.addCreator = addCreator;
exports.addEventDetails = addEventDetails;
