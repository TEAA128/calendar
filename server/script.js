import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1600,
  duration: '30s',
};

// export const options = {
//   stages: [
//     { duration: '10s', target: 500 },
//     { duration: '15s', target: 1000 },
//     { duration: '30s', target: 1500 },
//     { duration: '30s', target: 2000 },
//   ],
// };

// Test Case 1
// export default function() {
//   const placeId = Math.floor(Math.random() * (10000000)) + 1;
//   http.get(`http://localhost:3001/api/calendar/booking/${placeId}`);
//   sleep(1);
// }

// Test Case 2
export default function() {
  const placeId = Math.floor(Math.random() * (10000000)) + 1;
  http.get(`http://localhost:3001/api/calendar/place/${placeId}`);
  sleep(1);
}