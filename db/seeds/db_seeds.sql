
INSERT INTO attendees (name, email) VALUES ('Bob Martin', 'bob.martin@gmail.com');
INSERT INTO attendees (name, email) VALUES ('Sally Francis', 'sally.francis@hotmail.com');

INSERT INTO events (owner_id, title, description, owner_url, event_url) VALUES (1, 'Sunday Brunch', 'Let''s go for brunch', 'ownerurl1', 'eventurl1');
INSERT INTO events (owner_id, title, description, owner_url, event_url) VALUES (2, 'My birthday Family Dinner', 'Dinner at my house for my birthday', 'ownerurl2', 'eventurl2');

INSERT INTO date_times (event_id, start_date_time, end_date_time) VALUES (1, 'Tue Jul 30 2019 12:10', 'Tue Jul 30 2019 13:00'), (1, 'Tue Jul 30 2019 12:00', 'Fri Aug 02 2019 12:00'), (1, 'Thu Apr 30 2020 12:10', 'Thu Apr 30 2020 14:10'), (1, 'Thu Apr 30 2020 14:10', 'Thu Apr 30 2020 16:10'), (2, 'Fri Aug 30 2019 12:10', 'Sun Sep 01 2019 12:10'), (2, 'Mon Sep 02 2019 12:10', 'Tue Oct 01 2019 12:10');

INSERT INTO event_attendees (event_id, attendee_id) VALUES (1, 1);
INSERT INTO event_attendees (event_id, attendee_id) VALUES (1, 2);

INSERT INTO attendee_date_times (date_time_id, attendee_id) VALUES (1, 1);
INSERT INTO attendee_date_times (date_time_id, attendee_id) VALUES (2, 1);
INSERT INTO attendee_date_times (date_time_id, attendee_id) VALUES (3, 1);
INSERT INTO attendee_date_times (date_time_id, attendee_id) VALUES (4, 1);
