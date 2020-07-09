CREATE DATABASE calendarTEAA;

\connect calendarTEAA;

CREATE TABLE places (
  place_id uuid,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupance_tax_rate smallint,
  average_rating real,
  number_of_review smallint,
  max_capacity smallint,
  location_city varchar(25),
  location_country varchar(25),
);

ALTER TABLE places ADD PRIMARY KEY (place_id);

CREATE TABLE bookings (
  booking_id uuid,
  adults smallint,
  children smallint,
  infants smallint,
  checkin date,
  checkout date,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupance_tax_rate smallint,
);

ALTER TABLE bookings ADD PRIMARY KEY (booking_id);
ALTER TABLE bookings
  ADD CONSTRAINT place_id_fkey FOREIGN KEY (place_id) REFERENCES places (place_id);

CREATE TABLE users (
  user_id uuid,
  first_name varchar(25),
  last_name varchar(25),
  address_line_1 varchar(50),
  address_line_2 varchar(50),
  city varchar(20),
  country varchar(25),
  zip_code smallint,
  email varchar(50),
);

ALTER TABLE users ADD PRIMARY KEY (user_id);
ALTER TABLE bookings
  ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES users (user_id);
AlTER TABLE users
  ADD CONSTRAINT booking_id_fkey FOREIGN KEY (booking_id) REFERENCES bookings (booking_id);