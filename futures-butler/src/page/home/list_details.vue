<template>
  <div id="recommend">
    <mt-header fixed :title="title" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
       <ul class="list">
         <li class="item" v-for="(item, index) in 4" :key="index" @click="goto(item.id)">
            <h2>国务院：深化多层次资本市场改革</h2>
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
    name: "list_details",
    props: ['id'],
    components: {
     
    },
    mixins: [pro.mixinsToCustomer],
    data() {
      return {
        isLogin: false,
        isShow: false,
        idList: [],
        contentText: contentText,
        aboutContent: aboutContent,
        aboutContent2: aboutContent2,
        aboutContent3: aboutContent3,
        abc: ''
  
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
          path: path
        });
      },
       getNewList() {
                const data = {
                    category: '期货知识'
                }
                pro.fetch("post", "/others/getTNoticeList", data, "").then((res) => {
                    //console.log(res)
                    if (res.success == true) {
                        if (res.code == 1) {
                            console.log(res.data[0].content)
                            this.abc = res.data[0].content
                            res.data.forEach(item => {
                                //是否在idList中                                
                                item.isRead = this.idList.includes(item.id);
                            });
                            this.newsList = res.data
                        }
                    }
    
                }).catch((err) => {
                    var data = err.data;
                    if (data == undefined) {
                        this.$toast({
                            message: "网络不给力，请稍后再试",
                            duration: 1000
                        });
                    } else {
                        if (data.code == -9999) {
                            this.$toast({
                                message: "认证失败，请重新登录",
                                duration: 1000
                            });
                            this.$router.push({
                                path: "/login"
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