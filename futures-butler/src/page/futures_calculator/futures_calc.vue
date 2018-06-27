<template>
<div>
  <mt-header fixed title="期货计算" >
      <mt-button slot="left" icon="back" @click="goBack"></mt-button>
  </mt-header>
  <div class="list-wrap">
    <ul class="flexList">
      <li class="item" v-for="item in list" :key="item.id" @click="goTo(item.path)">{{ item.name }}</li>
    </ul>
  </div>
  
</div>  
</template>

<script>

import pro from '../../assets/js/common'
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
        path: '/gold/gold'
      },
      {
        name: '白银',
        path: '/gold/silver'
      },
      {
        name: '小麦',
        path: '/wheat'
      },
      {
        name: '玉米',
        path: '/corn'
      },
      {
        name: 'PTA',
        path: '/pta'
      },
      {
        name: '面积长度温度',
        path: '/other'
      },
    ]
    }  
  },
  methods: {  
    goTo (id) {
        this.$router.push({path:id})
      },
    goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
          //history.go(-1);
      },  
  },
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/common";
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
    display: flex;
    flex-wrap: wrap;
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
        background: url('../../assets/images/futures_calculator/#{$test}.jpg') center center no-repeat;
      
      }
    }
}
</style>
