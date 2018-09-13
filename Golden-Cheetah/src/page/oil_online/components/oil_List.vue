<template>
  <div class="list_wrap">
    <ul class="list">
      <li class="item" v-for="(item, index) in list" :key="index" @click="itemClick(item)">
        <img :src="item.img" alt="">
        <p class="name">{{item.name}}</p>
        <p class="description">{{item.title}}</p>
      </li>
    </ul>
     
  </div>
</template>

<script>
import pro from '../../../assets/js/common'


export default {
    name: "oil_list",
    mixins: [pro.mixinsToCustomer],
    props: {
			list: {
				type: Array,
        required: true,
        /* 
          形如[{
          name: '大川',
          title: '资深国际原油分析师',
          img: require('../assets/images/oil_master/dashan_icon.png'),
          path: '/exchange_calc'
        },]
        */
			},
			
		},
    components: {
     
    },
    data() {
      return {
  
      };
    },
    methods: {
      itemClick (item) {
				if(item.path) {
					this.$router.push({path: item.path})
				}
				if(item.method){
					this[item.method]()
				}
      },
    }
   
    
     
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/common.scss";
  $btn_bg_color: #fff;

  .list_wrap{
    width: 7.5rem;
  }
  .list{
    @include flex(space-between);
    justify-content: flex-start;
    flex-wrap: wrap;
    .item{
      width: 50%;
      border-bottom: 1px solid $box_border_color;
    }
    img{
      display: block;
      width: 1.7rem;
      height: 2.1rem;
      margin: 0.5rem auto 0;
    }
    .name{
      @include font($fs26,0.48rem, $text_color_black);
      padding-top: 0.2rem;
    }
    .description{
      @include font($fs26,0.48rem, $text_color_gray)
    }
  }
</style>