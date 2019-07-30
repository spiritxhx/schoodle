
INSERT INTO attendees (name, email) VALUES ('Bob Martin', 'bob.martin@gmail.com');
INSERT INTO attendees (name, email) VALUES ('Sally Francis', 'sally.francis@hotmail.com');

INSERT INTO events (owner_id, title, description, owner_url, event_url) VALUES (1, 'Sunday Brunch', 'Let''s go for brunch', 'ownerurl1', 'eventurl1');
INSERT INTO events (owner_id, title, description, owner_url, event_url) VALUES (2, 'My birthday Family Dinner', 'Dinner at my house for my birthday', 'ownerurl2', 'eventurl2');

INSERT INTO date_times (event_id, start_date_time, end_date_time) VALUES (1, '2019-07-29 10:00:00 AM', '2019-07-29 12:30:00 PM'), (1, '2019-07-29 01:00:00 PM', '2019-07-29 03:30:00 PM'), (1, '2019-07-30 01:00:00 PM', '2019-07-30 03:30:00 PM'), (1, '2019-07-30 10:00:00 AM', '2019-07-30 12:30:00 PM'), (2, '2019-10-22 19:00:00', '2019-10-22 21:30:00'), (2, '2019-10-23 20:00:00', '2019-10-23 22:30:00');

INSERT INTO event_attendees (event_id, attendee_id) VALUES (1, 1);
INSERT INTO event_attendees (event_id, attendee_id) VALUES (1, 2);

INSERT INTO attendee_date_times (date_time_id, attendee_id) VALUES (1, 1);
INSERT INTO attendee_date_times (date_time_id, attendee_id) VALUES (2, 1);
INSERT INTO attendee_date_times (date_time_id, attendee_id) VALUES (3, 1);
INSERT INTO attendee_date_times (date_time_id, attendee_id) VALUES (4, 1);
