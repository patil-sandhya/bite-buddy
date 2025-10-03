import axios from "../../axios";

const MenuApi = {
    get_allmenu(value, filterBy) {
    return axios.get(`/api/foods?${filterBy}=${value}`);
  },

  get_byId(id){
    return axios.get(`/api/foods/${id}`);
  }
}

export default MenuApi;