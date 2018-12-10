import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    text: '',
    currentPage: 0,
    pageSize: 1
  },
  mutations: {
    setText(state, payload) {
      state.text = payload.text;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload.currentPage;
    },
    setPageSize(state, payload) {
      state.pageSize = payload.pageSize;
    }
  },
  actions: {
    loadText(context, filename) {
      fetch(`${filename}.txt`)
        .then(resp => resp.text())
        .then(text => {
          context.commit({
            type: 'setText',
            text
          });
        });
    },
    changeCurrentPage(context, currentPage) {
      context.commit({
        type: 'setCurrentPage',
        currentPage
      });
    },
    changePageSize(context, pageSize) {
      context.commit({
        type: 'setPageSize',
        pageSize
      });
    }
  }
});

export default store;
