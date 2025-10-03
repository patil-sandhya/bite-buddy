import axios from "../../axios";

const OrderApi = {
    get_order(userId) {
    return axios.get(`/api/order/${userId}`);
  },

  post_order(data){
    return axios.post(`/api/order`, data);
  }
}

export default OrderApi;