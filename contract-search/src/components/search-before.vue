<template>
  <div>
    <h2>快速查看</h2>
    <ul class="fast-list">
      <li v-for="item in contractList" @click="ToItem(item.id)" >{{ item.contractName }} {{ item.code }}</li>
    </ul>
  </div>
</template>

<script>
import pro from '../assets/common'
const local = pro.local;

export default {
  name: 'searchBefore',
  data () {
    return {
      itemName:['国际原油','美黄金','美白银','恒指期货','富时A50','迷你标普'],
      contractList:[],
      test1:''
    }
  },
  methods: {
    ToItem (id) {
      this.$router.push({path: `/contract-item/${id}`})
    }
  },
  created () {
    this.$axios.post('ContractInformationList', {
      
    })
    .then((response) => {
      console.log(response)
      if(response.data.msg === 'success'){
        local.set('contractList',response.data.contract);
        //提取搜索字符串
        let searchArr =  response.data.contract.reduce((searchArr, item)=>{
          let { contractName, code } = item;
          searchArr.push(`${contractName}${code}`);
          return searchArr
        },[]);
        local.set('searchArr',searchArr);
        //获取列表
        this.contractList = response.data.contract.filter((item)=>{
          return this.itemName.includes(item.contractName);                
        })
    }     
  })
  .catch(function (error) {
    //console.log(456)
    console.log(error);
  });
} 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/common.scss";
h2{
  @include font(0.28rem,0.88rem,#fff,left);
  padding-left: 0.3rem;
}
.fast-list{
  width: 6.9rem;
  margin: 0 auto;
  li{
    @include font(0.32rem,1rem,#666,left);
    padding-left: 0.31rem;
    border-radius: 0.08rem;
    border: solid 1px #ebf0f2;
    margin-bottom: 0.3rem;
    background: url('../assets/img/youjiantou.png') 6.48rem center no-repeat;
    background-size: 0.12rem 0.2rem; 
  }
  .checked{
    color: #fff;
    background-color: #e64552;
    background-image: url('../assets/img/youjiantou_bai.png');
    background-size: 0.12rem 0.2rem;
    
  }

}

</style>
