<template>
  <div id="butler_welfare" :style="{height:clientHeight}">
    <mt-header fixed title="管家福利" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
        <div class="box" v-for="item in imgList" @click="goto(item.id)">
            <img :src="item.img" alt="01">
        </div>
        
    </div>
    
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  
  const local = pro.local;
  
  export default {
    name: "butler_welfare",
    components: {
     
    },
    data() {
      return {
        isLogin: false,
        isShow: false,
        idList: [],
        imgList: [{
            img: require('../../assets/images/home/welfare_activity01.jpg'),
            id: 1
        },
        {
            img: require('../../assets/images/home/welfare_activity02.jpg'),
            id: 2
        }]
  
      };
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
      goto(path) {
        this.$router.push({
          path: `/welfare_details/${path}`
        });
      },
    },
    activated() {
  
      
  
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common.scss";
  #butler_welfare {
    width: 7.5rem;
    padding-top: 0.96rem;
    background-color: $bgButler;
  }
  .box{
    
    margin-bottom: 0.16rem; 
  }



</style>