import axios from 'axios'
const OK = 'ok';
function get(url){
  return function(params){
    return axios.get(url,{params}).then(response => {
      if(response.data.msg === OK){
        return response.data
      }
    })
  }
}

const getSeller = get('/api/seller');
const getRatings = get('/api/ratings');
const getGoods = get('/api/goods');

export {getSeller,getRatings,getGoods};