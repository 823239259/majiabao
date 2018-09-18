<template>
  <div>
    <mt-header fixed title="合约介绍">
      <mt-button icon="back" slot="left" @click="goBack"></mt-button>
    </mt-header>
  </div>
</template>

<script>
  import topTitle from "../../../components/topTitle.vue"
  export default {
    data() {
      return {

      }
    },
    components:{topTitle},
    methods: {
      goBack() {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/common.scss";

</style>
