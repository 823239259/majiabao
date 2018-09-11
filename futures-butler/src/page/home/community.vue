<template>
<div id="community" :style="{'min-height':clientHeight}">
  <mt-header title="管家社区">
    <mt-button slot="left" icon="back" @click="goBack"></mt-button>
  </mt-header>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">活动</mt-tab-item>
      <mt-tab-item id="2">讲堂</mt-tab-item>
      <mt-tab-item id="3">问答</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <communityActivity></communityActivity>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <butlerCommunity></butlerCommunity>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
          <noContent></noContent>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</div>
</template>

<script>
import butlerCommunity from '../home/butler_community'
import communityActivity from '../home/community_activity'
import noContent from '../../components/no_content'
export default {
  name: 'community',
  components: {
    butlerCommunity,
    communityActivity,
    noContent
  },
  data() {
    return {
      selected: "1"
    }
  },
  computed: {
    clientHeight() {
      return document.documentElement.clientHeight + "px";
    },
  },

  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
      //history.go(-1);
    },
  }
}
</script>

<style lang='scss' scoped>
@import "../../assets/css/common.scss";
#community {
  width: 7.5rem;
  background-color: $bgButler;
}

.no_note {
  @include font($fs28, 0.36rem, #788b87)
}
</style>