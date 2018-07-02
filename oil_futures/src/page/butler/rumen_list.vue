<template>
  <div id="list_details">
    <mt-header fixed :title="title" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
        <ul>
            <li class="item" :class="{'item_xitong':id == 3}" v-for="item in newsList" @click="goto(item.id)">
                {{item.title}}
                <p>{{item.time}}</p>
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
    data() {
      return {
        isLogin: false,
        isShow: false,
        idList: ['新手入门','高手进阶','新闻公告','系统公告'],
        newsList: [{
            title: '亲爱的用户，如果您有什么宝贵的意见可以前往个人中心进行反馈哦。',
            time: '2018年06月26日'
        }],
        text: '',
        communityList: {},
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      title () {
        return this.idList[this.id]
      }  
     
      
    },
    methods: {
      
      goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
          //history.go(-1);
      },
      goto(path) {
        if (this.title === '系统公告') return;
        this.$router.push({
          path: `/rumen_details/${path}`
        });
      },
       getNewList() {
                if (this.title === '系统公告') return;
                const data = {
                    category: this.title,
                }
                
                pro.fetch("post", "/others/getTNoticeList", data, "").then((res) => {
                    //console.log(res)
                    if (res.success == true) {
                        if (res.code == 1) {
                            //console.log(res.data)
                            this.newsList = res.data
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
        this.getNewList();
        
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common.scss";
  #list_details {
    width: 7.5rem;
    padding-top: 0.96rem;
    //background-color: $bg;
  }
  .wrap{
    padding-bottom: 0.2rem;
    
    .item{
        width: 6.9rem;
        margin: 0.3rem auto 0;
        padding: 0.3rem;
        background-color: #ffffff;
        @include font($fs28,0.4rem,#169781);
        box-shadow: 0 0 15px rgba(1, 1, 1, 0.2);
        border-radius: 0.1rem;
    }
    .item_xitong {
        @include font($fs28,0.4rem,#333,left);
        p{
            padding-top: 0.3rem;
            @include font($fs24,0.4rem,#788b87,left);
            
        }
    }
    
  }
 


</style>