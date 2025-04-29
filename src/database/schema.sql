CREATE DATABASE heros_bd;

\c heros_bd;

CREATE TABLE herois (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    photo VARCHAR(500)
);

CREATE TABLE editoras (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    founder VARCHAR(100) NOT NULL
);

INSERT INTO herois (name, photo) VALUES
('Superman', 'https://static.wikia.nocookie.net/fantas/images/7/71/Supromi.jpg/revision/latest?cb=20130512235733&path-prefix=pt'),
('Batman', 'hhttps://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/09/batman-calcada-da-fama.png'),
('Spider-Man', 'https://upload.wikimedia.org/wikipedia/pt/7/78/Spider-Man_jogo_2018_capa.png'),
('Flash', 'https://static.wikia.nocookie.net/heroisfanfiction/images/e/e3/Flash_%28UDC27%29.jpg/revision/latest?cb=20190206185848&path-prefix=pt-br');

INSERT INTO editoras (name, founder) VALUES
('DC Comics', 'Malcolm Wheeler-Nicholson'),
('DC Comics', 'Martin Goodman'),
('Marvel', 'Malcolm Wheeler-Nicholson'),
('DC Comics', 'Malcolm Wheeler-Nicholson');