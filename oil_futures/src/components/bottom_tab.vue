<template>
<transition name="vux-pop-in">
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
</transition>
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
						name: '首页',
						path: '/home'
					},
					{
						name: '信息',
						path: '/message'
					},
					{
						name: '行情',
						path: '/quote'
					},
					{
						name: '发现',
						path: '/discover'
					},
					{
						name: '我的',
						path: '/my'
					},
					{
						name: '学堂',
						path: '/list/class'
					},
					{
						name: '反馈',
						path: '/tell_us'
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
					this.$emit('show-tab',false);
					this.$router.push({path: `${value}`});				
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
		width: 1.6rem;
		position: fixed;
		top: 0.9rem;
		left: 0;
		z-index: 100;
		height: calc(100vh - 0.9rem);
		min-height: 54px;
		background-color: #ffd15d;
	}
.icon{
  display: inline-block;
  background-size: cover;
}
@for $i from 1 through 7 {
	 $img: ("home", "information", "quote", "discover", 'my', 'xuetang', 'fankui');
  .icon#{$i}{
	
	background: url('../assets/images/home/#{nth($img,$i)}_icon.png') center no-repeat;
	background-size: 100%;
	border-radius: 50%;
	
  }
//   .icon#{$i}.icon-checked{
// 	background-image: url('../assets/images/home/#{nth($img,$i)}_icon_chose.png');
// 	background-size: contain;
//   }	
}
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-in-enter,.vux-pop-in-leave-to{
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-in-leave,.vux-pop-in-enter-to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}	
	
</style>