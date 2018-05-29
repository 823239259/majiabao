<template>
    <div id="discover" ref="viewBox"  :style="{height:clientHeight,overflow:'scroll'}">
        <div  @click="toTop">
            <mt-header fixed title="资讯">
            <!-- <mt-button slot="left" @click="goto('/my')">
                <span class="icon_account"></span>
            </mt-button> -->
            <mt-button slot="right">
                <span class="icon_search" v-show="selected==1" @click.stop="goto('/discoverSearch')"></span>
                <span class="icon_calendar" v-show="selected==2" @click.stop="toChooseDay('picker1')"></span>
            </mt-button>
        </mt-header>
        </div>

        <!-- 选项卡 -->
        <div class="tab_wrap">
            <mt-navbar v-model="selected">
                <!-- <mt-tab-item id="1">7x24</mt-tab-item> -->
                <mt-tab-item id="1">要闻</mt-tab-item>
                <mt-tab-item id="2">日历</mt-tab-item>
                <mt-tab-item id="3">7x24</mt-tab-item>
                <!-- <mt-tab-item id="3">要闻</mt-tab-item> -->
            </mt-navbar>

            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <!-- <discover7x24></discover7x24> -->
                    <focus-news></focus-news>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <calendar-news :newDate ="newsDate" @datePosition="getDatePosition"></calendar-news>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <discover7x24></discover7x24>
                    <!-- <focus-news></focus-news> -->
                </mt-tab-container-item>
            </mt-tab-container>
            <router-link to="/cloud">abc</router-link>
            <mt-datetime-picker
                ref="picker1"
                type="date"
                v-model="value1"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                :startDate="startDate"
                :endDate="endDate"
                @confirm="handleChange">
            </mt-datetime-picker>


        </div>
    </div>
</template>

<script>
    import discover7x24 from '../pages/discover/discover7x24'
    import calendarNews from '../pages/discover/calendarNews'
    import focusNews from '../pages/discover/focusNews'
    import pro from '../assets/js/common'
    export default {
        name: "discover",
        components: {
            discover7x24,
            calendarNews,
            focusNews
        },
        data() {
            return {
                tabSelected: 'discover',
                selected: "1",
                navCheck: 0,
                newsDate: '',
                value: null,
                  value1: new Date(),
                  startDate: new Date('2014'),
                endDate: new Date('2020-12-31'),
                datePosition: '',
                scrollY: 0,
            }
        },
        computed: {
            clientHeight() {
                return document.documentElement.clientHeight + 'px';
            },
        },
        methods: {
            goto (...pathObj) {
                if (pathObj.length == 1) {
                    this.$router.push({path:pathObj[0]})
                }else if (pathObj.length == 2) {
                    this.$router.push({path:pathObj[0] ,query: {
                        id:1,
                        title:'比特币再现巨大跌幅，自高位跌去七成 这次还能爬起来吗？',
                        time: '2018-02-10'
                    }})
                }

            },
            toChooseDay (picker) {
                this.$refs[picker].open();
            },
            handleChange (value) {
                //console.log(value)
                console.log(this.$pro.getDate(Date.parse(value),"y-m-d"))
                this.newsDate = this.$pro.getDate(Date.parse(value),"y-m-d");
            },
            getDatePosition (value) {
                this.datePosition = value
            },
            // forTest () {
            // 	clearTimeout(timer)
            // 	var timer = setTimeout(() => {
            //         //console.log(this)
            //         this.scrollY = this.$refs.viewBox.scrollTop
            // 		console.log(this.$refs.viewBox.scrollTop)
            // 	}, 100);
            // }
            toTop () {
                console.log(12111)
                this.$refs.viewBox.scrollTop = 0
            }
        },
        watch: {
            selected (value) {
                if(value == 2) {
                    //接受子组件的传值来进行定位
                    let calendar_date = document.getElementsByClassName('calendar_date')[0]
                    this.$nextTick(()=>{
                        calendar_date.scrollLeft = this.datePosition
                    })
                }
            }
        },
        //定位回到离开时的位置
        // activated () {
        //     let _this = this
        //     this.$refs.viewBox.scrollTop = this.scrollY
        //     //this.$refs.viewBox.addEventListener('scroll',_this.forTest)
        // },
        // deactivated () {
        //     let _this = this
        //     this.scrollY = this.$refs.viewBox.scrollTop
        // 	//window.removeEventListener('scroll', _this.forTest);

        // }


    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/common.scss";
    #discover {
        width: $w;
        background-color: #fff;
        .mint-navbar .mint-tab-item.is-selected {
            margin: 0;
            border-bottom: 0.03rem solid $redDeep;
            color: $redDeep;
        }
        .mint-navbar .mint-tab-item {
            padding: 0.27rem;
        }
        .mint-navbar {
            border-bottom: 0.01rem solid $bgDeep;
            padding: 0 0.3rem;
        }

    }

    .icon_account,
    .icon_search,
    .icon_calendar {
        display: inline-block;
        width: 0.32rem;
        height: 0.32rem;
        background: url("../assets/images/discover/account_user.png") center no-repeat;
        background-size: cover;
    }

    .icon_search {
        background: url("../assets/images/discover/search_icon_white.png") center no-repeat;
        background-size: cover;
    }
    .icon_calendar {
        background: url("../assets/images/discover/choose_day.png") center no-repeat;
        background-size: cover;
    }
    .tab_wrap{
        margin-top: 0.96rem;
        width: 7.5rem;
        //padding-bottom: 1.16rem;
    }


</style>