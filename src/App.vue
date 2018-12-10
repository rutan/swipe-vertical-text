<template>
  <div id="app">
    <Page
      :text="text"
      :page-width="pageWidth"
      :page-height="pageHeight"
      :current-page="currentPage"
      :page-size="pageSize"
      :on-change-page="onChangePage"
      :on-change-page-size="onChangePageSize"
    />
  </div>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Hiragino Kaku Gothic Pro', Meiryo, sans-serif;
}

button {
  cursor: pointer;
  &:focus {
    outline: 0;
  }
}

#app {
  width: 100%;
  height: 100%;
}
</style>

<script>
import Page from './components/Page.vue';

export default {
  name: 'app',
  components: {
    Page
  },
  computed: {
    text() {
      return this.$store.state.text;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
    pageSize() {
      return this.$store.state.pageSize;
    }
  },
  data() {
    return {
      pageWidth: 0,
      pageHeight: 0
    };
  },
  mounted() {
    this.$store.dispatch('loadText', 'sample');
    this._calcSize = this.calcSize.bind(this);
    window.addEventListener('resize', this._calcSize);
    this.calcSize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._calcSize);
  },
  methods: {
    calcSize() {
      this.pageWidth = window.innerWidth;
      this.pageHeight = window.innerHeight;
    },
    onChangePage(page) {
      this.$store.dispatch('changeCurrentPage', page);
    },
    onChangePageSize(size) {
      this.$store.dispatch('changePageSize', size);
    }
  }
};
</script>
