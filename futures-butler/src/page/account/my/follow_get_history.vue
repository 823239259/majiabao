<template>
    <div id="match_details_history">
        <mt-header fixed :title="titleName">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
    
        <!-- 列表 -->
        <div class="list_wrap">
            <!-- tab-container -->
            <!-- 历史记录 -->
            <ul class="history_list">
                <li class="history_item_title">
                    <span>序号</span>
                    <div class="phone_number"> {{config.type}}</div>
                    <span class="small">跟投盈亏</span>
                    <span class="small">跟投比例</span>
                    <span class="more">{{config.name}}</span>
                    <template v-if="type=='2'">
                        <span class="more">{{config.surplus}}</span>
                    </template>
                                                                                              
                        <div class="time">结算时间</div>                       
                </li>
                <template v-if="listLength">
                    <li class="history_item" v-for="(item,index) in followList" :key="index">                        
                        <span>{{ (index + 1).toString().padStart(2,0) }}</span>
                        <div class="phone_number">{{item.wxNickname||mobileHidden(item.telphone)}}</div>
                        <span class="small">{{toFixed(item.followProfit)}}</span>
                        <span class="small">{{item.divide}}%</span>
                        <span class="more">{{toFixed(item.deductProfit)}}</span>
                        <template v-if="type=='2'">
                            <span class="more">{{toFixed(item.profit)}}</span>
                        </template>
                        <div class="time"><p class="time_day">{{item.settleTime|dateChange('y-m-d')}}</p><p class="time_date">{{item.settleTime|dateChange('h:i:s')}}</p></div>
                    </li>
                </template>
                <li class="no_list" v-else>
                    <p>无相关比赛记录</p>
                </li>
            </ul>                                                
        </div>         
        
        
    </div>
</template>

<script>
import pro from '../../../assets/js/common'
    const extractConfig = {
        type: '跟投用户名',
        name: '提取收益',
    }
    const deductionConfig = {
        type: '被跟投用户名',
        name: '跟投扣除金额',
        surplus: '跟投结余'
    }
    export default {
        name: 'follow_history',
        props: ['account', 'type', 'id'],
        data() {
            return {
                isBegin: true,
                selected: '1',
                config: {},
                userInfo: {},
                followList: [],
            }
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + 'px';
            },
            titleName() {
                switch (this.type) {
                    case '1':
                        this.config = extractConfig;
                        return '跟投提取收益'
                        break;
                    case '2':
                        this.config = deductionConfig;
                        return '跟投扣除收益'
                        break;
    
                    default:
                        break;
                }
            },
            listLength () {
                return this.followList.length
            },
            
        },
        methods: {
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
            },
            goFollow(id) {
                this.$router.push({
                    path: `/follow_get_history/${id}`
                });
            },
            toFixed (num,point = 2) {
                //console.log(num)
                if (typeof num === 'number') {
                    return num.toFixed(point)
                }
                
            },
            mobileHidden (phoneNumber) {
                return pro.mobileHidden(phoneNumber)              
            },
            getList() {
                var sendData = {
                    account: this.account,
                    type: this.type,
                    id: this.id
                }
                const headers = {
                    token: this.userInfo.token,
                    secret: this.userInfo.secret
                }
                this.$pro.fetch('post', '/followInvest/profitDetails', sendData, headers).then(function(res) {
                    //console.log(res)
                    if (res.success && res.code == 1) {
                        const abe = typeof res.data === 'string'?[]:res.data ;
                        console.log(abe)
                        this.followList = abe
                    }
    
                }.bind(this)).catch(function(err) {
                    //console.log(err)
                    var data = err.data;
                    if (data == undefined) {
                        this.$toast({
                            message: "网络不给力，请稍后重试",
                            duration: 2000
                        });
                    } else if(data.code == '-100') {
                        this.$toast({
                            message: `服务器异常 ${data.code}`,
                            duration: 2000
                        });
                    }else {
                        this.$toast({
                            message: data.message,
                            duration: 2000
                        });
                    }
                }.bind(this))
            }
        },
        // watch: {
        //     '$route' (to, from) {
        //         this.getList()
        //     // 对路由变化作出响应...
        //     }
        // },  
         filters: {
            dateChange (time, d) {
               return pro.getDate(time, d)
            }
        },  
        activated() {
            const local = this.$pro.local
            this.userInfo = local.get('user')
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    #match_details_history {
        width: 7.5rem;
        background-color: $bgGray;
    }
    
    .list_wrap {
        width: 7.5rem;
        padding: 0.96rem 0 0 0;
        background-color: $bgGray;
    }
    
    #match_details_history .is-selected {
        margin: 0;
        border-bottom: 0.03rem solid #e64552;
        color: #e64552;
    }
    
    .history_list {
        width: 7.5rem;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
    }
    
    .history_item,
    .history_item_title {
        width: 160%;
        @include flex(space-around);
        @include font($fs28, 0.64rem, $graySimple);
        .name {
            width: 1.5rem;
            padding: 0.15rem 0;
        }
        .time {
            width: 2rem;
            text-align: right;
            padding: 0.2rem 0.4rem 0.2rem 0;
        }
        .phone_number {
            width: 1.8rem;
        }
        span {
            width: 1.4rem;
        }
        .more {
            width: 1.8rem;
        }
        .time_day {
            @include font($fs28, 0.32rem, $blcakThin, right);
        }
        .time_date {
            @include font($fs24, 0.32rem, $graySimple, right);
        }
    }
     .no_list {
        text-align: center;
        p {
            @include font($fs28, 0.28rem, $graySimple);
            padding-bottom: 0.58rem;
        }
    }
    .history_item {
        background-color: $bg
    }
</style>