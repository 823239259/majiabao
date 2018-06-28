<template>
    <div id="news_info" :style="{height:clientHeight}">
        <mt-header fixed title="帮助中心">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
    
        <!-- 列表 -->
        <div class="news_wrap">
            <ul class="news_list" v-if="newsList.length">
                <li v-for="item in newsList" :key="item.id" @click="goto(item)">
                    <h3>{{item.title}}</h3>
                    <p>{{item.time}}</p>
                </li>
            </ul>
            <p class="no_news" v-else>暂无内容</p>
        </div>
    </div>
</template>

<script>
    import pro from '../../../assets/js/common'
    const local = pro.local;
    const idList1 = local.get('idList') || [];
    
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
        name: 'news_info',
        data() {
            return {
                hasList: true,
                newsList: [],
                currentIndex: 0,
                idList: idList1,
            }
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + 'px';
            },
    
        },
        methods: {
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
            },
            goto(item) {
                this.$router.push({
                    path: `help_info_details/${item.id}`
                });
    
            },
           
    
        },
        activated() {
            
            this.newsList = newsList
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #news_info {
        width: 7.5rem;
        background-color: $white;
    }
    
    .news_wrap {
        width: 7.5rem;
        padding: 0.96rem 0 0 0;
        li {
            position: relative;
            padding: 0.1rem 0.3rem;
            border-bottom: 1px solid $bgDeep;
            h3 {
                @include font($fs28, 0.46rem, $grayDeep, left);
            }
            p {
                @include font($fs24, 0.46rem, $grayDeep, left);
            }
            .is_read {
                position: absolute;
                left: 0.1rem;
                top: 0.28rem;
                width: 0.12rem;
                height: 0.12rem;
                background-color: $redDeep;
                border-radius: 50%;
            }
            .have_read {
                color: $blcakThin
            }
        }
        .no_news {
            position: absolute;
            top: 6rem;
            left: 50%;
            transform: translateX(-50%);
            @include font($fs28, 0.46rem, $grayDeep);
        }
    }
</style>