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
export default pro