<template>
    <div id="news_info_details" :style="{'height':clientHeight}">
        <mt-header fixed title="帮助详情">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>   
        <!-- 列表 -->
        <div class="article_wrap">
            <h2>{{details.title}}</h2>
            <span>{{details.time}}</span>
            <p v-html="details.content"></p>
        </div>
    </div>
</template>

<script>
import pro from '../../../assets/js/common'
   const newsList = [{

        content: "点击屏幕右下角我的页面,选择问题与反馈,输入您想要反馈的内容，我们会在第一时间与您取得联系.您也可以选择我的客服，与客服在线联系,或直接拨打我们的电话.",
        createDate: "2018-05-15 16:11:31",
        id: "b661d35237fbe4eca9db33010abfa3a01",
        isNewRecord: false,
        isPublish: "1",
        isTop: "0",
        time: "2018-06-27 16:11:23",
        title: "我有问题，如何反馈?",
        updateDate: "2018-06-11 16:06:11",
        version: 2
    },
    {

        content: "点击屏幕右下角我的页面,选择登录按钮，点击进入登录页面，然后点击屏幕左下角忘记密码按钮进入，输入您的账号,设置密码,最后输入验证码,验证成功即可.",
        createDate: "2018-05-15 16:11:31",
        id: "b663d35237fbe4eca9db33010abfa3a11",
        isNewRecord: false,
        isPublish: "1",
        isTop: "0",
        time: "2018-06-27 16:11:23",
        title: "登录密码忘记了怎么办?",
        updateDate: "2018-06-11 16:06:11",
        version: 2
    },
    {

        content: '点击屏幕右下角我的页面,选择注册按钮，点击进入注册页面,输入手机号并且设置密码即可注册成功.',
        createDate: "2018-05-15 16:11:31",
        id: "b665d35237fbe4eca9db33010abfa3aff",
        isNewRecord: false,
        isPublish: "1",
        isTop: "0",
        time: "2018-06-27 16:11:23",
        title: "如何注册账号?",
        updateDate: "2018-06-11 16:06:11",
        version: 2
    },
    {

        content: '请检查你的网络状态，打开手机设置,确认是否连接网络,后刷新,或者退出软件重启.',
        createDate: "2018-05-15 16:11:31",
        id: "b667d35237fbe4eca9db33010abfa3aee",
        isNewRecord: false,
        isPublish: "1",
        isTop: "0",
        time: "2018-06-27 16:11:23",
        title: "如果遇到没有数据，卡顿，闪退怎么办?",
        updateDate: "2018-06-11 16:06:11",
        version: 2
    },
    ]
    export default {
        name: 'news_info_details',
        props: ['id'],
        data() {
            return {
                details: {}
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
           
        },
       
        activated() {
             this.details = newsList.find((obj)=>{
                return obj.id == this.id
            })
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #news_info_details {
        width: 7.5rem;
        overflow: auto;
        background-color: $white;
    }
    
    .article_wrap {
        width: 7.5rem;
        padding: 1.26rem 0.3rem 0;
        h2 {
            @include font($fs36, 0.5rem, $blcakThin, left);
            font-weight: 600;
        }
        span {
            display: block;
            @include font($fs24, 0.8rem, $graySimple, right);
        }
        p {
            @include font($fs28, 0.4rem, $graySimple, left);
            text-indent: 2em;
        }
    }
</style>