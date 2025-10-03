import axios from '../../axios';

const ApiSercies = {
    post_signIn(data) {
    // console.log(data);
    return axios.post('/api/user/sign-in', data);
  },
  post_signUp(data) {
    // console.log(data);
    return axios.post('/api/user/sign-up', data);
  },
   put_address(userId, data) {
    // console.log(data);
    return axios.put(`/api/user/address/${userId}`, data);
  },
  get_userAddress(userId) {
  return axios.get(`/api/user/address/${userId}`);
},
  get_logout(){
    return axios.get('/api/user/');
  }

}

export default ApiSercies;