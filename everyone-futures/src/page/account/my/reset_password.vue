<template>
    <div id="reset_password">
        <mt-header fixed title="修改登录密码">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>  
        <!-- 表单 -->
        <div class="input_wrap">
            <div class="input_group">
                <input v-model="oldPassWord" type="password" placeholder="原密码">
            </div>
            <div class="input_group">
                <input v-model="newPassWord1" type="password" placeholder="输入新密码（6-16位）">
            </div>
            <div class="input_group">
                <input v-model="newPassWord2" type="password" placeholder="确认新密码">
            </div>
        </div>
        <div class="btn_wrap">
            <button class="btn" @click="changePSW">完成</button>
        </div>
    </div>
</template>

<script>
    import pro from '../../../assets/js/common'
    let local = pro.local;
    export default {
        name: 'reset_password',
        data() {
            return {
                oldPassWord: '',
                newPassWord1: '',
                newPassWord2: '',
                pwdReg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
                userInfo: {}
            }
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + 'px';
            }
        },
        methods: {
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
            },
            pswVerification() {
                const mgs = {
                    oldPassWord: '原密码',
                    newPassWord1: '新密码',
                    newPassWord2: '确认密码',
                    empty: '请输入',
                    error: '请输入6-16位数字加字母的密码'
    
                }
                const testList = ['oldPassWord', 'newPassWord1', 'newPassWord2'];
                for (const value of testList) {
                    if (!this[value]) {
                        let message = mgs.empty + mgs[value]
                        return this.alert(message)
    
                    } else if (!this.pwdReg.test(this[value])) {
                        let message = mgs.error
                        return this.alert(message)
                    }
                }
                if (this.newPassWord1 !== this.newPassWord2) {
                    return this.alert('两次密码输入不一致，请重新输入')
                }
                return true;
            },
            alert(msg, time = 2000) {
                this.$toast({
                    message: msg,
                    duration: time
                })
            },
            changePSW() {
                let isTrue = this.pswVerification();
                if (isTrue) {
                    let sendData = {
                        oldPwd: this.oldPassWord,
                        newPwd: this.newPassWord1
                    }
                    let headers = {
                        token: this.userInfo.token,
                        secret: this.userInfo.secret
                    }
                    pro.fetch("post", "/account/modifyPwd", sendData, headers).then((res) => {
                        if (res.code == 1 && res.success == true) {
                            this.$toast({
                                message: "修改成功，请重新登录",
                                duration: 2000
                            });
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
                        } else {
                            this.$toast({
                                message: data.message,
                                duration: 2000
                            });
                        }
                    })
                }
            }
    
        },
        activated: function() {
            
            //获取平台账户登录信息
            this.userInfo = local.get('user');
            this.oldPassWord = '';
             this.newPassWord1 = '';
              this.newPassWord2 = '';

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
    }
    
    .btn_wrap {
        width: 7.5rem;
        padding: 0.6rem 0 0 0;
        text-align: center;
        .btn {
            width: 7rem;
            @include font($fs36, 0.88rem, $bg);
            background-color: $redDeep;
            border-radius: 0.44rem;
        }
    }
</style>