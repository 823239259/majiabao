<template>
  <div id="welfare_details" :style="{height:clientHeight}">
    <mt-header fixed title="管家福利" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
        <div class="box" >
            <img :src="currentItem.img" alt="01">
            <p>{{currentItem.text}}</p>
        </div>
        
    </div>
    
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  
  const local = pro.local;
  
  export default {
    name: "welfare_details",
    components: {
     
    },
    props: ['id'],
    data() {
      return {
        isLogin: false,
        isShow: false,
        idList: [],
        imgList: [{
            img: require('../../assets/images/home/activity01_banner.jpg'),
            id: 1,
            text: '管家币可用作后期管家推出活动模拟金使用'
        },
        {
            img: require('../../assets/images/home/activity02_banner.jpg'),
            id: 2,
            text: '管家大赛可配合管家币提高中奖几率'
        }]
  
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      currentItem () {
        return this.imgList.find((item)=>{
          return item.id == this.id
        })
      }
      
    },
    methods: {
      
      goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
          //history.go(-1);
      },
      goto(path) {
        this.$router.push({
          path: path
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common.scss";
  #welfare_details {
    width: 7.5rem;
    padding-top: 0.96rem;
    background-color: $bgButler;
  }
  .box{
    
    margin-bottom: 0.16rem; 
  }
  p{
    padding: 0 0.3rem;
    @include font($fs28,0.8rem,$blackNormal,left);
    background-color: $white;

  }



</style>