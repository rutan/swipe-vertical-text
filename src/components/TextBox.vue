<template>
  <div
    class="TextBox"
    :style="{
      width: `${width}px`,
      height: `${height}px`
    }"
  >
    <div
      class="TextBox__Inner"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        'column-width': height + 'px',
        top: `${-scrollHeight * position}px`
      }"
      ref="htmlRef"
    >
      <div class="TextBox__Html" v-html="text"></div>
      <div class="TextBox__LastDaemon" ref="lastDaemon"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: 'NotoSerifJP';
  src: url('../assets/NotoSerifJP-Regular.woff2');
}

.TextBox {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  font-size: 18px;

  .TextBox__Inner {
    position: relative;
    font-family: 'NotoSerifJP';
    writing-mode: vertical-rl;
    text-orientation: upright;
    line-break: strict;
    padding: 2em;
    line-height: 2;
    letter-spacing: 0.03em;
    column-gap: 2em;
    box-sizing: border-box;
  }

  .TextBox__Html {
    -moz-user-select: none;
    user-select: none;
  }

  .TextBox__LastDaemon {
    width: 1px;
    height: 100%;
    background: #f00;
  }
}
</style>

<script>
export default {
  props: ['text', 'width', 'height', 'position', 'onChangePageSize'],
  components: {},
  computed: {
    formatText() {
      return this.text;
    }
  },
  data() {
    return {
      pageSize: 1,
      scrollHeight: 1
    };
  },
  mounted() {
    this.$nextTick(this.calcSize.bind(this));
  },
  updated() {
    this.$nextTick(this.calcSize.bind(this));
  },
  methods: {
    calcSize() {
      const rect1 = this.$refs.htmlRef.getBoundingClientRect();
      const rect2 = this.$refs.lastDaemon.getBoundingClientRect();
      const boxHeight = rect1.height;
      const itemHeight = rect2.height;
      const gapHeight = (boxHeight - itemHeight) / 2;
      const totalheight = rect2.bottom - rect1.top;

      this.scrollHeight = itemHeight + gapHeight;
      this.pageSize = totalheight / (itemHeight + gapHeight);

      if (this.onChangePageSize) {
        this.onChangePageSize(this.pageSize);
      }
    }
  }
};
</script>
