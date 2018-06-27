<template>
  <div id="list_details">
    <mt-header fixed :title="title" >
        <mt-button slot="left" icon="back" @click="goBack"></mt-button>
    </mt-header>
    <div class="wrap">
        <ul>
            <li class="item" v-for="(item,index) in newsList" >
                <h2>{{indexList[index]}}、{{item.title}}</h2>
                <p :class="{textHeight:item.zhankai}" v-html="item.content"></p>
                <div class="icon_box" v-if="item.content.length>70" @click="showAll1(item)">
                    <i class="display_icon"></i>	
                </div>
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
        idList: ['基础知识','期货学堂'],
        newsList: [],
        text: '',
        communityList: {},
        indexList: ['一','二','三','四','五','六','七','八','九','十']
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
        this.$router.push({
          path: `/rumen_details/${path}`
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
                            //console.log(res.data)
                            res.data.forEach((k) => {
                                
								if(k.content.length&&k.content.length>70){
									//console.log(k.liveTitle.length)
									k.zhankai = true
								}							
							})
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
        showAll1 (item) {
            item.zhankai = !item.zhankai
        }
    
    
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
       
        margin: 0.3rem 0 0 0;
        padding: 0 0.3rem;
        background-color: #ffffff;
        @include font($fs28,1.2rem,#169781);
        border-bottom: 1px solid #bbf6ec;
        h2{
            @include font($fs28,0.8rem,#169781,left);
            font-weight: bold;
        }   
        p{
            text-align: left
        }
       
    }
    .textHeight{
        height: 1.4rem;
        overflow: hidden;
        transition: all 0.5s;
        
    }
    .display_icon{
        display: inline-block;
        width: 0.32rem;
        height: 0.32rem;
        background: url('../../assets/images/butlers/display_icon_up.png') center no-repeat;
        background-size: cover;

    }
    
  }
 


</style>