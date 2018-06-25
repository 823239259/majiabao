<template>
    <div id="news_info_details" :style="{'height':clientHeight}">
        <mt-header fixed title="公告详情">
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
            getDetails() {
                var data = {
                    id: this.id
                }
                pro.fetch("post", "/others/getNotice", data, "").then((res) => {
                    console.log(res)
                    if (res.code == 1 && res.success == true) {
                        this.details = res.data
                    }
                }).catch((err) => {
                    //console.log("err==="+JSON.stringify(err));
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
            }
        },
        watch: {
            id (value, oldValue) {
                if(value !== oldValue){
                    this.getDetails()
                }
            }
        },
        created () {
            console.log(12)
            this.getDetails() 
        },
        // activated() {
        //     console.log(1)
        //     this.getDetails()
        // }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #news_info_details {
        width: 7.5rem;
        overflow: auto;
        //background-color: $bgGray;
    }
    
    .article_wrap {
        width: 7.5rem;
        padding: 1.26rem 0.3rem 0;
        background-color: $bg;
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