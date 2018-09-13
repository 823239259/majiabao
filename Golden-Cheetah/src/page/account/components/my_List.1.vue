<template>
  <div class="list_wrap">
    <ul class="list">
      <li class="item" v-for="(item, index) in list" :key="index" @click="itemClick(item)">
        <img :src="item.img" alt="">
        <p>{{item.name}}</p>
      </li>
    </ul>
     
  </div>
</template>

<script>
import pro from '../../../assets/js/common'


export default {
    name: "my_list",
    mixins: [pro.mixinsToCustomer],
    props: {
			list: {
				type: Array,
        required: true,
        /* 
          形如[{
          name: '关于我们',
          img: require('../assets/images/icons/about_icon.png'),
          path: '/tell_us'
        }]
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
      width: 2.5rem;
      border: 1px solid $box_border_color;
    }
    img{
      display: block;
      width: 0.5rem;
      margin: 0.5rem auto 0;
    }
    p{
      @include font($fs26,0.76rem, $text_color_black)
    }
  }
</style>