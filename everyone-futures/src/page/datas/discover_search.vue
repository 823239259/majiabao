<template>
	<div id="discover_search">
		<mt-header fixed title="搜索">
			<mt-button slot="left" icon="back" @click="goBack"></mt-button>
		</mt-header>
		<div class="search-wrap">
            <span class="search_icon" @click="search"></span>
            <form class="search_form" action="">
                <input id="keyword" 
                placeholder="搜索"  
                type="search" 
                v-model="searchValue" 
                @keypress.13.prevent="search"
                @focus="showHistory"
                @blur="noShowHistory"
                >
            </form> 
			<span class="close" @click="clear">取消</span>
            <!-- search-history -->
            <div class="search_history" v-show="showHistoryDiv">
                <ul class="history_list">
                    <li v-for="name in historyList"  class="item" @click="setInputValue(name)">{{name}}</li>
                </ul>
            </div>
		</div>
		<div class="hot_search_wrap" v-show="showDefault">
			<h2>热门搜索</h2>
			<ul>
				<li v-for="item in arrList" :key="item.name" @click="setInputValue(item.name)">{{item.name}}</li>
			</ul>
		</div>
		<div class="">
			<div class="title_box">7x24</div>
			<ul class="list" v-show="!showNone">
				<li class="item" v-for="item in infoList" :key="item.liveWallstreetnId">
					<p class="time_text"><span class="time">{{item.createdAt | changTime }}</span></p>
					<div class="box">
						<p>{{item.liveTitle}}</p>
						<i class="display_icon"></i>
					</div>
				</li>
			</ul>
			<div class="none" v-show="showNone">
				暂无相关资讯
			</div>
		</div>
	</div>
</template>

<script>
import pro from '../../assets/js/common'
const local = pro.local;
	export default {
		name: "discover",
		data() {
			return {
				tabSelected: 'discover_search',
				selected: "1",
				searchValue: '',
				arrList:[{"name":"黄金"},{"name":"布伦特原油"},{"name":"美国原油"},{"name":"美元"},{"name":"日元"},{"name":"标普500"},{"name":"纳斯达克"},{"name":"上证指数"},{"name":"深圳指数"}],
                showNone: false,
                showDefault: true,
                infoList: [],
                showHistoryDiv: false,
                historyList: []

			}
		},
		methods: {
			goBack() {
				window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
				this.searchValue = ''
			},
			search () {
				if(this.searchValue == ""){
					this.$toast({message:"请输入搜索内容",duration: 2000});
				}else{
					var data = {
						pageSize:20,
						pageNo:0,
						minTime:"",
						maxTime:"",
						keyword:this.searchValue
                    }
                    //存本地
                    this.addHistoryId(this.searchValue)
					
					pro.fetch("post","/news/get7_24Live",data,"").then((res)=>{
						if(res.code == 1 && res.success == true){
							if(res.data == ''){
								this.showNone = true;
								this.showDefault = false;
							}else{
								//this.showExist = true;
								this.infoList = res.data;
								this.showDefault = false;
							}
						}
					}).catch((err)=>{
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后再试",duration: 1000});
						}else{
							this.$toast({message:data.message,duration: 1000});
						}
                    })
                    //隐藏historydiv
                    this.showHistoryDiv = false;
				}
            },
            setInputValue (value) {
                this.searchValue = value
            },
            clear () {
                this.searchValue = ''
            },
            showHistory () {
				this.showHistoryDiv = true;
            },
            noShowHistory () {
                this.showHistoryDiv = false;
            },
            addHistoryId (idName) {
                let index = this.historyList.includes(idName);
                if(index) return;
                if(this.historyList.length>9) this.historyList.pop();
                this.historyList.unshift(idName)
                local.set('historyList',this.historyList)
                
            },
           

        },
        watch:{
			searchValue (value, oldValue) {
                
                if (value == '') {
                   //清空数据
                    this.infoList = []
                    //显示推荐搜索
                    this.showDefault = true
                    //取消没内容的显示
                    this.showNone = false
                }
				// if(e != ""){
				// 	this.showDefault = true;
				// }else{
				// 	this.infoList = [];
				// 	this.showNone = false;
				// }
			}
		},
        filters:{
			changTime:function(timeSce){
				return  pro.getDate(timeSce*1000,"y-m-d h:i:s");
				
			},
        },
        activated () {
            this.historyList = local.get('historyList')||[]

        }
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/css/common.scss";
	.search-wrap {
		position: relative;
		width: 7.5rem;
		padding-top: 0.96rem;
		text-align: center;
		input {
			width: 6.9rem;
			height: 0.64rem;
			border-radius: 0.08rem;
			text-indent: 0.66rem;
			vertical-align: middle;
			border: $bgDeep 1px solid;
			color: #000;
		}
		input[type=search]::-webkit-search-cancel-button {
			-webkit-appearance: none;
		}
        .search_form{
            padding: 0.16rem 0;
        }
        .search_history{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 6.9rem;
            margin-top: -0.16rem;
            background-color: #fff;
            .history_list{
                @include font($fs24,0.6rem,$grayMiddle,left);
                padding: 0 0.6rem;
                height: 1.2rem;
                overflow: scroll;
                border: 1px solid $bgDeep;
                border-top: 0;
            }
            
        }
        .search_icon{
            position: absolute;
			bottom: 0.2rem;
			left: 0.4rem;
            width: 0.56rem;
            height: 0.56rem;
            background: url('../../assets/images/account/search_icon.png') center center no-repeat;
            background-size: 0.26rem 0.26rem;
        }
		.close {
			position: absolute;
			bottom: 0.2rem;
			right: 0.5rem;
			display: inline-block;
			width: 0.7rem;
			height: 0.5rem;
			color: $grayDeep;
			line-height: 0.5rem;
		}
	}
	.hot_search_wrap{
		h2{
			@include font($fs24,0.8rem,$grayMiddle,left);
			background-color: $bgGray;
			padding: 0 0.3rem;
		}	
		ul{
			@include flex(space-between);
			flex-wrap: wrap;
			li{
				width: 33.3%;
				@include font($fs24,0.8rem,$grayMiddle);
			}
		}

	}
	.title_box{
		@include font($fs24,0.8rem,$grayMiddle,left);
		background-color: $bgGray;
		padding: 0 0.3rem;
	}
	
	.list {
		padding: 0.25rem 0.3rem;
		.time_text {
			position: relative;
			&::before {
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				content: '';
				width: 0.16rem;
				height: 0.16rem;
				background-color: $blueBall;
				border-radius: 50%;
			}
		}
		.time {
			display: inline-block;
			//width: 1rem;
            padding: 0.1rem 0.2rem;
			
			margin-left: 0.3rem;
			@include font($fs24,
			0.3rem,
			$graySimple);
			background-color: $bgGray;
			border-radius: 0.7rem;
		}
		.box {
			border-left: 0.04rem dashed #dadae6;
			padding: 0.3rem 0.2rem;
			margin: 0 0.05rem;
			p {
				@include font($fs30,0.46rem,$blcakThin,left);
				padding-bottom: 0.8rem;
				border-bottom: 1px solid $bgDeep;
			}
		}
       
	}
    .none {
        color: $blcakThin;
        text-align: center;
        font-size: 0.36rem;
        margin-top: 50%;
    }
</style>