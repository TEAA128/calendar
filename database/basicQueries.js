// PostgreSQL
// Read
SELECT * FROM bookings WHERE place_id_serial = 1234567;

SELECT * FROM bookings WHERE booking_id_serial = 1234567;

SELECT * FROM places WHERE place_id_serial = 1234567;

SELECT * FROM users WHERE user_id_serial = 1234567;

SELECT * FROM bookings INNER JOIN users
  ON bookings.user_id_serial = users.user_id_serial
  WHERE place_id_serial = XXX;

// Write
INSERT INTO places (
  place_id_serial,
  place_id,
  nightly_fee,
  cleaning_fee,
  occupance_tax_rate,
  average_rating,
  number_of_review,
  max_capacity,
  location_city,
  location_country
) VALUES (
  10000001,
  gen_random_uuid(),
  80,
  65,
  0.15,
  4.5,
  150,
  6,
  'San Francisco',
  'United States'
);

INSERT INTO bookings (
  booking_id_serial,
  booking_id,
  adults,
  children,
  infants,
  checkin,
  checkout,
  nightly_fee,
  cleaning_fee,
  occupance_tax_rate,
  place_id_serial,
  user_id_serial
) VALUES (
  80000001,
  gen_random_uuid(),
  2,
  1,
  0,
  '2020-11-10',
  '2020-11-15',
  80,
  65,
  0.15,
  5,
  6
);

// Cassandra
// Read
select * from place_by_id where place_id_serial = 1234567;

select * from booking_by_id where booking_id_serial = 1234567;

select * from booking_by_place_id where place_id_serial = 1234567;

select * from booking_by_place where place_id_serial = 1234567;

select * from user_by_id where user_id_serial = 1234567;

// Write
INSERT INTO calendar.booking_by_id (
  booking_id_serial,
  booking_id,
  user_id_serial,
  place_id_serial,
  adults,
  children,
  infants,
  checkin,
  checkout,
  nightly_fee,
  cleaning_fee,
  occupance_tax_rate,
) VALUES (
  80000001,
  gen_random_uuid(),
  '1',
  '1',
  2,
  1,
  0,
  '2020-11-10',
  '2020-11-15',
  80,
  65,
  0.15,
  5,
  6
);
