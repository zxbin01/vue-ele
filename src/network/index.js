import axios from 'axios'

axios({
  url: '/api2/seller'
}).then(res => {
  console.log(res);
}, err => {
  console.log(err);
});