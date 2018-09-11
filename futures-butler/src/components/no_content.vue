<template>
  <div class="no_content" :style="{'height':clientHeight40}">
      <p class="no_note position_center">暂无相关内容</p>
  </div>
</template>

<script>
export default {
  name: 'no_content',
  data() { 
    return {

    }
  },
  computed: {
      clientHeight40 () {
          return document.documentElement.clientHeight*0.4 + "px";
      }
  }
 }
</script>

<style lang='scss' scoped>
@import '../assets/css/common';
    .no_content{
        position: relative;
        // height: 40vh;
    }
  .no_note {
        @include font($fs28, 0.36rem, #788b87)
    }
</style>