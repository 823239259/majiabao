<template>
  <div>
    <template v-if="keyWord">
      <ul class="result-list" v-if="result_list.length">     
        <li v-for="item in result_list" class="checked" @click="ToItem(item.id)">{{ item.commodity_name }} {{ item.commodity_no }}</li>
      </ul>
      <p class="no-search" v-else>未找到相关搜索</p>
    </template>
    
  </div>
</template>

<script>
import pro from '../assets/common'
const local = pro.local;
let contractList = local.get('contractList');
let searchArr = local.get('searchArr');
export default {
  name: 'afterSearch',
  props:['keyWord'],
  data () {
    return {
      items:['小原油 CL1805','小原油 CL1805','小原油 CL1805'],

    }  
  },
  computed: {
    result_list () {
       let keyWord = this.keyWord.toUpperCase()    
       //console.log(keyWord)
       if(!keyWord) {
         return []
       }else{
         let result_list1 = searchArr.reduce(function(arr1, value, index) {
            if(value.indexOf(keyWord)>-1){
              arr1.push(contractList[index]);
            }
            return arr1      
          },[]);
         // console.log(result_list1)
          return result_list1
       }        
    }
  },
  methods: {
    ToItem (id) {
      this.$router.push({path: `/contract-item/${id}`})
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/common.scss";

.result-list{
  width: 6.9rem;
  margin: 0 auto;
  li{
    @include font(0.32rem,1rem,#333,left);
    border-bottom: solid 1px #ebf0f2;
    margin-bottom: 0.3rem;
    background: url('../assets/img/youjiantou.png') 6.48rem center no-repeat;
    background-size: 0.12rem 0.2rem; 
    &::before{
      content: '';
      display: inline-block;
      width: 0.26rem;
      height: 0.26rem;
      margin: 0 0.3rem;
      vertical-align: middle; 
      background: url('../assets/img/search_fff.png') center center no-repeat;
      background-size: 100%; 
    }
  }
  .checked{
    color: #e64552;    
  }
}
.no-search{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  @include font(0.32rem,1rem,#333,left);
}

</style>
