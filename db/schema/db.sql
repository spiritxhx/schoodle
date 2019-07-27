-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS date_times CASCADE;
CREATE TABLE date_times (
 id SERIAL PRIMARY KEY NOT NULL,
 start_date_time TIMESTAMP,
 end_date_time TIMESTAMP
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
  creator_email TEXT references attendees(email),
  creator_url TEXT,
  attendee_url TEXT
);

DROP TABLE IF EXISTS attendee_date_times CASCADE;
CREATE TABLE attendee_date_times (
  date_time_id INTEGER references date_times(id),
  attendee_id INTEGER references attendees(id)
);

DROP TABLE IF EXISTS event_attendees CASCADE;
CREATE TABLE event_attendees (
  event_id INTEGER references events(id),
  attendee_id INTEGER references attendees(id)
);
