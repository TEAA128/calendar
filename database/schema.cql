CREATE KEYSPACE calendarTEAA;

CREATE TABLE calendarTEAA.places_by_id (
  place_id text,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupance_tax_rate smallint,
  average_rating real,
  number_of_review smallint,
  max_capacity smallint,
  PRIMARY KEY ((place_id), )
)
  WITH comment = 'Q1. Find a place with its id';

CREATE TABLE calendarTEAA.booking_by_id (
  place_id text,
  adults smallint,
  children smallint,
  infants smallint,
  checkin date,
  checkout date,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupance_tax_rate smallint,
)
  WITH comment = 'Q2. Find booking info of a place';

CREATE TABLE calendarTEAA.booking_by_place (
  place_id text,
  adults smallint,
  children smallint,
  infants smallint,
  checkin date,
  checkout date,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupance_tax_rate smallint,
)