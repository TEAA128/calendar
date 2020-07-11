DROP DATABASE IF EXISTS calendarteaa;
CREATE DATABASE calendarteaa;

\c calendarteaa;

CREATE TABLE places (
  place_id_serial serial PRIMARY KEY,
  place_id uuid,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupance_tax_rate real,
  average_rating real,
  number_of_review smallint,
  max_capacity smallint,
  location_city varchar(50),
  location_country varchar(75)
);

-- ALTER TABLE places ADD PRIMARY KEY (place_id);

CREATE TABLE users (
  user_id_serial serial PRIMARY KEY,
  user_id uuid,
  first_name varchar(25),
  last_name varchar(25),
  address_line_1 varchar(50),
  address_line_2 varchar(50),
  city varchar(50),
  country varchar(75),
  zip_code varchar(10),
  email varchar(50)
);

CREATE TABLE bookings (
  booking_id_serial serial PRIMARY KEY,
  booking_id uuid,
  adults smallint,
  children smallint,
  infants smallint,
  checkin Date,
  checkout Date,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupance_tax_rate real,
  place_id_serial int,
  user_id_serial int,
  FOREIGN KEY (user_id_serial) REFERENCES users (user_id_serial),
  FOREIGN KEY (place_id_serial) REFERENCES places (place_id_serial)
);

-- ALTER TABLE bookings

-- ALTER TABLE bookings


COPY places FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/databasePostgresql/placesTable.csv' CSV HEADER;

COPY users FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/databasePostgresql/usersTable.csv' CSV HEADER;

COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/databasePostgresql/bookingsTable.csv' CSV HEADER;