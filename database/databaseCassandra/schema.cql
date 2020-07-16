DROP KEYSPACE IF EXISTS calendar;
CREATE KEYSPACE calendar WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1 };

CREATE TABLE calendar.place_by_id (
  place_id_serial int,
  place_id uuid,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupancy_tax_rate float,
  average_rating float,
  number_of_review smallint,
  max_capacity smallint,
  location_city text,
  location_country text,
  PRIMARY KEY(place_id_serial)
)
  WITH comment = 'Q1. Find a place with its id';

CREATE TABLE calendar.booking_by_id (
  booking_id_serial int,
  booking_id uuid,
  user_id_serial text,
  place_id_serial text,
  adults smallint,
  children smallint,
  infants smallint,
  checkin date,
  checkout date,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupancy_tax_rate float,
  PRIMARY KEY(booking_id_serial, user_id_serial, place_id_serial),
)
  WITH comment = 'Q2. Find booking info with its id';

CREATE TABLE calendar.booking_by_place (
  place_id_serial int,
  place_id uuid,
  bookings text,
  PRIMARY KEY(place_id_serial, bookings),
)
  WITH comment = 'Q3. Find booking info of the place';

CREATE TABLE calendar.user_by_id (
  user_id_serial int,
  user_id uuid,
  bookings text,
  PRIMARY KEY(user_id_serial),
)
  WITH comment = 'Q4. Find booking info with user id';

CREATE TABLE calendar.bookings_by_place_id (
  place_id_serial int,
  place_id uuid,
  average_rating float,
  number_of_review smallint,
  max_capacity smallint,
  location_city text,
  location_country text,
  booking_id_serial int,
  booking_id uuid,
  adults smallint,
  children smallint,
  infants smallint,
  checkin date,
  checkout date,
  nightly_fee smallint,
  cleaning_fee smallint,
  occupancy_tax_rate float,
  user_id_serial text,
  first_name text,
  last_name text,
  address_line_1 text,
  address_line_2 text,
  city text,
  country text,
  zip_code text,
  email text,
  PRIMARY KEY(place_id_serial),
)  WITH comment = 'Q4. Find booking info with user id';





-- place_by_id
COPY calendar.place_by_id(place_id_serial, place_id, nightly_fee, cleaning_fee, occupancy_tax_rate, average_rating, number_of_review, max_capacity, location_city, location_country) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/place_by_id5.csv' with header=true and delimiter =',';
COPY calendar.place_by_id(place_id_serial, place_id, nightly_fee, cleaning_fee, occupancy_tax_rate, average_rating, number_of_review, max_capacity, location_city, location_country) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/place_by_id10.csv' with header=true and delimiter =',';

-- bookind_by_id
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id5.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id10.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id15.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id20.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id25.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id30.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id35.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id40.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id45.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id50.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id55.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id60.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id65.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id70.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id75.csv' with header=true and delimiter =',';
COPY calendar.booking_by_id(booking_id_serial, booking_id, user_id_serial, place_id_serial, adults, children, infants, checkin, checkout, nightly_fee, cleaning_fee, occupancy_tax_rate) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_id80.csv' with header=true and delimiter =',';


-- booking_by_place
COPY calendar.booking_by_place(place_id_serial, place_id, bookings) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_place5.csv' with header=true and delimiter =',';
COPY calendar.booking_by_place(place_id_serial, place_id, bookings) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/booking_by_place10.csv' with header=true and delimiter =',';

-- user_by_id
COPY calendar.user_by_id(user_id_serial, user_id, bookings) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/user_by_id5.csv' with header=true and delimiter =',';
COPY calendar.user_by_id(user_id_serial, user_id, bookings) FROM '/Users/tegshee/Documents/HackReactor/SDC/Calendar/csvCassandra/user_by_id10.csv' with header=true and delimiter =',';