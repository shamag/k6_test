import http from 'k6/http';
import { check, sleep } from 'k6';

let counter = 0
export const options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '10s', target: 40 },
  ],
};

export function setup(){
 return  Array(50).fill().map((_, i) => Array(20000).fill().map((_, i) => Math.floor(Math.random() * (57766643)))) 
}

export default function (data) {
  let num = counter % 50
  counter ++
  const params =  { headers: { 'Content-Type': 'application/json', }, };
  const res = http.post(`http://${__ENV.HOST}:${__ENV.PORT}/sort_array`, JSON.stringify({"data": data[num]}), params);
  check(res, { 'status was 200': (r) => r.status == 200 });
}

