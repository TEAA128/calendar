import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 2000,
  duration: '30s',
};

// export const options = {
//   stages: [
//     { duration: '10s', target: 50 },
//     { duration: '15s', target: 100 },
//     { duration: '20s', target: 500 },
//     { duration: '10s', target: 0 },
//   ],
// };

export default function() {
  const placeId = Math.floor(Math.random() * (10000000)) + 1;
  http.get(`http://localhost:3001/api/calendar/${placeId}`);
  sleep(1);
}
