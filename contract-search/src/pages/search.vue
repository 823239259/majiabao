<template>
<div>
  <div class="header">
    <h2>合约信息查询</h2>
  </div>
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
import searchBefore from '../components/search-before'
import searchAfter from '../components/search-after'
import pro from '../assets/common'
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
@import "../assets/css/common.scss";
.header{
  h2{
    @include font(0.36rem,0.88rem,#fff);
    background-color: #333340;
  }
}
.search-wrap{
  position: relative;
  height: 1.3rem;
  background-color: #333340;
  input{
    width: 6.9rem;
    height: 0.7rem;
    background-color: #474759;
    border-radius: 0.35rem;
    text-indent: 0.66rem;
    vertical-align: middle;
    margin-top: 0.3rem;
    border: #474759 1px solid;
    color: #fff;
    background: url('../assets/img/search_bg.png') 0.3rem center no-repeat;
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
		background: url('../assets/img/close.png') center center no-repeat;
		background-size: 0.2rem 0.2rem;
  }
  .search-input{
    text-indent: 0.3rem;
    background-image: none;
  }
  input::-webkit-input-placeholder{
    color:#fff;
  }
}
</style>
