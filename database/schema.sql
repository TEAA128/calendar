CREATE DATABASE calendarTEAA;

\connect calendarTEAA;

CREATE TABLE places (
  place_id serial,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupance_tax_rate smallint,
  average_rating real,
  number_of_review smallint,
  max_capacity smallint,
);

ALTER TABLE places ADD PRIMARY KEY (place_id);

CREATE TABLE bookings (
  booking_id serial,
  adults smallint,
  children smallint,
  infants smallint,
  checkin date,
  checkout date,
);

ALTER TABLE bookings ADD PRIMARY KEY (booking_id);
ALTER TABLE bookings
  ADD CONSTRAINT place_id_fkey FOREIGN KEY (place_id) REFERENCES places (place_id);
