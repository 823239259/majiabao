<template>
    <div id="feedback">
        <mt-header fixed title="意见反馈">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
    
        <!-- 列表 -->
        <div class="type_wrap">
            <p class="phone_number">选择反应类型</p>
            <ul class="list">
                <li v-for="item in typeList" :key="item.id" :class="{'red':item.value==currentIndex}" @click="changeIndex(item.value)">{{item.label}}</li>
            </ul>
        </div>
        <div class="list_wrap">
            <p class="phone_number">反馈内容</p>
            <textarea class="textarea" cols="30" rows="10" v-model="suggestionText" placeholder="您可以留下您的意见或者建议，谢谢"></textarea>
            <span class="text_length">{{suggestionText.length}}/200字</span>
        </div>
        <div class="list_wrap">
            <p class="phone_number">请填写您的联系方式</p>
            <input type="text" placeholder="手机号、微信号或电子邮箱" v-model="phone" />
        </div>
        <div class="btn_wrap">
            <button class="btn" @click="submit">提交</button>
        </div>
    
    </div>
</template>

<script>
    export default {
        name: 'feedback',
        data() {
            return {
                hasList: true,
                typeList: [],
                currentIndex: '1',
                suggestionText: '',
                phone: '',    
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
            goto(path) {
                this.$router.push({
                    path: path
                });
            },
            changeIndex(index) {
                this.currentIndex = index
            },
            getInfo() {
                this.$pro.fetch("post", "/others/getFeedbackType", {}, {}).then((res) => {
                    console.log(res)
                    if (res.code == 1 && res.success == true) {
                        this.typeList = res.data;
                    }
                }).catch((err) => {
                    console.log(err)
                    var data = err.data;
                    if (data == undefined) {
                        this.$toast({
                            message: '网络不给力，请稍后重试',
                            duration: 1000
                        });
                    } else {
                        this.$toast({
                            message: data.message,
                            duration: 1000
                        });
                    }
                })
            },
            submit() {
                if (this.suggestionText == '') {
                    this.$toast({
                        message: '内容不能为空',
                        duration: 1000
                    });
                } else if (this.phone == '') {
                    this.$toast({
                        message: '请正确填写联系方式',
                        duration: 1000
                    });
                } else if (this.suggestionText.length < 5) {
                    this.$toast({
                        message: '内容至少输入5个字符',
                        duration: 1000
                    });
                } else {
                    var data = {
                        type: this.currentIndex,
                        content: this.suggestionText,
                        contact: this.phone
                    }
                    this.$pro.fetch("post", "/others/submitFeedback", data, '').then((res) => {
                        if (res.code == 1 && res.success == true) {
                            this.suggestionText = '';
                            this.phone = '';
                            this.$toast({
                                message: '提交成功',
                                duration: 1000
                            });
                        }
                    }).catch((err) => {
                        var data = err.data;
                        if (data == undefined) {
                            this.$toast({
                                message: '网络不给力，请稍后重试',
                                duration: 1000
                            });
                        } else {
                            this.$toast({
                                message: data.message,
                                duration: 1000
                            });
                        }
                    })
                }
            },
        },    
        created() {
            this.getInfo()
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #feedback {
        width: 7.5rem;
        background-color: $bgGray;
    }
    
    .type_wrap {
        width: 7.5rem;
        padding: 0.96rem 0 0 0;
        background-color: #fff;
        .list {
            width: 7.5rem;
            @include flex(space-between);
            padding: 0.3rem;
        }
        li {
            width: 1.48rem;
            height: 0.64rem;
            background-color: #ffffff;
            border-radius: 0.04rem;
            border: solid 1px $graySimple;
            @include font($fs28, 0.64rem, $blcakThin);
        }
        @at-root .phone_number {
            @include font($fs28, 0.64rem, $graySimple, left);
            text-indent: 0.3rem;
            background-color: $bgDeep;
        }
        .red {
            color: $redDeep;
            border-color: $redDeep
        }
    }
    
    .list_wrap {
        position: relative;
        width: 7.5rem;
        text-align: center;
        background-color: #fff;
        .textarea {
            box-sizing: border-box;
            width: 7.5rem;
            height: 3.2rem;
            padding: 0.3rem;
            border: none;
            resize: none;
            @include font($fs28, 0.4rem, $graySimple, left);
        }
        .text_length {
            position: absolute;
            right: 0.3rem;
            bottom: 0.3rem;
            @include font($fs24, 0.4rem, $graySimple, left);
        }
        input[type='text'] {
            width: 6.9rem;
            height: 0.88rem;
            margin: 0.3rem 0;
            text-indent: 0.3rem;
            line-height: 0.88rem;
            background-color: #fff;
            border-radius: 0.08rem;
            border: solid 1px $bgDeep;
        }
    }
    
    .btn_wrap {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.88rem;
        line-height: 0.48rem;
        // position: fixed;
        // left: 0;
        // bottom: 0;
        // width: 7.5rem;
        // padding: 0.6rem 0 0 0;
        text-align: center;
        background-color: $bgGray;
        .btn {
            width: 7.5rem;
            @include font($fs36, 0.88rem, $bg);
            background-color: $redDeep;
            border: none
        }
    }
</style>