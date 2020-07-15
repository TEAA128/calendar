const faker = require('faker');

module.exports = {
  dataPlace_by_id: (mil) => {
    const data = [];
    const millionsPlace = [];
    const millionsUser = [];

    for (let l = 0; l < 8; l += 1) {
      millionsPlace.push(l * 10000000);
    }
    for (let k = 7; k >= 0; k -= 1) {
      millionsUser.push(k * 10000000);
    }

    for (let i = 0; i < 1000000; i += 1) {
      const oneItem = {
        place_id_serial: mil * 1000000 + i + 1,
        place_id: faker.random.uuid(),
        user_id_serial: mil * 1000000 + i + 1,
        user_id: faker.random.uuid(),
        nightly_fee: Math.floor(Math.random() * 300) + 60,
        cleaning_fee: Math.floor(Math.random() * 150) + 50,
        occupancy_tax_rate: ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2),
        average_rating: (Math.random() * (5 - 1) + 1).toFixed(2),
        number_of_review: Math.floor(Math.random() * (250 - 1) + 1),
        max_capacity: Math.floor(Math.random() * (15 - 2) + 2),
        location_city: faker.address.city(),
        location_country: faker.address.country(),
        // bookings by place
        bookingsPlace: millionsPlace.map((ele) => (ele + mil * 1000000 + i + 1)).join('|'),
        bookingsUser: millionsUser.map((ele) => (ele + mil * 1000000 + i + 1)).join('|'),
      };
      data.push(oneItem);
    }
    return data;
  },

  dataBooking_by_id: (mil) => {
    const data = [];
    for (let i = 0; i < 1000000; i += 1) {
      const oneItem = {
        // ID
        booking_id_serial: i + 1 + mil * 1000000,
        booking_id: faker.random.uuid(),
        place_id: i + 1 + (mil % 10) * 1000000,
        user_id: i + 1 + (mil % 10) * 1000000,
        // Booking related data
        adults: Math.floor(Math.random() * 6) + 1,
        children: Math.floor(Math.random() * 3) + 1,
        infants: Math.floor(Math.random() * 2) + 0,
        checkin: faker.date.between(`2020-0${8 + (mil % 5)}-1`, `2020-0${8 + (mil % 5)}-3`).toISOString().slice(0, 10),
        checkout: faker.date.between(`2020-0${8 + (mil % 5)}-6`, `2020-0${8 + (mil % 5)}-9`).toISOString().slice(0, 10),
        nightly_fee: Math.floor(Math.random() * 300) + 60,
        cleaning_fee: Math.floor(Math.random() * 150) + 50,
        occupancy_tax_rate: ((Math.floor(Math.random() * 15) + 8) / 100).toFixed(2),
      };
      data.push(oneItem);
    }
    return data;
  },

};
