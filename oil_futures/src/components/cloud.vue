<template>
    <div id="discover" ref="viewBox">
        <div id="svg-box">
            <svg class="abc" :width='width' :height='height' @click='listener($event)' >
                <!-- <router-link :to="tag.href" v-for='tag in tags' class="forTest" :key="tag.text">
                    <text fill='red' :x='tag.x' :y='tag.y' :font-size='20 * (600/(600-tag.z))' :fill-opacity='((400+tag.z)/600)'>{{tag.text}}</text>
                </router-link> -->
                <a v-for='tag in tags'  class="forTest" :key="tag.text" @click.stop="itemClick(tag)">
                    <text :fill='bg2()' :x='tag.x' :y='tag.y' :font-size='20 * (600/(600-tag.z))' :fill-opacity='((400+tag.z)/600)'>{{tag.text}}</text>
                </a>
            </svg>
        </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>    
    </div>
</template>

<script>
    import pro from '../assets/js/common'
    export default {
        name: "cloud",
        components: {
    
        },
        mixins: [pro.mixinsToCustomer],
        props: {
            cloudList: Array
        },
        data() {
            return {
                //width: 375, //svg宽度
               // height: 375, //svg高度
                tagsNum: 30, //标签数量
                //RADIUS: 150, //球的半径
                speedX: -(Math.PI / 360), //球一帧绕y轴旋转的角度 负数为向下
                //speedX: 0, //球一帧绕x轴旋转的角度
                speedY: -(Math.PI / 360), //球-帧绕x轴旋转的角度 负数为向右
                //speedY: 0, //球一帧绕x轴旋转的角度
                tags: [],
                
                
            }
        },
        computed: {
            CX() { //球心x坐标
                return this.width / 2 - 40
            },
            CY() { //球心y坐标
                return this.height / 2
            },
            width () { //svg宽度
                const ratio = parseFloat(document.documentElement.style.fontSize)
              // return 7.5*ratio+20
                return 7.5*ratio
            },
            height () { //svg高度
                const ratio = parseFloat(document.documentElement.style.fontSize)
               // return 7.5*ratio+20
                return 7.5*ratio
            },
            RADIUS () { //半径
                const ratio = parseFloat(document.documentElement.style.fontSize)
                return 3*ratio
            },
            svgTop () {
                return document.getElementById('svg-box').offsetTop //外层盒子问题据顶部距离 svg是xml标签 没法相关offset属性
            },
            svgLeft () {
                return document.getElementById('svg-box').offsetLeft //外层盒子问题据左边距离
            }
        },
        methods: {
            goto(path) {
                this.$router.push({
                path: path
                });
            },
            itemClick (item) {
				if(item.path) {
					this.$router.push({path: item.path})
				}
				if(item.method){
					console.log(item.method)
					this[item.method]()
				}
            },
            deleteStore() {
                this.$messagebox.confirm('是否确认删除缓存?',{
                title: '提示',

                }).then(action => {
                
                this.$toast({
                        message: '缓存删除成功',
                        duration: 1000
                    })
                }).catch(action => {
                
                })
            },
            moreContent () {
                this.$toast({
                        message: '更多内容正在补充中',
                        duration: 1000
                    })
            },
            rotateX(angleX) {
                var cos = Math.cos(angleX);
                var sin = Math.sin(angleX);
                for (let tag of this.tags) {
                    var y1 = (tag.y - this.CY) * cos - tag.z * sin + this.CY;
                    var z1 = tag.z * cos + (tag.y - this.CY) * sin;
                    tag.y = y1;
                    tag.z = z1;
                }
            },
            rotateY(angleY) {
                var cos = Math.cos(angleY);
                var sin = Math.sin(angleY);
                for (let tag of this.tags) {
                    var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX;
                    var z1 = tag.z * cos + (tag.x - this.CX) * sin;
                    tag.x = x1;
                    tag.z = z1;
                }
            },
            listener(event) { //响应鼠标移动
                var x = event.clientX - this.svgLeft -  this.CX; //点击位置x,y相对当前的svg-box的位置
                var y = event.clientY - this.svgTop - this.CY; //点击位置x,y相对当前的svg-box的位置
                // console.log(`X的值为: ${x}`)
                // console.log(`y的值为: ${y}`)
                // console.log(`%c ${this.RADIUS * 0.00002}`,'color:red;font-size:50px')  

                //console.log(`%c ${x * 0.0001}`,'color:red;font-size:50px')
                this.speedX = x * 0.0001 > 0 ? -Math.min(this.RADIUS * 0.0002, x * 0.0001) : -Math.max(-this.RADIUS * 0.0002, x * 0.0001);
                this.speedY = y * 0.0001 > 0 ? -Math.min(this.RADIUS * 0.0002, y * 0.0001) : -Math.max(-this.RADIUS * 0.0002, y * 0.0001);
                // console.log(`speedX的值为: ${this.speedX}`)
                // console.log(`speedY的值为: ${this.speedY}`)
            },
            createCloud () {
                let len = this.cloudList.length;
                this.tags =  this.cloudList.reduce((tags,item,index) => {
                    let tag = {}
                    let k = -1 + (2 * (index + 1) - 1) / len;
                    let a = Math.acos(k); //余弦值
                    let b = a * Math.sqrt(len * Math.PI) //计算标签相对于球心的角度
                    tag.text = item.name;
                    tag.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b); //根据标签角度求出标签的x,y,z坐标
                    tag.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b);
                    tag.z = this.RADIUS * Math.cos(a);
                    if (item.path) {
                        tag.path = item.path
                    }else{
                        tag.method = item.method
                    }
                    tags.push(tag);
                    return tags
                },[]);
            },
            bg2(){
             return '#'+Math.floor(Math.random()*0xffffff).toString(16);
            }
        },
         created() { //初始化标签位置
           this.createCloud()
        },
        mounted() { //使球开始旋转
            setInterval(() => {
                this.rotateX(this.speedY); //控制X轴的旋转
                this.rotateY(this.speedX); //控制Y轴旋转
            }, 17)
        },
    
    
    
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/common.scss";
    #discover {
        width: $w;
        background-color: #162336;
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
    .abc{
        //transform: translate3d(-20px,0,0);
    //     transform-origin: center;
    //     transform-style: preserve-3d;
    //    perspective: 3000
    }
   .forTest{
       color: red;
   } 
   
</style>