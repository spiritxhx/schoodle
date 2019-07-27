const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

// const addCreator = creator => {
//   const addCreatorQuery = `INSERT INTO attendees(name, email) VALUES ($1, $2)
//     RETURNING *;`;
//   return db.query(addCreatorQuery, [creator.name, creator.email])
//     .then(res => res.row)
//     .catch(err => console.log(err));
// };

// const addEventDetails = (eventDetail, creator) => {
//   console.log(creator);
//   console.log(creator.email);
//   const addEventQuery = `INSERT INTO events(title, description) VALUES ($1, $2)
//     RETURNING *;`;
//   return db.query(addEventQuery, [eventDetail.eventTitle, eventDetail.eventDescription])
//     .then(db.query(`INSERT INTO events(creator_id) SELECT id FROM attendees WHERE email = ${creator.email} RETURNING *;`))
//     .then(res => res.row)
//     .catch(err => console.log(err));
// };

const addEventDetails = (eventDetail, creator) => {
  const addCreatorQuery = `INSERT INTO attendees(name, email) VALUES ($1, $2)
    RETURNING *;`;
  const addEventQuery = `INSERT INTO events(title, description, creator_id) VALUES ($1, $2, (SELECT id FROM attendees WHERE email = ${creator.email}))
    RETURNING *;`;
  // const addCreatorId = `INSERT INTO events(creator_id) SELECT id FROM attendees WHERE email = ${creator.email}
  //   RETURNING *;`;
  return db.query(addCreatorQuery, [creator.name, creator.email])
    .then(db.query(addEventQuery, [eventDetail.eventTitle, eventDetail.eventDescription]))
    // .then(db.query(addCreatorId))
    .then(res => res.row)
    .catch(err => console.log(err));
};

// exports.addCreator = addCreator;
exports.addEventDetails = addEventDetails;
