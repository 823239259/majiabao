<template>
  <div id="recommend">
    <mt-header fixed :title="title" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
       <ul class="list">
         <li class="item" v-for="(item, index) in list" :key="index" @click="goto(item.id)">
            <h2>{{item.title}}</h2>
              <p>推荐: <span>管家小助手</span></p>
              <!-- <p v-html="abc"></p> -->
           
         </li>
       </ul>
    </div>
    
    
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  
  const local = pro.local;
  export default {
    name: "recommend",
    props: ['id'],
    components: {
     
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
      
      goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
          //history.go(-1);
      },
      goto(path) {
        this.$router.push({
          path: `/list_details/${path}`
        });
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
  #recommend {
    width: 7.5rem;
    padding-top: 0.96rem;
    //background-color: $bg;
  }
  .wrap{
   
    .list{
      padding: 0.2rem 0 0 0;
      @include font($fs28,0.48rem,$blackNormal,left);
      .item{
        border-bottom: 1px solid #bbf6ec;
      }
      h2{
        width: 7.5rem;
        padding-left: 0.3rem;
        @include font($fs32,0.8rem,$blackNormal,left);
      }
      p{
        padding-left: 0.3rem;
      }
      span{
        color: #788b87
      }
    }
  }



</style>