<template>
  <div
    class="Page"
    :style="{
      width: `${pageWidth}px`,
      height: `${pageHeight}px`
    }"
  >
    <div
      class="Page__Container"
      :style="{
        transform: `translateX(${-pageWidth}px)`,
        width: `${pageWidth * 3}px`,
        height: `${pageHeight}px`
      }"
      ref="container"
      @mousedown="onTouchStart"
      @mousemove="onTouchMove"
      @mouseup="onTouchEnd"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <TextBox :text="text" :width="pageWidth" :height="pageHeight" :position="currentPage + 1"></TextBox>
      <TextBox
        :text="text"
        :width="pageWidth"
        :height="pageHeight"
        :position="currentPage"
        :on-change-page-size="onChangePageSize"
      ></TextBox>
      <TextBox :text="text" :width="pageWidth" :height="pageHeight" :position="currentPage - 1"></TextBox>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Page {
  position: relative;
  overflow: hidden;

  .Page__Container {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    display: flex;
    transition: transform 0.5s ease-out;

    &.is-stop {
      transition: none;
    }
  }
}
</style>

<script>
import TextBox from './TextBox.vue';

export default {
  props: ['currentPage', 'pageSize', 'text', 'pageWidth', 'pageHeight', 'onChangePage', 'onChangePageSize'],
  components: {
    TextBox
  },
  computed: {},
  data() {
    return {
      isTouching: false,
      moveStartX: 0
    };
  },
  mounted() {},
  methods: {
    onTouchStart(e) {
      e.preventDefault();
      this.isTouching = true;
      this.$refs.container.classList.add('is-stop');
      if (e.changedTouches) {
        this.moveStartX = e.changedTouches[0].pageX;
      } else {
        this.moveStartX = e.clientX;
      }
    },
    onTouchMove(e) {
      if (!this.isTouching) return;
      const x = e.changedTouches ? e.changedTouches[0].pageX : e.clientX;
      this.$refs.container.style.transform = `translateX(${-this.pageWidth + (x - this.moveStartX)}px)`;
    },
    onTouchEnd(e) {
      const x = e.changedTouches ? e.changedTouches[0].pageX : e.clientX;
      const diffX = x - this.moveStartX;
      if (Math.abs(diffX) > this.pageWidth / 4) {
        // ページ送り
        if (diffX > 0 && this.currentPage < this.pageSize - 1) {
          this.onChangePage(this.currentPage + 1);
          this.$refs.container.style.transform = `translateX(${-this.pageWidth + diffX - this.pageWidth}px)`;
        } else if (diffX < 0 && this.currentPage > 0) {
          this.onChangePage(this.currentPage - 1);
          this.$refs.container.style.transform = `translateX(${-this.pageWidth + diffX + this.pageWidth}px)`;
        }
      }
      setTimeout(() => {
        this.$refs.container.classList.remove('is-stop');
        this.$refs.container.style.transform = `translateX(${-this.pageWidth}px)`;
        this.isTouching = false;
      }, 1);
    }
  }
};
</script>
