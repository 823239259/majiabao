<template>
<div>
  <div class="header">
    <h2>首页</h2>
  </div>
  <div class="list-wrap">
    <ul class="flexList">
      <li class="item" v-for="item in list" :key="item.id" @click="goTo(item.path)">{{ item.name }}</li>
    </ul>
  </div>
  
</div>  
</template>

<script>

import pro from '../assets/common'
const local = pro.local;
export default {
  name: 'index',
  components: {
    
  },
  data () {
    return {
    list: [
      {
        name: '黄金',
        path: 'gold'
      },
      {
        name: '白银',
        path: 'silver'
      },
      {
        name: '小麦',
        path: 'wheat'
      },
      {
        name: '玉米',
        path: 'corn'
      },
      {
        name: 'PTA',
        path: 'pta'
      },
      {
        name: '面积长度温度',
        path: 'other'
      },
    ]
    }  
  },
  methods: {  
    goTo (id) {
        this.$router.push({path:id})
      }
  },
}
</script>
<style lang="scss" scoped>
@import "../assets/css/common.scss";
.header{
  h2{
    @include font(0.36rem,0.88rem,#fff);
    background-color: #333340;
  }
}
.list-wrap{
  width: 7.5rem;
  padding-top: 0.9rem;
  .flexList{
    justify-content: center;
  }
  .item{
    width: 3.2rem;
    height: 3.2rem;
    flex: 0 0 3.2rem;
    margin: 0.15rem;
    @include font(0.32rem,3.2rem,#fff); 
  }
 
  @for $i from 1 through 6 {
      $background: ('huangjin', 'baiyin', 'xiaomai', 'yumi', 'TIA', 'other');
      li:nth-child(#{$i}) {
        $test: nth($background,$i);
        background: url('../assets/img/#{$test}.jpg') center center no-repeat;
      
      }
    }
}
</style>
