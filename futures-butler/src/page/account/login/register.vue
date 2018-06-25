<template>
	<div id="register">
		<topTitle title="注册" type="1" type1="1"></topTitle>
		<div id="container">
			<ul>
				<li>
					<input type="tel"  placeholder="请输入手机号" class="input input1" v-model="phone" maxlength="11"/>
				</li>
				<li class="Rt">
					<span class="getcode" @click="getCode" :class="{current: isClick == false}">{{volid ? info : (time + '秒')}}</span>
					<input type="text"  placeholder="请输入验证码" class="input" v-model="code"/>
				</li>
				<li class="Rt">
					<i :class="showPsd == false ? 'psdIcon1' : 'psdIcon'" @click="changepsd"></i>
					<input type="password"  placeholder="请输入密码" class="input" v-model="password" id="password"/>
				</li>
			</ul>
			<mt-button :class="btnType ? 'btn' : 'btnred'" @click="regisiter"  type="danger">注册</mt-button>
			<p @click="toLogin"><span class="color_gray">已有账户？</span>立即登录>></p>
			<!-- <div class="showWX" v-show="showWhat">
				<i class="toWX" @click="getWechatId"></i>
			</div> -->
			<p @click="toProtocol"><span class="color_gray">注册即代表阅读并同意</span>《指数天下用户协议》</p>
		</div>
		<codeDialog type="register" ref="codeDialog"></codeDialog>
	</div>
</template>

<script>
	import topTitle from "../../../components/topTitle.vue"
	import codeDialog from "../../../components/codeDialog.vue"
	import pro from "../../../assets/js/common.js"
	export default{
		name:"register",
		components:{ topTitle,codeDialog },
		data(){
			return{
				phone:"",
				password:"",
				code:'',
				phoneReg: /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/,
				pwdReg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
				info:"获取验证码",
				time: 0,
				isClick: false,
				show: false,
				showPsd:false,
				showWhat:true,
				fullHeight:document.documentElement.clientHeight,
				fullHeight1:document.documentElement.clientHeight
			}
		},
		computed: {
			PATH: function(){
				return this.$store.getters.PATH;
			},
			volid: function(){
				if(this.time <= 0){
					return true
				}else{
					return false
				}
			},
			packChannel(){
				return this.$store.state.account.packChannel;
			},
			weixinLoginInfo:function(){
				return this.$store._modules.root.state.account.weixinLoginInfo
			},
			btnType:function(){
				if(this.phone!="" && this.password!="" && this.code!=""){
					return false;
				}else{
					return true;
				}
			}
		},
		watch:{
			phone: function(n, o){
				if(n && n.length == 11){
					this.isClick = true;
				}else{
					this.isClick = false;
				}
			},
			fullHeight (val) {
		        if(val != this.fullHeight1){
		        	this.showWhat = false;
		        	$("#to").hide();
		        }else{
		        	this.showWhat =true;
		        	$("#to").show();
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
		},
		methods:{
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
			},
			toLogin:function(){
				this.$router.push({path:"/login"});
			},
			toWX:function(){
				this.$router.push({path:"/WXregister"});
			},
			toProtocol:function(){
				this.$router.push({path:"/userRegistrationProtocol"});
			},
			getCode:function(e){
				if($(e.target).hasClass('current')) return false;
				if(this.isClick == false){
					this.$toast({message: '请输入11位手机号码',duration: 2000});
				}else if(this.phoneReg.test(this.phone) == false){
					this.$toast({message: '手机格式错误',duration: 2000});
				}else{
					this.$refs.codeDialog.ishow = true;
					this.$refs.codeDialog.path= this.PATH+"/loginAndRegister/getImgCode.jpg"+Math.random()*1000+"?mobile=" + this.phone;
					this.$refs.codeDialog.phone = this.phone;
					//页面效果
					this.time = 60;
					var timing = setInterval(function(){
						this.time--;
						if(this.time <= 0){
							clearInterval(timing);
						}
					}.bind(this), 1000);
				}
			},
			regisiter:function(){
				if(this.show == true){
					this.$toast({message: '请不要重复点击',duration: 2000});
				}else if(this.phone == ""){
					this.$toast({message: '请输入手机号码',duration: 2000});
				}else if(this.code == ""){
					this.$toast({message: '请输入短信验证码',duration: 2000});
				}else if(this.password == ""){
					this.$toast({message: '请输入登录密码',duration: 2000});
				}else if(this.phoneReg.test(this.phone) == false){
					this.$toast({message: '请输入正确手机格式',duration: 2000});
				}else if(this.pwdReg.test(this.password) == false){
					this.$toast({message: '请输入6-16位数字加字母的密码',duration: 2000});
				}else {
					this.show = true;
					var data = {
						mobile:this.phone,
						password:this.password,
						code:this.code,
						resource:this.packChannel
					}
					// pro.fetch("post","/loginAndRegister/register",data,"").then((res)=>{
					// 	if(res.code == 1 && res.success == true){
					// 		this.show = false;
					// 		this.$toast({message:"注册成功",duration: 1000});
					// 		this.$router.push({path:"/login"});
					// 	}
					// }).catch((err)=>{
					// 	var data = err.data;
					// 	if(data == undefined){
					// 		this.$toast({message:"网络不给力，请稍后重试",duration: 1000});
					// 		this.show = false;
					// 	}else{
					// 		this.$toast({message:data.message,duration: 1000});
					// 		this.show = false;
					// 	}
					// })
					
				}
			},
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
		}
	}
</script>


<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#register{
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
		.Rt{
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
		.getcode{
			display: block;
			position: absolute;
			top: 0.52rem;
			right: 0.3rem;
			font-size: $fs24;
			color: $grayMiddle;
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
			margin-top: 0.8rem;
			&:nth-child(1){
				font-size: $fs28;
			}
			&:nth-child(2){
				font-size: $fs24;
			}
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
		.color_gray{
			color: $grayMiddle;
		}
		.current{
			color: $redDeep;
		}
	}
</style>