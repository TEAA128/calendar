CREATE KEYSPACE place;

CREATE TABLE place.place_by_id (
  place_id uuid,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupance_tax_rate smallint,
  average_rating real,
  number_of_review smallint,
  max_capacity smallint,
  location_city text,
  location_country text,
  PRIMARY KEY (place_id),
)
  WITH comment = 'Q1. Find a place with its id';

CREATE KEYSPACE booking;

CREATE TABLE booking.booking_by_id (
  booking_id uuid,
  adults smallint,
  children smallint,
  infants smallint,
  checkin date,
  checkout date,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupance_tax_rate smallint,
  PRIMARY KEY( booking_id),
)
  WITH comment = 'Q2. Find booking info with its id';

CREATE TABLE booking.booking_by_place (
  place_id
  booking_id uuid,
  adults smallint,
  children smallint,
  infants smallint,
  checkin date,
  checkout date,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupance_tax_rate smallint,
  PRIMARY KEY( place_id, booking_id),
)
  WITH comment = 'Q2. Find booking info of the place';
