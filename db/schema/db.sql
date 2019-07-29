-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS date_times CASCADE;
CREATE TABLE date_times (
 id SERIAL PRIMARY KEY NOT NULL,
<<<<<<< HEAD
 event_id INTEGER references events(id) ON DELETE CASCADE,
 start_date_time TIMESTAMP,
 end_date_time TIMESTAMP
=======
 start_date_time TEXT,
 end_date_time TEXT,
 event_id INTEGER references events(id) ON DELETE CASCADE
>>>>>>> create-ajax
);

DROP TABLE IF EXISTS attendees CASCADE;
CREATE TABLE attendees (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email TEXT
);

DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id INTEGER references attendees(id) ON DELETE CASCADE,
  owner_url TEXT,
  event_url TEXT
);

DROP TABLE IF EXISTS attendee_date_times CASCADE;
CREATE TABLE attendee_date_times (
  date_time_id INTEGER references date_times(id) ON DELETE CASCADE,
  attendee_id INTEGER references attendees(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS event_attendees CASCADE;
CREATE TABLE event_attendees (
  event_id INTEGER references events(id) ON DELETE CASCADE,
  attendee_id INTEGER references attendees(id) ON DELETE CASCADE
);
