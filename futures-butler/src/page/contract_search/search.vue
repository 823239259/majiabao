<template>
<div id="contract_search">
  <mt-header fixed title="合约查询" >
      <mt-button slot="left" icon="back" @click="goBack"></mt-button>
  </mt-header>
  <div class="search-wrap">
	<form action="">
		<input id="keyword" placeholder="搜索"  type="search" v-model="searchValue" :class="searchValue?'search-input':''">
	</form>    
	<span class="close" v-show="searchValue" @click="cleanValue"></span>
  </div>
  <keep-alive>
	  <component :is="componentId" :keyWord="searchValue"></component>
  </keep-alive>
  
</div>  
</template>

<script>
import searchBefore from '../../components/contract_search/search-before'
import searchAfter from '../../components/contract_search/search-after'
import pro from '../../assets/js/common'
const local = pro.local;
export default {
  name: 'HelloWorld',
  components: {
    searchBefore,
    searchAfter
  },
  data () {
    return {
	  searchValue: '',
	  keyWord:'',
    }  
  },
  methods: {  
	cleanValue () {
		this.searchValue = ''
  },
  goBack () {
    window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
  }
  },
  computed:{
	 componentId () {
		 if(this.searchValue){
			 return 'searchAfter';
		 }else{
			 return 'searchBefore'
		 }
	 } 
  },
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/common";
#contract_search{
  width: 7.5rem;
  padding-top: 0.96rem;
}
.header{
  h2{
    @include font(0.36rem,0.88rem,#fff);
    background-color: #333340;
  }
}
.search-wrap{
  position: relative;
  height: 1.3rem;
  background-color: $white;
  text-align: center;
  input{
    width: 6.9rem;
    height: 0.7rem;
    background-color: $white;
    border-radius: 0.35rem;
    text-indent: 0.66rem;
    vertical-align: middle;
    margin-top: 0.3rem;
    border: #85d1c4 1px solid;
    color: #333;
    background: url('../../assets/images/contract_search/search_bg.png') 0.3rem center no-repeat;
    background-size: 0.26rem 0.26rem;
  }
  input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;
   
  }
  .close{
	   position: absolute;
		top: 0.4rem;
		right: 0.5rem;
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		background: url('../../assets/images/contract_search/close.png') center center no-repeat;
		background-size: 0.2rem 0.2rem;
  }
  .search-input{
    text-indent: 0.3rem;
    background-image: none;
  }
  input::-webkit-input-placeholder{
    color:#333;
  }
}
</style>
