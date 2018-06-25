<template>
    <div id="reset_phone">
        <mt-header fixed title="修改手机号">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
    
        <!-- 表单 -->
        <div class="input_wrap">
            <p class="phone_text">您现在正在为账户 {{mobileHidden(userInfo.username)}} 修改手机号</p>
            <p class="phone_number"><span>手机号：</span>{{mobileHidden(userInfo.username)}}</p>
            <div class="input_group">
                <input type="number" placeholder="短信验证" v-model="code">
                <div class="get_code" @click="getcode">                 
                    <template v-if="volid">
                        {{info}}
                    </template>
                    <template v-else>
                        倒计时 <span>{{time}}</span> S
                    </template>
                </div>
            </div>
            <div class="input_group">
                <input type="number" placeholder="新手机号" v-model="cellphone">
            </div>
            <div class="input_group">
                <input type="number" placeholder="新验证码" v-model="code1">
                <div class="get_code"  @click="getcode1">
                    <template v-if="volid1">
                        {{info}}
                    </template>
                    <template v-else>
                        倒计时 <span>{{time1}}</span> S
                    </template>
                </div>
            </div>
        </div>
        <div class="btn_wrap">
            <button class="btn" @click="confirm">确认</button>
        </div>
    </div>
</template>

<script>
import pro from '../../../assets/js/common'
const local = pro.local;
    export default {
        name: 'reset_phone',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                hasList: true,
                userInfo: {},
                phone: "",
                mobile: "",
                info: "点击获取",
                time: 0,
                time1: 0,
                cellphone: '',
                code: "",
                code1: '',
                phoneReg: /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/
            }
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + 'px';
            },
            volid: function() {
                if (this.time <= 0) {
                    return true
                } else {
                    return false
                }
            },
            volid1: function() {
                if (this.time1 <= 0) {
                    return true
                } else {
                    return false
                }
            },
        },
        methods: {
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
            },
            goto(path) {
                this.$router.push({
                    path: path
                });
            },
            mobileHidden (phoneNumber) {
                return pro.mobileHidden(phoneNumber)
            },            
            getcode: function(e) {
                //禁止点击
                if (this.time>0) return;
                //页面效果
                $(e.target).addClass('current');
                this.time = 60;
                var timing = setInterval(function() {
                    this.time--;
                    if (this.time <= 0) {
                        clearInterval(timing);
                        $(e.target).removeClass('current');
                    }
                }.bind(this), 1000);
                var data = {
                    mobile: this.phone,
                    type: 3
                }
                var headers = {
                    token: this.userInfo.token,
                    secret: this.userInfo.secret
                }
                this.$pro.fetch("post", "/loginAndRegister/getSmsCode", data, headers).then((res) => {
                    if (res.code == 1 && res.success == true) {
                        this.$toast({
                            message: "发送成功",
                            duration: 2000
                        });
                    }
                }).catch((err) => {
                    var data = err.data;
                    if (data == undefined) {
                        this.$toast({
                            message: "网络不给力，请稍后再试",
                            duration: 2000
                        });
                    } else {
                        this.$toast({
                            message: data.message,
                            duration: 2000
                        });
                    }
                })
            },
            getcode1: function(e) {  
                //禁止点击
                if (this.time1>0) return;
                var data = {
                    mobile: this.cellphone,
                    type: 3
                }
                var headers = {
                    token: this.userInfo.token,
                    secret: this.userInfo.secret
                }
                if (this.phoneReg.test(this.cellphone) == false) {
                    this.$toast({
                        message: "请输入正确手机号",
                        duration: 2000
                    });
                } else {
                    this.$pro.fetch("post", "/loginAndRegister/getSmsCode", data, headers).then((res) => {
                        if (res.code == 1 && res.success == true) {
                            this.$toast({
                                message: "发送成功",
                                duration: 2000
                            });

                        }
                    }).catch((err) => {
                        var data = err.data;
                        if (data == undefined) {
                            this.$toast({
                                message: "网络不给力，请稍后再试",
                                duration: 2000
                            });
                        } else {
                            this.$toast({
                                message: data.message,
                                duration: 2000
                            });
                        }
                    })
                    //页面效果
                    $(e.target).addClass('current');
                    this.time1 = 60;
                    var timing = setInterval(function() {
                        this.time1--;
                        if (this.time1 <= 0) {
                            clearInterval(timing);
                            $(e.target).removeClass('current');
                        }
                    }.bind(this), 1000);
                }
            },
            confirm: function() {
                console.log(1)
                if (this.cellphone == '') {
                    this.$toast({
                        message: "请输入手机号",
                        duration: 2000
                    });
                } else if (this.code == '') {
                    this.$toast({
                        message: "请输入原手机号短信验证码",
                        duration: 2000
                    });
                } else if (this.code1 == '') {
                    this.$toast({
                        message: "请输入新手机号短信验证码",
                        duration: 2000
                    });
                } else if (this.phoneReg.test(this.cellphone) == false) {
                    this.$toast({
                        message: "请输入正确手机号",
                        duration: 2000
                    });
                } else {
                     console.log(2)
                    var data = {
                        oldMobileCode: this.code,
                        newMobile: this.cellphone,
                        newMobileCode: this.code1
                    }
                    var headers = {
                        token: this.userInfo.token,
                        secret: this.userInfo.secret
                    }
                    this.$pro.fetch("post", "/account/modifyMoblie", data, headers).then((res) => {
                        if (res.code == 1 && res.success == true) {
                            this.$toast({
                                message: "修改成功，请重新登录",
                                duration: 2000
                            });                                                        
                            //处理本缓存 userList
                            var userList = local.get('userList')
                            this.removeItem(userList, this.phone)
                            local.remove('user')
                            this.$router.push({
                                path: "/login"
                            });
                        }
                    }).catch((err) => {
                        var data = err.data;
                        if (data == undefined) {
                            this.$toast({
                                message: "网络不给力，请稍后再试",
                                duration: 2000
                            });
                        }else {
                            this.$toast({
                                message: data.message,
                                duration: 2000
                            });
                        }
                    })
                }
            },
            removeItem (listArr , username, key= 'userList') {
                let index = listArr.findIndex((userObj) =>{
					return userObj.username == username
                })
                if(index > -1) {
					listArr.splice(index,1);
                }
                local.set(key,listArr)
            }
        },
        mounted: function() {
            this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
            this.phone = this.$route.query.phone;
            console.log("this.phone====" + this.phone)
            var phone = this.$route.query.phone;
        },
        activated() {
            this.userInfo = local.get('user')
            this.phone = this.userInfo.username
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #reset_password {
        width: 7.5rem;
    }
    
    .input_wrap {
        width: 7.5rem;
        padding: 1.11rem 0 0.15rem 0;
        background-color: $bg;
        text-align: center;
        .input_group {
            position: relative;
        }
        .phone_text {
            @include font($fs24, 0.88rem, $graySimple, left);
            text-indent: 0.3rem;
        }
        .phone_number {
            @include font($fs28, 0.88rem, $blackBold, left);
            text-indent: 0.3rem;
            background-color: $bgDeep;
            span {
                color: $graySimple
            }
        }
        input {
            width: 6.9rem;
            height: 0.88rem;
            margin: 0.15rem 0;
            text-indent: 0.3rem;
            line-height: 0.88rem;
            background-color: $bg;
            border-radius: 0.08rem;
            border: solid 1px $bgDeep;
        }
        .get_code {
            position: absolute;
            top: 0.15rem;
            right: 0.3rem;
            width: 1.76rem;
            //height: 0.88rem;
            background-color: #ffffff;
            border: solid 1px #e6e6e6;
            border-radius: 0 0.08rem 0.08rem 0;
            @include font($fs26, 0.85rem, $graySimple);
            span {
                color: $redDeep
            }
        }
    }
    
    .btn_wrap {
        width: 7.5rem;
        text-align: center;
        .btn {
            width: 7rem;
            @include font($fs36, 0.88rem, $bg);
            background-color: $redDeep;
            border-radius: 0.44rem;
        }
    }
</style>