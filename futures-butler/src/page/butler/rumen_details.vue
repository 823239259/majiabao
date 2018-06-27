<template>
  <div id="list_details">
    <mt-header fixed :title="title" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
        <h2>{{details.title}}</h2>
        <p v-html="details.content"></p>
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
        idList: ['新手入门','高手进阶'],
        details: {},
        text: '',
        communityList: {},
      };
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight + "px";
      },
      title () {
        return this.details.categoryText + '详情'
      },
     
      
    },
    methods: {
      
      goBack() {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
          //history.go(-1);
      },
      goto(path) {
        this.$router.push({
          path: `/path`
        });
      },
       getNewDetails() {
                const data = {
                    id: this.id,
                }
                pro.fetch("post", "/others/getTNotice", data, "").then((res) => {
                    //console.log(res)
                    if (res.success == true) {
                        if (res.code == 1) {
                            //console.log(res.data)
                            this.details = res.data
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
        this.getNewDetails();
        
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
    border-bottom: 0.16rem solid #e5f9f6;
      h2{
        width: 7.5rem;
        padding-left: 0.3rem;
        @include font($fs32,0.8rem,$blackNormal,left);
        font-weight: bold;
      }
      p{
        padding: 0 0.3rem;
        @include font($fs28,0.46rem,$blackNormal,left);
      }
    
  }
 


</style>