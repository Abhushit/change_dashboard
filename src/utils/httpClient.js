import axios from 'axios';

var token = localStorage.getItem('token');
var tokenData = JSON.parse(token);

console.log('client ')

let httpclient = axios.create({
  baseURL: 'http://localhost:9000/api/v1/',
  // baseURL: 'https://admin-dashboard-backend-8yg4.onrender.com/api/v1',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    // 'Content-Type': "application/json",
    Authorization: tokenData,
  },
});

export default httpclient;