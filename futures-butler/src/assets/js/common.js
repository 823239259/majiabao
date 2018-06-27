/*  
 * @description: 公用JS 
 * @author: name  
 * @update: 2018-01-12
 */

var pro = {};
/***************************************************************/
/**
 * axios
 * 
 */
import axios from 'axios'
import qs from 'qs'
import store from '../../store'
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.defaults.baseURL = store.getters.PATH;
const storea = store
//POST传参序列化(添加请求拦截器，与Content-Type配合使用，如Content-Type=application/json,则无需序列化)
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});
//返回状态判断
axios.interceptors.response.use((res) =>{
    if(!res.data.success){
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});
let ls = localStorage;
var network = true;
//自定义一个axios实例

var axios1 = axios.create({
	baseURL: store.getters.futurePath,
	timeout: 5000,
  });







pro = {
	//ajax请求
	fetch: function (type, url, params, header) {
		return new Promise((resolve, reject) => {
			axios({
				method: type,
				url: url,
				headers: {
					token:  header.token ? header.token : '',
					secret: header.secret ? header.secret : '',
					version: header.version ? header.version : ''
				},
				data: params
			}).then(response => {
				resolve(response.data);
			}, err => {
				reject(err);
			}).catch((error) => {
			   reject(error)
			});
		});
	},
	/**
	 * 时间搓转化成2017-07-07 02:05:00
	 * prams time 时间
	 * prams d 时间格式
	 * 
	 */
	getDate: function (time,d) {
		var date=new Date(time);
		var year=date.getYear()+1900;
		var month=date.getMonth()+1;
		var day=date.getDate();
		var hour=date.getHours();
		var minu=date.getMinutes();
		var sec=date.getSeconds();
		if(day < 10){
			day = "0" + day;
		}
		if(month < 10){
			month = "0" + month;
		}
		if(hour < 10){
			hour = "0" + hour;
		}
		if(minu < 10){
			minu = "0" + minu;
		}
		if(sec < 10){ 
			sec = "0" + sec;
		}
		var d1 = year + "-"+ month + "-" + day + " " + hour + ":" + minu + ":" + sec;
		var d2 = year + "-"+ month + "-" + day;
		var d3 = hour+":"+minu+":"+sec;
		var d4 = hour+":"+minu;
		var d5 = year+"年"+month+"月"+day+"日";
		var d6 = day
		var d7 = year + "-"+ month + "-" + day +" "+"00:00:00";
		var d8 = year + "-"+ month + "-" + day + " " + hour + ":" + minu ;
		switch (d) {
			case 'y-m-d':
				return d2;
				break;
			case 'y-m-d h:i:s':
				return d1;
				break;	
			case 'h:i:s':
				return d3;
				break;
			case 'h:m':
				return d4;
				break;	
			case 'yy-mm-dd':
				return d5;
				break;
			case 'd':
				return d6;
				break;
			case 'y-m-d-0':
				return d7;
				break;	
			case 'y-m-d h:i':
				return d8;
				break;	
			case 'y/m/d h:i':
				return d8.replace(/\-/g,'/');
				break;				
			default:
				break;
		}
	},
	/**
	 * 数组取最大值、最小值
	 * 
	 */
	getMaximin: function(arr,maximin){ 
		if(maximin == "max"){ 
			return Math.max.apply(Math, arr); 
		}else if(maximin == "min"){ 
			return Math.min.apply(Math, arr); 
		} 
	}, 
	/**
	 * 微信授权登录
	 * 
	 */
	toweixin: function(){
		mui.plusReady(function(){
			var auths=null;
			// 扩展API加载完毕，现在可以正常调用扩展API
			plus.oauth.getServices(function(services){
	//			console.log("11111111111每次");
				auths = services;
				authLogin();
			},function(e){
				mui( "微信授权失败");
			});
			// 登录操作
			function authLogin(){
				var s = "";
				var choosename = "weixin";
				for(var i in auths){
					if(auths[i].id == choosename){
						s = auths[i];
						break;
					}
				}
				if (!s.authResult){
					s.login( function(e){
						mui.toast("登录认证成功！");
						authUserInfo();
					}, function(e){
						mui.toast("登录认证失败！");
					});
				}else{
					mui.toast("已经登录认证！");
				}
			}
			// 获取登录用户信息操作
			function authUserInfo(){
				var s = "";
				var choosename = "weixin";
				for(var i in auths){
					if(auths[i].id == choosename){
						s = auths[i];
						break;
					}
				}
				if ( !s.authResult ) {
					mui.toast("未登录授权！");
				} else {
					s.getUserInfo( function(e){
						localStorage.weixinUser=JSON.stringify(s.userInfo);
						storea._modules.root.state.account.weixinLoginInfo = true
						authLogout();
					}, function(e){
						mui.toast( "获取用户信息失败，请检查微信是否在线");
					} );
				}
			}
			// 注销所有登录授权认证服务
			function authLogout(){
				for ( var i in auths ) {
					var s = auths[i];
					if ( s.authResult ) {
						s.logout(function(e){
	//						console.log( "注销登录认证成功！" );
						}, function(e){
	//						console.log( "注销登录认证失败！" );
						});
					}
				}
			}
		})
	},
	isWXInstalled: function(){
		mui.plusReady(function(){
			var auths=null;
			plus.oauth.getServices(function(services){
				var WXApi = plus.ios.import("WXApi");
				var isWXInstalled = WXApi.isWXAppInstalled();
				localStorage.setItem("isWXInstalled",JSON.stringify(isWXInstalled));
			},function(e){
			});
		});
	},
	getClentId:function(){
		mui.plusReady(function(){
			var info = plus.push.getClientInfo();
			var clientid = {"id":info.clientid};
			localStorage.setItem("clientid",JSON.stringify(clientid));
		})
	},
	/**
	 * 判断是IOS还是安卓
	 * 
	 */
	isSysterm: function(){
		var u = navigator.userAgent;
		var obj = {};
		obj.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		obj.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		return obj;
	},
	/**
	 * 判断当前版本是PC还是移动端
	 * 
	 */
	isVersion: function(){
		let userAgentInfo = navigator.userAgent;
		let Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
		let flag = true;
		for (var v = 0; v < Agents.length; v++) {
		   if (userAgentInfo.indexOf(Agents[v]) > 0) {
			  flag = false;
			  break;
		   }
		}
		return flag;
	},	
	// isOpenMessage: function(){
	// 	var obj = pro.isSysterm();
	// 	if(obj.isiOS == true){
	// 		if(window.plus){
	// 			var UIApplication = plus.ios.import("UIApplication");
	// 			var app = UIApplication.sharedApplication();
	// 			var enabledTypes  = 0;
	// 			if (app.currentUserNotificationSettings) {
	// 				var settings = app.currentUserNotificationSettings();
	// 				enabledTypes = settings.plusGetAttribute("types");
	// 			} else {
	// 					//针对低版本ios系统
	// 				enabledTypes = app.enabledRemoteNotificationTypes();
	// 			}
	// 			//console.log("enabledTypes:"+enabledTypes);
	// 			if (enabledTypes == 0) {
	// 				mui.alert( "消息推送已关闭，无法接收通知，请在【设置】-【通知中心】-【应用名称】中开启");
	// 			}
	// 			plus.ios.deleteObject(app);
	// 		}
	// 	}
	// },
	
	// isOpenMessages: function(){
	// 	if(window.plus){
	// 		var pp = plus.navigator.checkPermission('NOTIFITION');
	// 		if(pp != 'authorized'){
	// 			mui.alert( "消息推送已关闭，无法接收通知，请在【设置】-【通知中心】-【应用名称】中开启");
	// 		}
	// 	}
	// },
	// openMessages: function(){
	// 	var obj = pro.isSysterm();
	// 	if(obj.isiOS == true){
	// 		if(window.plus){
	// 			var UIApplication = plus.ios.import("UIApplication");
	// 			var app = UIApplication.sharedApplication();
	// 			var enabledTypes  = 0;
	// 			if (app.currentUserNotificationSettings) {
	// 				var settings = app.currentUserNotificationSettings();
	// 				enabledTypes = settings.plusGetAttribute("types");
	// 			} else {
	// 				//针对低版本ios系统
	// 				enabledTypes = app.enabledRemoteNotificationTypes();
	// 			}
	// 			return enabledTypes;
	// 		}else{
	// 			return false;
	// 		}
	// 	}else{
	// 		return '';
	// 	}
	//},
	/**
	 * 判断网络是否已连接
	 * @param {} 
	 * 
	 */
	netIsconnected:function(fail, success){
		
		mui.plusReady(function() {
			document.addEventListener("netchange",function(){
				if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
	//				mui.toast("网络异常，请检查网络设置！");
					network = false;
					if(fail) fail();
				}else{
					network = true;
					if(success) success();
				}
			},false);
		});
		return network;
	},
	/**
	 * 判断一个数组中是否包含某一个值
	 * arr 数组
	 * val 值
	 */
	objIsInArray: function(arr, val){
		let str = arr.join(',');
		if(str.indexOf(val) == -1){
			return false;
		}else{
			return true;
		}
	},
	mobileHidden:function (phoneNumber) {
		if (phoneNumber) {
			return  phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		}else {
			return phoneNumber
		}	
	},
	local: {
		set (key,value) {
			let valueS = typeof value === 'string' ? value:JSON.stringify(value)
			ls.setItem(key, valueS)
		},
		get (key) {
			try {
				return JSON.parse(ls.getItem(key))
			} catch (error) {
				console.log(`${key}不存在`)
				return null
			}		
		},
		remove (key) {
			ls.removeItem(key)
		},
		clear () {
			ls.clear()
		},
		keys () {
			return Object.keys(ls)
		}
	},
	toThousands: function (num){
		let res=num&&num.toString().replace(/\d+/, function(n){ // 先提取整数部分
			return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
				return $1+",";
			});
		})
		return res
	},
	mixinsToCustomer : {
		data () {
			return {
				actions:[{name: '400-852-8008 '},{name: '工作日08:00-24:00,周末09:00-17:00'},{name: '拨打',method: this.callPhone}],
				sheetVisible:false
			}
		},
		methods: {
			callCustomer () {
				this.sheetVisible = true
			},
			callPhone:function(){
				window.location.href = 'tel://' + 4008528008;
			},
			shareSystem () {
				//console.log(123)
				var test1 = {
				  content: '给您分享一款专业的期货行情资讯工具应用，为您提供专业的期货行情资讯、期货小工具、以及专业的期货管家助手，您可以直接用App Store搜索下载【期货管家】即可',
				  //href: 'https://www.baidu.com'
				}
				pro.shareSystem(test1)
			  }  
		}

	},
	shareSystem (obj) {
		mui.plusReady(function(){
			//outSet('调用系统分享');
			// var msg={content:sharecontent.value};
			// if(pic&&pic.realUrl){
			// 	msg.pictures=[pic.realUrl];
			// }
			if('iOS'!==plus.os.name){//iOS平台添加链接地址
				obj.href='';
			}
			//outLine(JSON.stringify(msg));
			plus.share.sendWithSystem?plus.share.sendWithSystem(obj, function(){
				//outLine('Success');
				console.log('Success');
			}, function(e){
				//outLine('Failed: '+JSON.stringify(e));
				console.log('Failed: '+JSON.stringify(e));
			}):shareSystemNativeJS();
		})
	},
	axios1: axios1

}
export default pro