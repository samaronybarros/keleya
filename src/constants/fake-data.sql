use keleya;

select "Generating fake users...";
insert into users (username, password, createdAt, updatedAt) values
('keleya@spambog.com', '$2b$12$7rMXV.SwPy3ZO.hn1KSpu.YFosF7ly0Iif/ECXKdikrZHoL./sUk.', '2019-02-24 00:00:00', '2019-02-24 00:00:00'),
('keleya2@spambog.com', '$2b$12$qxQ6/e3iCYdXTRAq6qYIo.RdwnBdgOQLF0aKqzxQHfpB9vDrvPgJq', '2019-02-24 00:00:00', '2019-02-24 00:00:00');

select "Generating fake posts...";
insert into posts(title, body, author_id, createdAt, updatedAt) values
('Fake Title 1', 'Fake Body 1', 1,'2019-02-24 00:00:00', '2019-02-24 00:00:00'),
('Fake Title 2', 'Fake Body 2', 2,'2019-02-24 00:00:00', '2019-02-24 00:00:00'),
('Fake Title 3', 'Fake Body 3', 2,'2019-02-24 00:00:00', '2019-02-24 00:00:00'),
('Fake Title 4', 'Fake Body 4', 1,'2019-02-24 00:00:00', '2019-02-24 00:00:00');
