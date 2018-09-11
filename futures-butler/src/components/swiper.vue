<template>
<div class="my-swiper">
     <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide class="my-item e46c0a" v-for="(item, index) in list" :key="index" :style="{'background-color': color}">{{item.name}}</swiper-slide>
        <!-- Optional controls -->
        <!-- <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
  </swiper>
</div>
 
</template>
 
<script>
    let abc =  {
    name: 'carrousel',
    props: {
        list: {
            type: Array,
            required: true    
        },
        color: {
            type: String
        }
    },
    data() {
      return {
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
            slidesPerView: 'auto',
            initialSlide: 1,
            //slidesOffsetAfter: 100,
            centeredSlides: true,
            preventClicks : true,
            spaceBetween: 15,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            on: {
               
                click: () => {
                  // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法 
                    const item = this.list[this.swiper.activeIndex];
                    this.goto(item.path)
                }
            }


        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
        goto(path) {
            this.$router.push({
            path: path
            });
      },
      callback1 () {
          const item = this.list[this.swiper.activeIndex];
          this.goto(item.path)
          console.log(item);
          
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    //   console.log('this is current swiper instance object', this.swiper)
    //   this.swiper.slideTo(1, 1000, false)
    }
  }
  export default abc
</script>
<style lang="scss" scoped>
@import "../assets/css/common.scss";
    .my-swiper{
        padding: 0.2rem 0;
        // width: 100%;
        // height: 2.4rem;
    }
    .swiper-container{
        height: inherit;
    }
    .my-item{
       // width: 6.3rem;
        width: 6.3rem ;
        height: 2rem;
        @include font($fs28,2rem,#fff);
        box-shadow: 0rem 0.05rem 0.1rem 0rem rgba(0, 0, 0, 0.2);
        border-radius: 0.2rem;
    }
    .e46c0a{
        background-color: #e46c0a;
    }
</style>
