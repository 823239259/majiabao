<template>
    <div id="service">
        <mt-header fixed title="客服咨询">
            <mt-button slot="left" icon="back" @click="goBack"></mt-button>
        </mt-header>
        <div id="container">
            <iframe :src="iframe"></iframe>
        </div>
    </div>
</template>

<script>
    export default {
        name: "service",
        data() {
            return {
                userInfo: ""
            }
        },
        computed: {
            iframe: function() {
                return /*this.PATH + */ 'http://www.vs.com/topic/consistentBeauty/qiw_quoteApp_service.html?phone=' + (this.userInfo.username||13980674781)
            }
        },
        methods: {
    
            goBack() {
                // window.history.length > 1 ? this.$router.go(-2) : this.$router.push("/");
                history.go(-2);
            },
        },
        activated: function() {
            this.userInfo = localStorage.user ? JSON.parse(localStorage.user) : '';
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/css/common.scss";
    #service {
        width: 7.5rem;
    }
    
    #container {
        //color:$fontBlue ;
        width: 100%;
        margin-top: 1rem;
        iframe {
            width: 100%;
            height: 100%;
            position: fixed;
            bottom: 0;
        }
    }
</style>