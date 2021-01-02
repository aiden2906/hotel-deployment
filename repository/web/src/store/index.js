import Vue from 'vue';
import Vuex from 'vuex';
import { BASE_URL, actions } from './action';
import { mutations } from './mutation';
Vue.use(Vuex);

const localUser = JSON.parse(localStorage.getItem('user'));
const localHotels = JSON.parse(localStorage.getItem('hotels'));
const localCustomer = JSON.parse(localStorage.getItem('customer'));
const orderLines = JSON.parse(localStorage.getItem('orderLine'));
const hotelSearch = JSON.parse(localStorage.getItem('hotelSearch'))
const localDistricts = JSON.parse(localStorage.getItem('districts'))

export default new Vuex.Store({
  state: {
    BASE_URL,
    curOwner: localUser || {},
    customer: {},
    myCustomer:localCustomer || {},
    hotel: hotelSearch || [],
    provinces: [],
    districts: localDistricts ||  [],
    wards: [],
    ownerHotels: localHotels || [],
    hotelById: {},
    wardById: {},
    districtById: {},
    provinceById: {},
    attributes: {},
    roomsByHotelId: {},
    roomById: {},
    reviews: [],
    customerById: {},
    orderLines: orderLines || [],
    tags: [],
    reviewsByCustomer:[],
    allHotels:[],
    roomOrdersByHotelId: {},
    orderById: {},
    curAdmin: {},
    attributeOptions: {},
    attributeById: {},
    dialogSignInVisible: false,
    dialogSignUpVisible: false,
    allAttributeOptions: [],
    searchKey: [],
    roomQuantity: 0,
  },
  mutations,
  actions,
});
