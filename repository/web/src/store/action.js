import axios from 'axios';

export const BASE_URL = process.env.VUE_APP_API_BASE_URL;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: false,
});

client.interceptors.request.use((config) => {
  Object.assign(config.headers, getDefaultHeader());
  return config;
});

function getDefaultHeader() {
  return {
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
  };
}

export const actions = {
  async register(ctx, payload) {
    await axios.post(`${BASE_URL}/api.customer/register`, payload);
  },
  signIn(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .post(`${BASE_URL}/api.customer/login`, payload)
        .then((resp) => resp.data)
        .then((body) => {
          ctx.commit('SIGN_IN', body.data.user);
          localStorage.setItem('accessToken', JSON.stringify(body.data.accessToken));
          localStorage.setItem('customer', JSON.stringify(body.data.user));
          resolve(body);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },
  ownerSignIn(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .post(`${BASE_URL}/api.user/login`, payload)
        .then((resp) => resp.data)
        .then((body) => {
          if (body.data.user.role != 'admin') {
            ctx.commit('OWNER_SIGN_IN', body.data.user);
          }
          else {
            ctx.commit('ADMIN_SIGN_IN', body.data.user);
          }
          localStorage.setItem('accessToken', JSON.stringify(body.data.accessToken));
          localStorage.setItem('user', JSON.stringify(body.data.user));
          resolve(body);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },
  uploadImage(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .post(`${BASE_URL}/api.upload/image`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resp) => resp.data)
        .then((body) => {
          resolve(body);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async ownerSignUp(ctx, payload) {
    await axios.post(`${BASE_URL}/api.user/register`, payload);
  },
  customerSignOut(ctx) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('customer');
    ctx.commit('CUSTOMER_SIGN_OUT');
  },
  ownerSignOut(ctx) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('hotels');
    ctx.commit('OWNER_SIGN_OUT');
  },
  searchHotel(ctx, payload) {
    const {
      provinceId,
      name
    } = payload;
    let query = `${BASE_URL}/api.hotel?provinceId=${provinceId}`;
    if (name) {
      query +=`&name=${name}`;
    }
    return new Promise((resolve, reject) => {
      client
        .get(query)
        .then((resp) => resp.data)
        .then((body) => {
          localStorage.setItem('hotelSearch', JSON.stringify(body.data))
          ctx.commit('SEARCH_HOTEL', body.data);
          resolve(body);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateUser(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .put(`${BASE_URL}/api.user/${payload.id}`, payload)
        .then((resp) => resp.data)
        .then((body) => {
          ctx.commit('OWNER_UPDATE', body.data);
          localStorage.setItem('user', JSON.stringify(body.data));
          resolve(body);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fetchHotels(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.hotel?ownerId=${payload}`)
        .then((resp) => resp.data)
        .then((body) => {
          ctx.commit('FETCH_HOTELS', body.data);
          localStorage.setItem('hotels', JSON.stringify(body.data));
          resolve(body);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  registerHotel(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .post(`${BASE_URL}/api.hotel`, payload)
        .then((resp) => resp.data)
        .then(body => {
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },


  fetchDistrict(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.district?provinceId=${payload}`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_DISTRICT', body.data);
          localStorage.setItem('districts',JSON.stringify(body.data))
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },

  fetchWards(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.ward?districtId=${payload}`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_WARDS', body.data);
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  updateFilterHotel(ctx, payload){
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.hotel?provinceId=${payload.provinceId}&name=${payload.hotelName}`)  
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('UPDATE_FILTER_HOTEL', body.data)
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  // fetchWardsByProvinceId(ctx,payload) {
  //   return new Promise((resolve, reject) => {
  //     client
  //       .get(`${BASE_URL}/api.ward?provinceId=${payload}`)
  //       .then(resp => resp.data)
  //       .then(body => {
         
  //         ctx.commit('FETCH_WARDS_BY_PROVINCE_ID', body.data);
  //         resolve(body);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       })
  //   })
  // },
  deleteHotel(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .delete(`${BASE_URL}/api.hotel/${payload}`)
        .then(resp => resp.data)
        .then(body => {
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  fetchHotelById(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.hotel/${payload}`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_HOTEL_BY_ID', body.data)
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  fetchWardById(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.ward/${payload}`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_WARD_BY_ID', body.data)
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  fetchDistrictById(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.district/${payload}`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_DISTRICT_BY_ID', body.data)
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  fetchProvinceById(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.province/${payload}`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_PROVINCE_BY_ID', body.data)
          resolve(body.data);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  fetchProvince(ctx) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.province`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_PROVINCE', body.data);
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  createRoom(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .post(`${BASE_URL}/api.room/`, payload)
        .then(resp => resp.data)
        .then(body => {
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  fetchAttributes(ctx) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.attribute`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_ATTRIBUTES', body.data);
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  fetchRoomsByHotelId(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.room?hotelId=${payload}`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_ROOMS_BY_HOTEL_ID', body.data);
          ctx.commit('FETCH_ROOM_QUANTITY', body.total);
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  fetchAttributeOptionById(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.attribute-option?attributeId=${payload}`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_ATTRIBUTE_OPTIONS_BY_ATTRIBUE_ID', body.data)
          resolve(body.data);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  fetchRoomById(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.room/${payload}`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_ROOM_BY_ID', body.data)
          resolve(body.data);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  updateRoomById(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .put(`${BASE_URL}/api.room/${payload.roomId}`, payload.room)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  deleteRoom(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .delete(`${BASE_URL}/api.room/${payload}`)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  updateHotel(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .put(`${BASE_URL}/api.hotel/${payload.hotelId}`, payload.hotel)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  postReview(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .post(`${BASE_URL}/api.hotel/${payload.idHotel}/review`, payload.review)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  fetchRoomDetail(ctx, payload) {
    const {id, start, end} = payload;
    return new Promise((resolve, reject) => {
      client
      .get(`${BASE_URL}/api.room/${id}?start=${start}&end=${end}`)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  fetchReviews(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.review?hotelId=${payload}`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_REVIEWS', body.data);
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  fetchCustomer(ctx) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.customer`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_CUSTOMER', body.data)
          resolve(body.data);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
 
  fetchTags(ctx) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.tag`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_TAGS', body.data)
          resolve(body.data);
        })
        .catch(err => {
          reject(err);
        })
    })
  },

  fetchReviewsByCustomer(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.review?customerId=${payload}`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_REVIEWS_BY_CUSTOMER', body.data);
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },

  fetchAllHotels(ctx) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.hotel`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_ALL_HOTELS', body.data)
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  fetchRoomOrdersByHotelId(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .get(`${BASE_URL}/api.order?hotelId=${payload}`)
      .then(resp => resp.data)
      .then(body => {
        ctx.commit('FETCH_ROOM_ORDERS_BY_HOTEL_ID', body.data);
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  fetchOrderById(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .get(`${BASE_URL}/api.order/${payload}`)
      .then(resp => resp.data)
      .then(body => {
        ctx.commit('FETCH_ORDER_BY_ID', body.data);
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  confirmOrder(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .put(`${BASE_URL}/api.order/${payload}/complete`)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  cancelOrder(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .put(`${BASE_URL}/api.order/${payload}/cancel`)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  createOrder(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .post(`${BASE_URL}/api.order`, payload)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  deleteReview(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .delete(`${BASE_URL}/api.review/${payload}`)
        .then(resp => resp.data)
        .then(body => {
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  updateReview(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .put(`${BASE_URL}/api.review/${payload.id}`, payload)
        .then(resp => resp.data)
        .then(body => {
          resolve(body);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  updateCustomer(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .put(`${BASE_URL}/api.customer/${payload.id}`, payload)
        .then((resp) => resp.data)
        .then((body) => {
          localStorage.setItem('customer', JSON.stringify(body.data));
          ctx.commit('CUSTOMER_UPDATE', body.data);
          resolve(body);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  
  adminSignIn(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .post(`${BASE_URL}/api.user/login`, payload)
      .then(resp => resp.data)
      .then(body => {
        ctx.commit('ADMIN_SIGN_IN', body.data.user);
        localStorage.setItem('accessToken', JSON.stringify(body.data.accessToken));
        localStorage.setItem('user', JSON.stringify(body.data.user));
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  adminSignOut(ctx) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('hotels');
    ctx.commit('ADMIN_SIGN_OUT');
  },
  createAttributeOption(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .put(`${BASE_URL}/api.attribute/${payload.id}/add-attribute-option`, payload.attributeOption)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  updateAttribute(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .put(`${BASE_URL}/api.attribute/${payload.id}`, payload.attribute)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  deleteAttribute(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .delete(`${BASE_URL}/api.attribute/${payload}`)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  createAttribute(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .post(`${BASE_URL}/api.attribute/`, payload)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  fetchAttributeById(ctx, payload){
    return new Promise((resolve, reject) => {
      client
      .get(`${BASE_URL}/api.attribute/${payload}`)
      .then(resp => resp.data)
      .then(body => {
        ctx.commit('FETCH_ATTRIBUTE_BY_ID', body.data)
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  updateAttributeOption(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .put(`${BASE_URL}/api.attribute-option/${payload.id}`,payload.attributeOption)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  deleteAttributeOption(ctx, payload){
    return new Promise((resolve, reject) => {
      client
      .put(`${BASE_URL}/api.attribute/${payload.id}/remove-attribute-option`, payload.attributeOption)
      .then(resp => resp.data)
      .then(body => {
        resolve(body.data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },  
  fetchAllAttributeOptions(ctx) {
    return new Promise((resolve, reject) => {
      client
        .get(`${BASE_URL}/api.attribute-option`)
        .then(resp => resp.data)
        .then(body => {
          ctx.commit('FETCH_ALL_ATTRIBUTE_OPTIONS', body.data)
          resolve(body.data);
        })
        .catch(err => {
          reject(err);
        })
    })
  }
};