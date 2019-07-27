const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  databse: 'midterm'
});

const addCreator = creator => {
  const addCreatorQuery = `INSERT INTO attendees(name, email) VALUES ($1, $2)
    RETURNING *;`
  return pool.query(addCreatorQuery, [creator.name, creator.email])
    .then(res => res.row)
    .catch(err => console.log(err));
};
exports.addCreator = addCreator;
