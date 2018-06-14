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
const idList1 = local.get('idList')||[];
    export default {
        name: 'news_info',
        data() {
            return {
                hasList: true,
                newsList: [],
                currentIndex: 0,
                idList : idList1,
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
                    path: `news_info_details/${item.id}`
                });
               
            },
            getNewList() {
                const data = {
                    category: '期货知识'
                }
                pro.fetch("post", "/others/getNotice", data, "").then((res) => {
                    //console.log(res)
                   if(res.success == true){
						if(res.code == 1){
                            /* 
                                本地存储新闻内容 
                                 1.给返回的list 添加一个isread属性
                                 2. 点击事件 改变所点击那个item的isread 
                                    2.1 改变isread 
                                    2.2 存储 item 的id
                                 3. 重新渲染 对比本地存储的id,改变isread
                                    3.1 二次循环 改变对应id 的 isread属性
                                    3.2 赋值给渲染的 属性   
                            */
                            res.data.list.forEach(item => {
                                //是否在idList中                                
                                item.isRead = this.idList.includes(item.id);                               
                            });
                            this.newsList = res.data.list
                        }
                    }
    
                }).catch((err) => {
                    var data = err.data;
                    if (data == undefined) {
                        this.$toast({
                            message: "网络不给力，请稍后再试",
                            duration: 1000
                        });
                    } else {
                        if (data.code == -9999) {
                            this.$toast({
                                message: "认证失败，请重新登录",
                                duration: 1000
                            });
                            this.$router.push({
                                path: "/login"
                            });
                        } else {
                            this.$toast({
                                message: data.message,
                                duration: 1000
                            });
                        }
                    }
                })
            },

        },
        activated () {
            this.getNewList()
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #news_info {
        width: 7.5rem;
        background-color: $bg;
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