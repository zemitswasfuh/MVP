DROP TABLE IF EXISTS todo;

CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    task TEXT,
    priorirty INTEGER
);