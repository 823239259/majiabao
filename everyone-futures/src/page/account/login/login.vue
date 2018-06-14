<template>
	<div id="login" :style="{height:clientHeight}">
		<topTitle title="登录" type="1" type1="1"></topTitle>
		<div id="container">
			<ul>
				<li>
					<input type="tel"  placeholder="请输入手机号" class="input input1" v-model="phone" maxlength="11"/>
				</li>
				<li class="psdRt">
					<i :class="showPsd == false ? 'psdIcon1' : 'psdIcon'" @click="changepsd"></i>
					<input type="password"  placeholder="请输入密码" class="input" v-model="password" id="password"/>
				</li>
			</ul>
			<!-- <div>
				<span class="forgetPsd" @click="toForgetPsd">忘记密码？</span>
			</div> -->
			<mt-button :class="btnType ? 'btn' : 'btnred'" @click="login" type="danger">登录</mt-button>
			<!-- <p @click="toRegister">新用户注册>></p>
			<div class="showWX" v-show="showWhat">
				<i class="toWX" @click="getWechatId"></i>
			</div> -->
		</div>
		<codeDialog ref="codeDialog" :objstr="sendMsg" type="login"></codeDialog>
	</div>
</template>

<script>
	import topTitle from "../../../components/topTitle.vue"
	import codeDialog from "../../../components/codeDialog.vue"
	import pro from "../../../assets/js/common.js"
	const local = pro.local
	export default{
		name:"login",
		components:{ topTitle,codeDialog },
		data(){
			return{
				phone:"",
				password:"",
				phoneReg:/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/,
				pwdReg:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
				showWhat:true,
				showPsd:false,
				fullHeight:document.documentElement.clientHeight,
				fullHeight1:document.documentElement.clientHeight,
				userList: [],
				num:"",
				str: {},
			}
		},
		computed : {
			sendMsg(){
				if(this.str) return JSON.stringify(this.str);
			},
			PATH: function(){
				return this.$store.getters.PATH;
			},
			weixinLoginInfo:function(){
				return this.$store._modules.root.state.account.weixinLoginInfo
			},
			btnType:function(){
				if(this.phone!="" && this.password!=""){
					return false;
				}else{
					return true;
				}
			},
			clientHeight() {
                return document.documentElement.clientHeight + 'px';
            },
		},
		methods:{
			toRegister:function(){
				this.$router.push({path:"/register"});
			},
			toForgetPsd:function(){
				this.$router.push({path:"/forgetPassword"});
			},
			addItem (item,key='userList') {	
				let index = this.userList.findIndex((userObj) =>{
					return userObj.username == item.username
				})	
                if(index > -1) {
					this.userList.splice(index,1,item);
				}else{
					this.userList.push(item)
				}
                local.set(key,this.userList)
			},
			login:function(){
				if(this.phone == ''){
					this.$toast({message: '请输入手机号',duration: 2000});
				}else if(this.phoneReg.test(this.phone) == false){
					this.$toast({message: '手机格式错误',duration: 2000});
				}else if(this.password == ''){
					this.$toast({message: '请输入密码',duration: 2000});
				}else if(this.pwdReg.test(this.password) == false){
					this.$toast({message: '密码由6到16位字母和数字组成',duration: 2000});
				}else{
					//登录请求
					var ClientId = localStorage.clientid ? JSON.parse(localStorage.clientid).id : '';
					var info = {
						mobile:this.phone,
						password:this.password,
						clientId:ClientId
					};
					pro.fetch('post', '/loginAndRegister/mobileLogin',info, "").then(function(res){
						if(res.success == true){
							if(res.code == 1){
								this.$toast({message: '登录成功',duration: 1000,});
								this.token = res.data.token;
								this.secret = res.data.secret;
								var userData = {username:this.phone,password:Base64.encode(this.password),token:res.data.token,secret:res.data.secret};
								localStorage.setItem("user", JSON.stringify(userData));
								this.addItem(userData)
								local.get("user");
								this.$router.push({path:"/my"});
								this.$store.state.account.isLogin = true;
							}
						}
					}.bind(this)).catch(function(err){
						console.log(err)
						this.$store.state.account.isLogin = false;
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后重试",duration: 2000});
						}else{
							this.$toast({message: data.message,duration: 2000});
							this.num = data.data.failNum;
							if(this.num > 2){
								this.$refs.codeDialog.ishow = true;
								this.$refs.codeDialog.path = this.PATH + "/loginAndRegister/getImgCode.jpg" + Math.random()*1000 + "?mobile=" + this.phone;
								this.str = {
									loginName : this.phone,
									password :this.password
								}
							}
						}
					}.bind(this));
				}
			},
			getWechatId:function(){
				pro.toweixin();
			},
			changepsd:function(){
				this.showPsd=!this.showPsd;
				if(this.showPsd == true){
					$("#password").attr("type","text")
				}else{
					$("#password").attr("type","password")
				}
			}
		},
		mounted:function(){
			pro.getClentId();
			pro.isWXInstalled();
			var isWXInstalled = localStorage.isWXInstalled ? localStorage.isWXInstalled : '';
			if(isWXInstalled == 'false'){
				this.showWhat = false;
			}else{
				this.showWhat = true;
			}
		},
		activated:function(){
			pro.getClentId();
			//得到userList
			const userList1 = local.get('userList')||[]
			this.userList = userList1
			this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
			this.issavepsd= this.userInfo.issavepsd ? this.userInfo.issavepsd : '';
			
			if(this.issavepsd == true){
				this.phone = this.userInfo.username;
				this.password = Base64.decode(this.userInfo.password);
				this.showone = true;
			}else{
				this.showone =false;
				this.phone = "";
				this.password = "";
			}
			this.fullHeight1 = document.documentElement.clientHeight;
			const that = this
		    window.onresize = () => {
		        return (() => {
		          window.fullHeight = document.documentElement.clientHeight
		          that.fullHeight = window.fullHeight
		        })()
		    }
			pro.isWXInstalled();
			var isWXInstalled = localStorage.isWXInstalled ? localStorage.isWXInstalled : '';
			if(isWXInstalled == 'false'){
				this.showWhat = false;
			}else{
				this.showWhat = true;
			}
		},
		watch:{
			fullHeight (val) {
		        if(val != this.fullHeight1){
		        	this.showWhat = false;
		        }else{
		        	this.showWhat =true;
		        }
		    },
		    weixinLoginInfo(o,n){
		    	if(o == true){
			    	var weixinInfo = localStorage.weixinUser ? JSON.parse(localStorage.weixinUser) : "" ;
					var ClientId = JSON.parse(localStorage.clientid).id ? JSON.parse(localStorage.clientid).id : '';
					var data ={
						openId:weixinInfo.openid,
						clientId:ClientId
					}
					pro.fetch("post","/loginAndRegister/wxLogin",data,"").then(function(res){
						if(res.code == 1 && res.success == true){
							var userData = {'username':res.data.mobile,'token':res.data.token,'secret':res.data.secret};
							localStorage.user=JSON.stringify(userData);
							this.$toast({message:"授权登录成功",duration: 1000});
							//this.$router.push({path:"/index"});
							this.$router.push({path:"/my"});
							this.$store.state.account.isLogin = true;
						}
					}.bind(this)).catch(function(err){
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后再试",duration: 2000});
						}else{
							this.$toast({message:"请先绑定手机号",duration: 1000});
							this.$router.push({path:"/WXregister",query:{weixinInfo:weixinInfo}})
						}
					}.bind(this));
					this.$store._modules.root.state.account.weixinLoginInfo = false;
		    	}
		    }
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#login{
		width: $w;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
	}
	#container{
		margin-top: 0.96rem;
		width: 7.5rem;
		display: flex;
		flex-direction: column;
		padding: 0 0.3rem;
		.input{
			width: 100%;
			height: 0.4rem;
			border-bottom: 0.01rem solid $bgDeep;
			color:$graySimple ;
			text-indent: 0.36rem;
			font-size: 0.28rem;
			padding: 0.5rem 0;
		}
		.input1{
			margin-top: 0.4rem;
		}
		.psdRt{
			position: relative;
		}
		.psdIcon{
			top: 0.52rem;
			right: 0.3rem;
			position: absolute;
			display: inline-block;
			width:0.32rem;
			height: 0.16rem;
			background: url(../../../assets/images/account/account_psd.png);
			background-size: 100% 100%;
		}
		.psdIcon1{
			top: 0.52rem;
			right: 0.3rem;
			position: absolute;
			display: inline-block;
			width:0.32rem;
			height: 0.16rem;
			background: url(../../../assets/images/account/accout_nopsd.png);
			background-size: 100% 100%;
		}
		.forgetPsd{
			float: right;
			height: 0.64rem;
			display: block;
			line-height: 0.64rem;
			font-size: $fs28;
			color: $blackBold;
			margin-top: 0.1rem;
		}
		.btnred{
			width: 100%;
			height: 0.9rem;
			font-size: 0.36rem;
			line-height: 0.9rem;
			background-color: $redDeep;
			color: $bg;
			border-radius: 0.45rem;
			margin-top: 0.6rem;
		}
		.btn{
			width: 100%;
			height: 0.9rem;
			font-size: 0.36rem;
			line-height: 0.9rem;
			background-color: #c2c2cc;
			color: $bg;
			border-radius: 0.45rem;
			margin-top: 0.6rem;
		}
		p{
			text-align: center;
			color: $blackBold;
			font-size: $fs28;
			margin-top: 0.8rem;
		}
		.showWX{
			width: 100%;
			margin-top: 0.8rem;
			text-align: center;
			.toWX{
				display: inline-block;
				width: 0.64rem;
				height: 0.64rem;
				background: url(../../../assets/images/account/WXlogin.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>