
INSERT INTO attendees (name, email) VALUES ('Bob Martin', 'bob.martin@gmail.com');
INSERT INTO attendees (name, email) VALUES ('Sally Francis', 'sally.francis@hotmail.com');
INSERT INTO attendees (name, email) VALUES ('BOB', 'BOB@ME');

INSERT INTO events (owner_id, title, description, owner_url, event_url) VALUES (1, 'Sunday Brunch', 'Let''s go for brunch', 'ownerurl1', 'eventurl1');
INSERT INTO events (owner_id, title, description, owner_url, event_url) VALUES (2, 'My birthday Family Dinner', 'Dinner at my house for my birthday', 'ownerurl2', 'eventurl2');

INSERT INTO date_times (event_id, start_date_time, end_date_time) VALUES (1, '2019-07-30 12:10:00', '2019-07-30 13:00:00');
INSERT INTO date_times (event_id, start_date_time, end_date_time) VALUES (1, '2019-07-30 12:10:00', '2019-08-02 12:00:00');
INSERT INTO date_times (event_id, start_date_time, end_date_time) VALUES (1, '2020-04-20 12:10:00', '2020-04-20 14:10:00');
INSERT INTO date_times (event_id, start_date_time, end_date_time) VALUES (1, '2020-04-30 14:10:00', '2020-04-30 16:10:00');
INSERT INTO date_times (event_id, start_date_time, end_date_time) VALUES (2, '2020-08-30 12:10:00', '2020-09-01 12:10:00');
INSERT INTO date_times (event_id, start_date_time, end_date_time) VALUES (2, '2019-09-02 12:10:00', '2019-10-01 12:10:00');

INSERT INTO event_attendees (event_id, attendee_id) VALUES (1, 1);
INSERT INTO event_attendees (event_id, attendee_id) VALUES (1, 2);
INSERT INTO event_attendees (event_id, attendee_id) VALUES (2, 3);

INSERT INTO attendee_date_times (date_time_id, attendees_id) VALUES (1, 1);
INSERT INTO attendee_date_times (date_time_id, attendees_id) VALUES (2, 1);
INSERT INTO attendee_date_times (date_time_id, attendees_id) VALUES (3, 1);
INSERT INTO attendee_date_times (date_time_id, attendees_id) VALUES (4, 1);
INSERT INTO attendee_date_times (date_time_id, attendees_id) VALUES (2, 2);
INSERT INTO attendee_date_times (date_time_id, attendees_id) VALUES (5, 3);

