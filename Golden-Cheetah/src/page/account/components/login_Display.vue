<template>
  <div class="login_wrap">
    <div class="flex_item" v-if="isLogin">
        <div class="left">
          <p class="numbers">{{mobileHidden(userInfo.username)}}</p>
          <p class="text">天行健，君子以自强不息</p>
        </div>
        <div class="right">
          <img class="img" src="../../../assets/images/golden_cheetah/my_header_icon.png" alt="person">
        </div>
    </div>
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

  .login_wrap{
    padding:0.3rem;
    background-color: $bg_color;
    border-radius: 0.2rem;
    .flex_item{
      @include flex(space-between);
      @include font($fs32,0.48rem,#fff,left);
      .left{
        flex: 2
      }
      .right{
        flex: 1;
        text-align: right;
      }
      .text{
        color: #fde24b
      }
    }
    .img{
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }
    .btn_box{
      @include flex(space-around);
      min-height: 1.8rem;
    }  
    button {
      box-sizing: content-box;
      width: 1.8rem;
      height: 0.6rem;
      background-color: $btn_bg_color;
      border-radius: 0.4rem;
      border: solid 0.1rem $btn_border_color;
      @include font($fs28,0.6rem, $btn_color);
      
    }
    button:nth-child(2){
      background-color: #01ffea;
    }
    
  }

</style>