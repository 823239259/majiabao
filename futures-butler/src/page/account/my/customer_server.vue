<template>
    <div id="customer_services" :style="{height:clientHeight}">
        <mt-header fixed title="客服中心">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
       
        <!-- 列表 -->
        <div class="list_wrap">
            <ul class="list">
               <li @click="callCustomer">
                   <div>客服热线</div>
                   <div class="item_right_box">
                        <span class="gray_text">400-852-8008</span>
                        <span class="right_icon"></span>
                   </div>
                </li>  
                <li @click="goto('/service_online')">
                   <div>在线客服</div>
                   <div class="item_right_box">
                        <span class="gray_text">随时解疑</span>
                        <span class="right_icon"></span>
                   </div>
                </li>
                <li @click="goto('/feedback')">
                   <div>意见反馈</div>
                   <div class="item_right_box">
                        <span class="right_icon"></span>
                   </div>
                </li>
                <mt-actionsheet
                :actions="actions"
                v-model="sheetVisible">
                </mt-actionsheet>
            </ul>            
        </div>
        
    </div>
</template>

<script>
export default {
  name: 'customer_services',
  data () {
    return {
      hasList: true, 
      actions:[{name: '400-852-8008 '},{name: '工作日08:00-24:00,周末09:00-17:00'},{name: '拨打',method: this.callPhone}],
      sheetVisible:false
    }
  },
  computed: {
      clientHeight () {
          return document.documentElement.clientHeight + 'px';
      }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    goto(path) {
      this.$router.push({ path: path });
    },
    callCustomer () {
        this.sheetVisible = true
    },
    callPhone:function(){
        window.location.href = 'tel://' + 4008528008;
    },
  }
}

</script>

<style lang="scss" scoped>
@import "../../../assets/css/common.scss";
#customer_services{
    width: 7.5rem;
    background-color: $bgGray;
}

.list_wrap{
    width:7.5rem;
    padding: 0.96rem 0 0 0;
    background-color:$bg;
    li{
       
        @include flex(space-between);
        width: 7.5rem;
        padding: 0 0.3rem;
        @include font($fs28,0.88rem,$blcakThin);
        border-bottom: 1px solid #e6e6e6;
        span{
            vertical-align: middle;
        }
    }
    .item_right_box{
        font-size: 0
    }
    .gray_text{
        @include font($fs24,0.88rem,$grayDeep);
        padding: 0 0.16rem 0 0.1rem;

    }
    .weixin_icon{
        display: inline-block;
        width: 0.32rem;
        height: 0.32rem;
        background: url("../../../assets/images/account/WXlogin.png") center no-repeat;
        background-size: cover;
    }
    .right_icon {
        display: inline-block;
        width: 0.14rem;
        height: 0.22rem;
        background: url("../../../assets/images/account/right_jiantou.png") center no-repeat;
        background-size: cover;       
    }
    .red{
        color: $redDeep;
    }
}
.btn_wrap {
  width: 7.5rem;
  padding: 0.6rem 0 0 0;
  text-align: center;
  background-color: $bgGray;
  .btn {
    width: 7rem;
    @include font($fs36,0.88rem,$bg);
    background-color: $redDeep;
    border-radius: 0.44rem;
  }
}



</style>