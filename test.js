

const uuidv4 = require('uuid/v4');
let randomURL = uuidv4();
console.log(randomURL);


console.log(uuidv4());


const  = url => {
  const fetchQuery = `SELECT attendees.name, start_date_time, end_date_time
  FROM event_attendees JOIN attendees on attendees.id = attendee_id
  JOIN events on event_id = events.id
  JOIN attendee_date_times on attendees.id = attendee_id
  JOIN date_times on date_times.id = date_time_id
  WHERE event_url = $1 AND attendees.id=attendee_date_times.attendees_id;`;
  return db.query(fetchQuery, [url])
    .then(res => {
      // console.log('res.rows2: ', res.rows);
      return res.rows.length ? res.rows : undefined;
    })
    .catch(err => console.log(err));
};

const checkURL = url => {
  const checkURLQuery = `SELECT title, description, start_date_time, end_date_time, name
  FROM events JOIN date_times on events.id=event_id
  FULL JOIN attendees on attendees.id=owner_id WHERE event_url = $1`;
  return db.query(checkURLQuery, [url])
    .then(res => {
      // console.log('res.rows: ', res.rows);
      return res.rows.length ? res.rows : undefined;
    })
    .catch(err => console.log(err));
};
