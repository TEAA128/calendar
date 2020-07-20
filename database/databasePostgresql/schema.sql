DROP DATABASE IF EXISTS calendarteaa;
CREATE DATABASE calendarteaa;

\c calendarteaa;

CREATE TABLE places (
  id SERIAL NOT NULL PRIMARY KEY,
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
  id SERIAL NOT NULL PRIMARY KEY,
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
  id SERIAL PRIMARY KEY,
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
  FOREIGN KEY (user_id_serial) REFERENCES users (id),
  FOREIGN KEY (place_id_serial) REFERENCES places (id)
);

COPY places(nightly_fee, cleaning_fee, occupancy_tax_rate, average_rating, number_of_review, max_capacity, location_city, location_country) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/places/placesTable0.csv' DELIMITER ',' CSV HEADER;
COPY places(nightly_fee, cleaning_fee, occupancy_tax_rate, average_rating, number_of_review, max_capacity, location_city, location_country) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/places/placesTable1.csv' DELIMITER ',' CSV HEADER;
COPY places(nightly_fee, cleaning_fee, occupancy_tax_rate, average_rating, number_of_review, max_capacity, location_city, location_country) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/places/placesTable2.csv' DELIMITER ',' CSV HEADER;
COPY places(nightly_fee, cleaning_fee, occupancy_tax_rate, average_rating, number_of_review, max_capacity, location_city, location_country) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/places/placesTable3.csv' DELIMITER ',' CSV HEADER;
COPY places(nightly_fee, cleaning_fee, occupancy_tax_rate, average_rating, number_of_review, max_capacity, location_city, location_country) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/places/placesTable4.csv' DELIMITER ',' CSV HEADER;
COPY places(nightly_fee, cleaning_fee, occupancy_tax_rate, average_rating, number_of_review, max_capacity, location_city, location_country) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/places/placesTable5.csv' DELIMITER ',' CSV HEADER;
COPY places(nightly_fee, cleaning_fee, occupancy_tax_rate, average_rating, number_of_review, max_capacity, location_city, location_country) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/places/placesTable6.csv' DELIMITER ',' CSV HEADER;
COPY places(nightly_fee, cleaning_fee, occupancy_tax_rate, average_rating, number_of_review, max_capacity, location_city, location_country) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/places/placesTable7.csv' DELIMITER ',' CSV HEADER;
COPY places(nightly_fee, cleaning_fee, occupancy_tax_rate, average_rating, number_of_review, max_capacity, location_city, location_country) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/places/placesTable8.csv' DELIMITER ',' CSV HEADER;
COPY places(nightly_fee, cleaning_fee, occupancy_tax_rate, average_rating, number_of_review, max_capacity, location_city, location_country) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/places/placesTable9.csv' DELIMITER ',' CSV HEADER;

COPY users(first_name, last_name, address_line_1, address_line_2, city, country, zip_code, email) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/users/usersTable0.csv' DELIMITER ',' CSV HEADER;
COPY users(first_name, last_name, address_line_1, address_line_2, city, country, zip_code, email) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/users/usersTable1.csv' DELIMITER ',' CSV HEADER;
COPY users(first_name, last_name, address_line_1, address_line_2, city, country, zip_code, email) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/users/usersTable2.csv' DELIMITER ',' CSV HEADER;
COPY users(first_name, last_name, address_line_1, address_line_2, city, country, zip_code, email) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/users/usersTable3.csv' DELIMITER ',' CSV HEADER;
COPY users(first_name, last_name, address_line_1, address_line_2, city, country, zip_code, email) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/users/usersTable4.csv' DELIMITER ',' CSV HEADER;
COPY users(first_name, last_name, address_line_1, address_line_2, city, country, zip_code, email) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/users/usersTable5.csv' DELIMITER ',' CSV HEADER;
COPY users(first_name, last_name, address_line_1, address_line_2, city, country, zip_code, email) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/users/usersTable6.csv' DELIMITER ',' CSV HEADER;
COPY users(first_name, last_name, address_line_1, address_line_2, city, country, zip_code, email) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/users/usersTable7.csv' DELIMITER ',' CSV HEADER;
COPY users(first_name, last_name, address_line_1, address_line_2, city, country, zip_code, email) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/users/usersTable8.csv' DELIMITER ',' CSV HEADER;
COPY users(first_name, last_name, address_line_1, address_line_2, city, country, zip_code, email) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/users/usersTable9.csv' DELIMITER ',' CSV HEADER;

COPY bookings(adults, children, infants, checkin, checkout, b_nightly_fee,b_cleaning_fee, b_occupancy_tax_rate, place_id_serial, user_id_serial) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookings/bookingsTable0.csv' DELIMITER ',' CSV HEADER;
COPY bookings(adults, children, infants, checkin, checkout, b_nightly_fee,b_cleaning_fee, b_occupancy_tax_rate, place_id_serial, user_id_serial) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookings/bookingsTable1.csv' DELIMITER ',' CSV HEADER;
COPY bookings(adults, children, infants, checkin, checkout, b_nightly_fee,b_cleaning_fee, b_occupancy_tax_rate, place_id_serial, user_id_serial) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookings/bookingsTable2.csv' DELIMITER ',' CSV HEADER;
COPY bookings(adults, children, infants, checkin, checkout, b_nightly_fee,b_cleaning_fee, b_occupancy_tax_rate, place_id_serial, user_id_serial) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookings/bookingsTable3.csv' DELIMITER ',' CSV HEADER;
COPY bookings(adults, children, infants, checkin, checkout, b_nightly_fee,b_cleaning_fee, b_occupancy_tax_rate, place_id_serial, user_id_serial) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookings/bookingsTable4.csv' DELIMITER ',' CSV HEADER;
COPY bookings(adults, children, infants, checkin, checkout, b_nightly_fee,b_cleaning_fee, b_occupancy_tax_rate, place_id_serial, user_id_serial) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookings/bookingsTable5.csv' DELIMITER ',' CSV HEADER;
COPY bookings(adults, children, infants, checkin, checkout, b_nightly_fee,b_cleaning_fee, b_occupancy_tax_rate, place_id_serial, user_id_serial) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookings/bookingsTable6.csv' DELIMITER ',' CSV HEADER;
COPY bookings(adults, children, infants, checkin, checkout, b_nightly_fee,b_cleaning_fee, b_occupancy_tax_rate, place_id_serial, user_id_serial) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookings/bookingsTable7.csv' DELIMITER ',' CSV HEADER;
COPY bookings(adults, children, infants, checkin, checkout, b_nightly_fee,b_cleaning_fee, b_occupancy_tax_rate, place_id_serial, user_id_serial) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookings/bookingsTable8.csv' DELIMITER ',' CSV HEADER;
COPY bookings(adults, children, infants, checkin, checkout, b_nightly_fee,b_cleaning_fee, b_occupancy_tax_rate, place_id_serial, user_id_serial) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvPostgresql/bookings/bookingsTable9.csv' DELIMITER ',' CSV HEADER;
