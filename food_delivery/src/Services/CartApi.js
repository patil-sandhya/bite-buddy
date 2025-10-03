import axios from '../../axios';


const CartApi ={
 post_addTocart(data) {
    // console.log(data);
    return axios.post('/api/cart/add-to-cart', data);
  },
  delete_removeCartItem(data) {
    console.log(data);
    return axios.delete('/api/cart/', {
    data: data // <--- Send data inside config under `data` key
  });
  },

  put_quantity(data) {
    // console.log(data);
    return axios.put('/api/cart/quantity', data);
  },

  get_cart(userId){
    return axios.get(`/api/cart/${userId}`);
  }
}
export default CartApi