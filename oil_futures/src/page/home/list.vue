<template>
  <div id="recommend">
    <mt-header fixed :title="title" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        <mt-button slot="right">
          <span class="customer_icon header_icon" @click="callCustomer" ></span>
        </mt-button>  
        
    </mt-header>
    <div class="wrap">
       <ul class="list">
         <li class="item" v-for="(item, index) in list" :key="index" @click="goto(item.id)">
           <p class="text"><span>详细</span><span>{{getTime(item.time)}}</span></p>
            <h2>{{item.title}}</h2>
         </li>
       </ul>
    </div>
    
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
  import pro from '../../assets/js/common'
  
  const local = pro.local;
  export default {
    name: "list",
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
          case 'messages':
            return '消息中心'
            break;
          case 'class':
            return '新人学堂'
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
      getTime (time) {
        return time&&time.split(' ')[0]
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
      .text{
        display: flex;
        justify-content: space-between;
        padding: 0 0.3rem;
        @include font($fs24,0.4rem,#788b87,left);
      }
    }
  }



</style>