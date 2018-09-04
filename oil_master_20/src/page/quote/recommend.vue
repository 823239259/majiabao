<template>
  <div id="recommend">
    <TopTitle title="原油资讯" type="back" />
     <div class="wrap">
      <ul>
         <li class="item" v-for="(item, index) in list" :key="index" @click="showItem(item)">
            <h2 class="title">{{item.title}}<span :class="['youjiantou', {'show': item.isShow}]"></span></h2>
             <div class="text" v-show="item.isShow">
                <p v-html="item.content"></p>
            </div>
         </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  import TopTitle from '../../components/top_Title'
  const local = pro.local;
  export default {
    name: "recommend",
    props: ['id'],
    components: {
      TopTitle
    },
    mixins: [pro.mixinsToCustomer],
    data() {
      return {
        isLogin: false,
        isShow: false,
        idList: [],
        list: []
  
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      title () {
        switch (this.id) {
          case 'recommend':
            return '推荐'
            break;
          case 'crude-oil':
            return '原油'
            break;
          case 'stock-index':
            return '股指'
            break;
          case 'noble-metal':
            return '贵金属'
            break;      
          default:
            break;
        }
      }
      
    },
    methods: {
      showItem (item) {
        item.isShow = !item.isShow
      },
      getNewList() {
          const data = {
              category: this.title,
          }
          pro.fetch("post", "/others/getTNoticeList", data, "").then((res) => {
              //console.log(res)
              if (res.success == true) {
                  if (res.code == 1) {
                      //console.log(res.data[0].content)
                      res.data.forEach(article => {
                        article.isShow = false
                      });
                      this.list = res.data
                  }
              }
          }).catch((err) => {
              var data = err.data;
              if (data == undefined) {
                  
              } else {
                  if (data.code == -9999) {
                      this.$toast({
                          message: "认证失败，请重新登录",
                          duration: 1000
                      });
                  } else {
                      this.$toast({
                          message: data.message,
                          duration: 1000
                      });
                  }
              }
          })
      },
    },
    activated() {
      this.getNewList()
  
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common.scss";
.wrap{
  width: 7.5rem;  
  padding-top: 0.96rem;
  li{  
    
    text-indent: 0.24rem;
    @include font(0.32rem,0.8rem,#333,left);
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 0.1rem;
    .title{
      position: relative;
      border-bottom: 1px solid #e9e9e9;
    }
    .youjiantou{
      position: absolute;
      right: 0.28rem;
      top: 50%;
      display: inline-block;
      width: 0.17rem;
      height: 0.34rem;
      background: url('../../assets/images/oil_master/youjiantou.png') center center no-repeat;
      background-size: cover;
      transform: translateY(-50%)
    }
    .show{
      transform: rotate(90deg) translateX(-100%);
      transition: transform .5s
    }
    .text{
      padding: 0.25rem;
     
      p{
        @include font(0.28rem,0.48rem,#333,left);
      }
    }
  }
}
</style>