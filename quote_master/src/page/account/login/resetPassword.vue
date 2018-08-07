<template>
	<div id="resetPassword">
		<topTitle title="设置新密码" type="0" type1="1"></topTitle>
		<div id="container">
			<ul>
				<li class="Rt">
				<i :class="showPsd == false ? 'psdIcon1' : 'psdIcon'" @click="changepsd"></i>
					<input type="password"  placeholder="请输入密码(至少6位数)" class="input" v-model="password" maxlength="11" id="password"/>
				</li>
				<li class="Rt">
					<i :class="showPsd1 == false ? 'psdIcon1' : 'psdIcon'" @click="changepsd1"></i>
					<input type="password"  placeholder="请再次输入密码" class="input" v-model="surePassword" maxlength="11" id="password1"/>
				</li>
			</ul>
			<mt-button :class="btnType ? 'btn' : 'btnred'" @click="login" type="danger">登录</mt-button>
			<p @click="toRegisiter">新用户注册>></p>
			<div class="showWX" v-show="showWhat">
				<i class="toWX"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import topTitle from "../../../components/topTitle.vue"
	import pro from "../../../assets/js/common.js"
	export default{
		name:"resetPassword",
		components:{ topTitle },
		data(){
			return{
				password:"",
				surePassword:"",
				pwdReg:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
				showWhat:true,
				fullHeight:document.documentElement.clientHeight,
				fullHeight1:document.documentElement.clientHeight,
				showPsd:false,
				showPsd1:false
			}
		},
		computed:{
			btnType:function(){
				if(this.password!="" && this.surePassword!=""){
					return false;
				}else{
					return true;
				}
			}
		},
		methods:{
			changepsd:function(){
				this.showPsd=!this.showPsd;
				if(this.showPsd == true){
					$("#password").attr("type","text")
				}else{
					$("#password").attr("type","password")
				}
			},
			changepsd1:function(){
				this.showPsd1=!this.showPsd1;
				if(this.showPsd1 == true){
					$("#password1").attr("type","text")
				}else{
					$("#password1").attr("type","password")
				}
			},
			toRegisiter:function(){
				this.$router.push({path:"/regisiter"});
			},
			login:function(){
				if(this.password == ''){
					this.$toast({message: '请输入密码',duration: 2000});
				}else if(this.surePassword == ''){
					this.$toast({message: '请输入确认密码',duration: 2000});
				}else if(this.pwdReg.test(this.password) == false || this.pwdReg.test(this.surePassword) == false){
					this.$toast({message: '请输入6-16位数字加字母的密码',duration: 2000});
					this.password = "";
					this.password = "";
				}else if(this.password!=this.surePassword){
					this.$toast({message: '密码两次输入不一致，请仔细检查',duration: 2000});
				}else{
					var data = {
						mobile:this.phone,
						smsCode:this.code,
						newPwd:this.password
					}
					pro.fetch("post","/loginAndRegister/setNewPwd",data,"").then((res)=>{
						if( res.code == 1 && res.success == true){
							this.$toast({message: '登录密码设置成功',duration: 2000});
							this.$router.push({path:"/login"});
						}
					}).catch((err)=>{
						var data =err.data;
						if(data == undefined){
							this.$toast({message: '网络不给力，请稍后再试',duration: 2000});
						}else{
							this.$toast({message:data.message,duration: 2000});
						}
					})
				}
			}
		},
		activited:function(){
			pro.getClentId();
			this.code = this.$route.query.sendcode;
			this.phone = this.$route.query.sendphone;
			this.fullHeight1 = document.documentElement.clientHeight;
			const that = this
		    window.onresize = () => {
		        return (() => {
		          window.fullHeight = document.documentElement.clientHeight
		          that.fullHeight = window.fullHeight
		        })()
		    }
			this.code = this.$route.query.sendcode;
			this.phone = this.$route.query.sendphone;
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
							this.$router.push({path:"/my"});
							this.$store.state.account.isLogin = true;
						}
					}.bind(this)).catch(function(err){
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后再试",duration: 2000});
						}else{
							this.$toast({message:"请先绑定手机号",duration: 1000});
							this.$router.push({path:"/wechatRegisiter",query:{weixinInfo:weixinInfo}})
						}
					}.bind(this));
					this.$store._modules.root.state.account.weixinLoginInfo = false;
		    	}
		    }
		},
		mounted:function(){
			pro.getClentId();
			this.code = this.$route.query.sendcode;
			this.phone = this.$route.query.sendphone;
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#resetPassword{
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
			font-size: $fs28;
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