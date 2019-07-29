
INSERT INTO attendees (name, email) VALUES ('Bob Martin', 'bob.martin@gmail.com');
INSERT INTO attendees (name, email) VALUES ('Sally Francis', 'sally.francis@hotmail.com');

INSERT INTO events (owner_id, title, description) VALUES (1, 'Sunday Brunch', 'Let''s go for brunch');
INSERT INTO events (owner_id, title, description) VALUES (2, 'My birthday Family Dinner', 'Dinner at my house for my birthday');

INSERT INTO date_times (event_id, start_date_time, end_date_time) VALUES (1, '2019-07-29 10:00:00', '2019-07-29 12:30:00'), (1, '2019-07-29 13:00:00', '2019-07-29 15:30:00'), (1, '2019-07-30 13:00:00', '2019-07-30 15:30:00'), (1, '2019-07-30 10:00:00', '2019-07-30 12:30:00'), (2, '2019-10-22 19:00:00', '2019-10-22 21:30:00'), (2, '2019-10-23 20:00:00', '2019-10-23 22:30:00');
