<template>
	<div id="WXregister">
		<topTitle title="微信注册" type="0" type1="1"></topTitle>
		<div id="WXname">
			<ul>
				<li><img v-bind:src="this.headimgurl"/></li>
				<li>
					<p>亲爱的&nbsp;<span>{{nickname}}</span></p>
					<p>为了您的账户安全，请关联您的手机号，下次可直接登录。</p>
				</li>
			</ul>
		</div>
		<div class="h_20"></div>
		<div id="container">
			<div class="reg">
				<ul>
					<li>
						<input type="tel"  placeholder="请输入手机号" class="input input1" v-model="phone" maxlength="11"/>
					</li>
					<li class="Rt">
						<span class="getcode" @click="getCode" :class="{current: isClick == false}">{{volid ? info1 : (time + '秒')}}</span>
						<input type="tel"  placeholder="请输入验证码" class="input" v-model="code" maxlength="11"/>
					</li>
					<li class="Rt">
						<i :class="showPsd == false ? 'psdIcon1' : 'psdIcon'" @click="changepsd"></i>
						<input type="password"  placeholder="请输入密码" class="input" v-model="password" id="password"/>
					</li>
				</ul>
			</div>
			<mt-button :class="btnType ? 'btn' : 'btnred'" @click.native="confirm" type="danger">立即绑定并注册</mt-button>
			<p class="color_p" @click="toLogin"><span class="color_gray">已有账户？</span>立即登录>></p>
		</div>
		<codeDialog ref="codeDialog" type="register"></codeDialog>
	</div>
</template>

<script>
	import topTitle from "../../../components/topTitle.vue"
	import codeDialog from "../../../components/codeDialog.vue"
	import pro from "../../../assets/js/common.js"
	export default{
		name:"WXregister",
		components:{ topTitle,codeDialog },
		data(){
			return{
				nickname:"你是谁",
				phone:"",
				password:"",
				code:"",
				phoneReg: /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/,
				pwdReg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/,
				info1:"获取验证码",
				time: 0,
				info:"",
				openid:"",
				sex:"",
				unionid:"",
				province:"",
				city:"",
				country:"",
				headimgurl:"",
				privilege:"",
				accessToken:"",
				showPsd:false,
				isClick: false,
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
			btnType:function(){
				if(this.phone!="" && this.code!="" && this.password){
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
			toLogin:function(){
				this.$router.push({path:"/login"});
			},
			eyeEvent:function(e){
				if(this.showEye == true){
					this.showEye=!this.showEye;
					this.showNo=!this.showNo;
					$(e.target).removeClass("current").siblings(".input2").attr("type",'text');
				}else{
					this.showEye=!this.showEye;
					this.showNo=!this.showNo;
					$(e.target).removeClass("current").siblings(".input2").attr("type",'password');
				} 
			},
			getCode:function(e){
				if($(e.target).hasClass('current')) return false;
				if(this.phone == ''){
					this.$toast({message: '请输入手机号码',duration: 2000});
				}else if(this.phoneReg.test(this.phone) == false){
					this.$toast({message: '手机格式错误',duration: 2000});
				}else{
					this.$refs.codeDialog.ishow = true;
					this.$refs.codeDialog.path= this.PATH+"/loginAndRegister/getImgCode.jpg"+Math.random()*1000+"?mobile=" + this.phone;
					this.$refs.codeDialog.phone = this.phone;
					//页面效果
					$(e.target).addClass('current');
					this.time = 60;
					var timing = setInterval(function(){
						this.time--;
						if(this.time <= 0){
							clearInterval(timing);
							$(e.target).removeClass('current');
						}
					}.bind(this), 1000);
				}
			},
			confirm:function(){
				if(this.phone == ""){
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
					var data = {
						mobile:this.phone,
						password:this.password,
						code:this.code,
						resource:this.packChannel,
						openid:this.openid,
						nickname:this.nickname,
						sex:this.sex,
						unionid:this.unionid,
						province:this.province,
						city:this.city,
						country:this.country,
						headimgurl:this.headimgurl,
						privilege:this.privilege,
						accessToken:this.accessToken
					}
					pro.fetch("post","/loginAndRegister/register",data,"").then((res)=>{
						if(res.code == 1 && res.success == true){
							this.$toast({message:"注册成功",duration: 2000});
							this.$router.push({path:"/login"})
						}
					}).catch((err)=>{
						var data = err.data;
						if(data == undefined){
							this.$toast({message:"网络不给力，请稍后重试",duration: 2000});
						}else{
							this.$toast({message:data.message,duration: 2000});
						}
					})
				}
			}
		},
		mounted:function(){
			this.info = this.$route.query.weixinInfo;
			this.headimgurl = this.$route.query.weixinInfo.headimgurl;
			this.nickname = this.$route.query.weixinInfo.nickname;
			this.openid=this.$route.query.weixinInfo.openid;
			this.unionid=this.$route.query.weixinInfo.unionid;
			this.province=this.$route.query.weixinInfo.province;
			this.city=this.$route.query.weixinInfo.city;
			this.country=this.$route.query.weixinInfo.country;
			this.privilege=this.$route.query.weixinInfo.privilege;
			this.accessToken=this.$route.query.access_token;
			this.sex=this.$route.query.sex;
		},
		activited:function(){
			this.info = this.$route.query.weixinInfo;
			this.headimgurl = this.$route.query.weixinInfo.headimgurl;
			this.nickname = this.$route.query.weixinInfo.nickname;
			this.openid=this.$route.query.weixinInfo.openid;
			this.unionid=this.$route.query.weixinInfo.unionid;
			this.province=this.$route.query.weixinInfo.province;
			this.city=this.$route.query.weixinInfo.city;
			this.country=this.$route.query.weixinInfo.country;
			this.privilege=this.$route.query.weixinInfo.privilege;
			this.accessToken=this.$route.query.weixinInfo.access_token;
			this.sex=this.$route.query.weixinInfo.sex;
		},
		watch:{
			phone: function(n, o){
				if(n && n.length == 11){
					this.isClick = true;
				}else{
					this.isClick = false;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/common.scss";
	#WXregister{
		width: $w;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
	}
	#WXname{
		margin-top: 0.96rem;
		width: 100%;
		text-align: center;
		height: 2.4rem;
		padding: 0.6rem 0.3rem;
		ul{
			display: flex;
			justify-content: space-around;
			li{
				&:nth-child(1){
					img{
						width: 1.2rem;
						height: 1.2rem;
						display: block;
						background-size: 100% 100%;
						border-radius: 50%;
					}
				}
				&:nth-child(2){
					padding-left: 0.26rem;
					display: flex;
					flex-direction: column;
					text-align: left;
					p{
						line-height: 0.3rem;
						color: $grayDeep;
						&:nth-child(1){
							font-size: $fs28;
						}
						&:nth-child(2){
							margin-top: 0.1rem;
							font-size: $fs24;
						}
					}
					span{
						color: $blackBold;
						font-size: 0.28rem;
						font-weight: 600;
					}
				}
			}
		}
	}
	#container{
		width: 7.5rem;
		padding: 0 0.3rem;
		.reg{
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
		.color_p{
			margin-top: 0.8rem;
			color: $blcakThin;
			text-align: center;
		}
		.color_gray{
			color: $grayMiddle;
		}
		.current{
			color: $redDeep;
		}
	}
</style>