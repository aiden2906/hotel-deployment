export const mutations = {
  SIGN_IN(state, payload) {
    state.myCustomer = payload;
  },
  CUSTOMER_SIGN_OUT(state) {
    state.myCustomer = {};
  },
  OWNER_SIGN_IN(state, payload) {
    state.curOwner = payload;
  },
  OWNER_SIGN_OUT(state) {
    state.curOwner = {};
  },
  SEARCH_HOTEL(state, payload) {
    state.hotel = payload;
    state.searchKey = [];
  },
  OWNER_UPDATE(state, payload) {
    state.curOwner = payload;
  },
  FETCH_PROVINCE(state, payload) {
    state.provinces = payload;
  },
  FETCH_DISTRICT(state, payload) {
    state.districts = payload;
    
  },
  FETCH_HOTELS(state, payload) {
    state.ownerHotels = payload;
  },
  FETCH_WARDS(state, payload) {
    state.wards = payload;
  },
  FETCH_HOTEL_BY_ID(state, payload) {
    state.hotelById = payload;
  },
  FETCH_WARD_BY_ID(state, payload) {
    state.wardById = payload;
  },
  FETCH_DISTRICT_BY_ID(state, payload) {
    state.districtById = payload;
  },
  FETCH_PROVINCE_BY_ID(state, payload) {
    state.provinceById = payload;
  },
  FETCH_ATTRIBUTES(state, payload) {
    state.attributes = payload;
  },
  FETCH_ROOMS_BY_HOTEL_ID(state, payload) {
    state.roomsByHotelId = payload;
  },
  FETCH_ROOM_BY_ID(state, payload) {
    state.roomById = payload;
  },
  FETCH_REVIEWS(state, payload) {
    state.reviews = payload;
  },
  FETCH_CUSTOMER(state, payload) {
    state.customer = payload;
  },
  FETCH_TAGS(state, payload) {
    state.tags = payload;
  },
  FETCH_REVIEWS_BY_CUSTOMER(state, payload) {
    state.reviewsByCustomer = payload;
  },
  FETCH_ALL_HOTELS(state, payload) {
    state.allHotels = payload;
  },
  FETCH_ROOM_ORDERS_BY_HOTEL_ID(state, payload) {
    state.roomOrdersByHotelId = payload;
  },
  FETCH_ORDER_BY_ID(state, payload) {
    state.orderById = payload;
  },
  UPDATE_ORDERLINE(state, payload) {
    localStorage.setItem('orderLine', JSON.stringify(payload));
    state.orderLines = payload;
  },
  CUSTOMER_UPDATE(state, payload) {
    state.myCustomer = payload;
  },
  ADMIN_SIGN_IN(state, payload) {
    state.curAdmin = payload;
  },
  ADMIN_SIGN_OUT(state) {
    state.curAdmin = {};
  },
  FETCH_ATTRIBUTE_OPTIONS_BY_ATTRIBUE_ID(state, payload) {
    state.attributeOptions = payload;
  },
  FETCH_ATTRIBUTE_BY_ID(state, payload) {
    state.attributeById = payload;
  },
  CHANGE_DIALOG_SIGN_IN(state, payload) {
    state.dialogSignInVisible = payload;
  },
  CHANGE_DIALOG_SIGN_UP(state, payload) {
    state.dialogSignUpVisible = payload;
  },
  // FETCH_WARDS_BY_PROVINCE_ID(state, payload) {
  //   state.wardsByProvinceId = payload
  // }
  FETCH_ALL_ATTRIBUTE_OPTIONS(state, payload) {
    state.allAttributeOptions = payload;
  },
  UPDATE_FILTER_HOTEL(state, payload) {
    state.searchKey = payload;
  },
  FETCH_ROOM_QUANTITY(state, payload) {
    state.roomQuantity = payload;
  }
};
