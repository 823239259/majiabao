<template>
	<div id="bottom_tab">
		<mt-tabbar v-model="tabSelected">
			<template v-for="(item,index) in tabList">
				<mt-tab-item :id="item.path" :key="item.path">
					<span class="icon" :class="['icon'+(index+1),{'icon-checked':item.path === tabSelected}]"  slot="icon"></span>
					{{item.name}}
				</mt-tab-item>
			</template>
		</mt-tabbar>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default{
		name:"bottom_tab",
		props:['tabSelect',"type"],
		data(){
			return{
				tabSelected: this.tabSelect,
				tabList: [
					{
						name: '行情',
						path: 'quote'
					},
					{
						name: '数据',
						path: 'datas'
					},
					{
						name: '工具箱',
						path: 'tools'
					},
					{
						name: '我的',
						path: 'my'
					}

				],
				tradeUser: '',
			}
		},
		methods:{
			...mapActions([
				'initTrade'
			]),
		},
		computed:{
			loginStatus(){
				return this.$store.state.account.loginStatus;
			}
		},
		watch: {
			tabSelected (value ,oldValue) {
				if(value == this.tabSelect) return;
				if(value == 'trade'){
					this.tradeUser = localStorage.tradeUser ? JSON.parse(localStorage.tradeUser) : ''; 
					if(this.tradeUser != ''){
							this.$router.push({path: '/trade'});
					}else{
						this.$router.push({path: '/tradeLogin'});
					}
				}else{
					this.$router.push({path: `/${value}`});				
				}

			},
		},
		updated () {
			//修复转跳后 选中状态的改变
			this.tabSelected = this.tabSelect
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/css/common.scss";
	#bottom_tab{
		width: $w;
		position: fixed;
		top: 0;
		z-index: 1;
	}
.icon{
  display: inline-block;
//   width: 0.4rem;
//   height: 0.4rem;
  //background: url('../assets/img/icon_colour.png') top center no-repeat;
  background-size: cover;
}
@for $i from 1 through 4 {
 	//  $img: ("index", "quotation", "trade", "match", "discover");
	 $img: ("hangqing", "data", "gongju", "my");
  .icon#{$i}{
	background: url('../assets/images/account/#{nth($img,$i)}_icon.png') center no-repeat;
	background-size: cover;
  }
  .icon#{$i}.icon-checked{
	background-image: url('../assets/images/account/#{nth($img,$i)}_icon_choosed.png')
  }	
}
	
	
</style>