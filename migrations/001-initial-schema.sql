-- Up

CREATE TABLE Jokes (
  id INTEGER PRIMARY KEY,
  category STRING,
  setup STRING,
  punchline STRING
);

-- Down

DROP TABLE Jokes;
