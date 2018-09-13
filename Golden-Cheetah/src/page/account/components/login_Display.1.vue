<template>
  <div class="login_wrap">
    <div class="flex_item">
      <img class="img" src="../../../assets/images/icons/person.png" alt="person">
    </div>
    <div v-if="isLogin" class="flex_item text">{{mobileHidden(userInfo.username)}}</div>
    <div class="btn_box" v-else>
        <button @click="goto('/login')">登录</button>
        <button  @click="goto('/register')">注册</button>
    </div>
     
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
  import pro from '../../../assets/js/common'

  const local = pro.local;
  export default {
    name: "login_Display",
    components: {
     
    },
    mixins: [pro.mixinsToCustomer],
    data() {
      return {
      	currentNo:'CL',
        tabSelected: 'my',
        isLogin: false,
        userInfo: {},
        userList: [],
        nameList: {},
  
      };
    },
    computed: {
      accountInfo() {
        return this.$store.state.accountInfo;
      },
    },
    methods: {
      ...mapMutations({
        setAccountInfo: 'ACCOUNT_INFO',
        clearUserInfo: 'INFO_CLEAR',
      }),
      goto(path) {
        this.$router.push({
          path: path
        });
      },
      mobileHidden(phoneNumber) {
        return pro.mobileHidden(phoneNumber)
      },
      loginOut() {
        this.userInfo = {}
        this.clearUserInfo()
        this.isLogin = false
        this.$toast({
          message: "成功退出登录",
          duration: 1000
        })
        local.remove('user')
  
      },
      //获取用户信息
      getUserInfo() {
        const headers = {
          token: this.userInfo.token,
          secret: this.userInfo.secret
        }
        pro.fetch("post", "/account/getBasicMsg", "", headers).then((res) => {
          //console.log(res);
          if (res.code == '1') {
            this.setAccountInfo(res.data);
            this.isLogin = true;
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
              //this.$router.push({path:"/login"});
            } else {
              this.$toast({
                message: data.message,
                duration: 1000
              });
            }
          }
        })
      },
      mobileHidden (num) {
        return pro.mobileHidden(num)
      }
    },
    created() {
      
    },
    mounted() {
     
    },
    activated() {
      console.log(1)
      this.userInfo = local.get('user')
      if (this.userInfo) {
        this.getUserInfo()
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/common.scss";
  $btn_bg_color: #fff;

  .login_wrap{
    @include flex(space-between);
    flex-direction: column;
    padding:0.3rem;
    // border-bottom: 1px solid #383b4e;
    .flex_item{
      flex: 1;
      
    }
    .text{
      @include font($fs30,1rem,$text_color,right)
    }
    .img{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .btn_box{
      padding-top: 0.8rem
    }  
    button {
      width: 1.6rem;
      height: 0.8rem;
      background-color: $btn_bg_color;
      border-radius: 0.1rem;
      border: solid 0.02rem $btn_border_color;
      @include font($fs28,0.8rem, $btn_color);
      
    }
    button:nth-child(1){
      margin-right: 0.8rem;
    }
    
  }

</style>