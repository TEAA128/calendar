DROP DATABASE IF EXISTS calendarteaa;
CREATE DATABASE calendarteaa;

\c calendarteaa;

CREATE TABLE places (
  place_id_serial serial PRIMARY KEY,
  place_id uuid,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupancy_tax_rate real,
  average_rating real,
  number_of_review smallint,
  max_capacity smallint,
  location_city varchar(50),
  location_country varchar(75)
);

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
  b_nightly_fee smallint,
  b_cleaning_fee smallint,
  b_occupancy_tax_rate real,
  place_id_serial int,
  user_id_serial int,
  FOREIGN KEY (user_id_serial) REFERENCES users (user_id_serial),
  FOREIGN KEY (place_id_serial) REFERENCES places (place_id_serial)
);


COPY places FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/placesTable0.csv' CSV HEADER;
COPY places FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/placesTable1.csv' CSV HEADER;
COPY places FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/placesTable2.csv' CSV HEADER;
COPY places FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/placesTable3.csv' CSV HEADER;
COPY places FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/placesTable4.csv' CSV HEADER;
COPY places FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/placesTable5.csv' CSV HEADER;
COPY places FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/placesTable6.csv' CSV HEADER;
COPY places FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/placesTable7.csv' CSV HEADER;
COPY places FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/placesTable8.csv' CSV HEADER;
COPY places FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/placesTable9.csv' CSV HEADER;

COPY users FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/usersTable0.csv' CSV HEADER;
COPY users FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/usersTable1.csv' CSV HEADER;
COPY users FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/usersTable2.csv' CSV HEADER;
COPY users FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/usersTable3.csv' CSV HEADER;
COPY users FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/usersTable4.csv' CSV HEADER;
COPY users FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/usersTable5.csv' CSV HEADER;
COPY users FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/usersTable6.csv' CSV HEADER;
COPY users FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/usersTable7.csv' CSV HEADER;
COPY users FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/usersTable8.csv' CSV HEADER;
COPY users FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/usersTable9.csv' CSV HEADER;

COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable5.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable10.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable15.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable19.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable23.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable26.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable28.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable29.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable30.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable35.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable40.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable45.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable50.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable55.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable60.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable65.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable70.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable75.csv' CSV HEADER;
COPY bookings FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookingsTable80.csv' CSV HEADER;
