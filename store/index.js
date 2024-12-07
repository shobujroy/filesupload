export const state = {
  expressData: null,
  selectedComplaint: null,
  chiefComplaints: [],
  ageRanges: [],
  user: null,
  appLoader: false,
  chiefComplaintCount: 3,
  menuPinned: false,
  miniVariant: false,
};

export const mutations = {
  initLoader(state, payload) {
    state.appLoader = payload;
  },
  setExpressData(state, data) {
    state.expressData = data;
  },
  setComplaints(state, data) {
    state.chiefComplaints = data;
  },
  setSelectedComplaint(state, data) {
    state.selectedComplaint = data;
  },
  setAgeRanges(state, data) {
    state.ageRanges = data;
  },
  initPinMenu(state, payload) {
    state.menuPinned = payload;
  },

  initPin(state, payload) {
    state.miniVariant = payload;
  },
  resetExpressData(state) {
    state.expressData = null;
    state.selectedComplaint = null;

    // clear nuxt auth User data
    state.user = null;
    // Remove from local storage
    localStorage.removeItem("expressData");
    localStorage.removeItem("expressUserData");
    localStorage.removeItem("chiefComplaint");
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setChiefComplaintCount(state, payload) {
    state.chiefComplaintCount = payload;
  },
};

export const actions = {
  initPin({ commit }, payload) {
    commit("initPin", payload);
  },
  initPinMenu({ commit }, payload) {
    commit("initPinMenu", payload);
  },
  getExpressData({ commit }) {
    commit("setExpressData");
  },

  async fetchComplaints({ commit }) {
    this.$api.expressService.getComplaints().then((response) => {
      if (response?.status) {
        commit("setComplaints", response?.data);
      }
    });
  },
  async fetchAgeRanges({ commit }) {
    this.$api.expressService.getAgeRange().then((response) => {
      if (response?.status) {
        commit("setAgeRanges", response?.data);
      }
    });
  },
  initLoader({ commit }, payload) {
    commit("initLoader", payload);
  },
  setChiefComplaintCount({ commit }, payload) {
    commit("setChiefComplaintCount", payload);
  },
};

export const getters = {
  miniVariant(state) {
    return state.miniVariant;
  },
  menuPinned(state) {
    return state.menuPinned;
  },
  expressData: (state) => state.expressData,
  expressId: (state) => {
    return state.expressData ? state.expressData?.expressConnectId : null;
  },
  chiefComplaints: (state) => state.chiefComplaints,
  selectedComplaint: (state) => state.selectedComplaint,
  ageRanges: (state) => state.ageRanges,
  user: (state) => state.user,
  appLoader: (state) => state.appLoader,
  chiefComplaintCount: (state) => state.chiefComplaintCount,
};
