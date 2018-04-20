// /*  
//  * @description: 公用JS 
//  * @author: name  
//  * @update: 2018-01-12
//  */

var pro = {};
// /***************************************************************/
// /**
//  * axios
//  * 
//  */
 import axios from 'axios'
 import qs from 'qs'
// // axios 配置
// axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = process.env.API_HOST;
// //POST传参序列化(添加请求拦截器，与Content-Type配合使用，如Content-Type=application/json,则无需序列化)
// axios.interceptors.request.use((config) => {
//     if(config.method  === 'post'){
//         config.data = qs.stringify(config.data);
//     }
//     return config;
// },(error) =>{
//     return Promise.reject(error);
// });
// //返回状态判断
// axios.interceptors.response.use((res) =>{
//     // if(!res.data.success){
//     //     return Promise.reject(res);
//     // }
// 	// return res;
// 	if(res.data.msg === 'success'){
// 		return res;      
// 	}
// 	return Promise.reject(res);
// }, (error) => {
//     return Promise.reject(error);
// });
// pro.fetch = function(type, url, params, header){
// 	return new Promise((resolve, reject) => {
//         axios({
//         	method: type,
// 			url: url,
// 			headers: {
// 				token:  header.token ? header.token : '',
// 				secret: header.secret ? header.secret : '',
// 				version: header.version ? header.version : ''
// 			},
// 			data: params
//         }).then(response => {
//             resolve(response.data);
//         }, err => {
//             reject(err);
//         }).catch((error) => {
//            reject(error)
//         });
//     });
// }

let ls = localStorage;
pro.local = {
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
}
pro.getDate=function(d,time){
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
    if(d == "y-m-d"){
        return d2;
    }else if(d == "y-m-d h:i:s"){
        return d1;
    }else if(d == "h:i:s"){
    	return d3;
    }else if(d == "h:m"){
    	return d4;
    }else if(d == "yy-mm-dd"){
    	return d5;
    }else if(d == "d"){
    	return d6;
    }
}
export default pro