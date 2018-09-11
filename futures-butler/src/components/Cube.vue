<template>
    <div id="cube">
        <div class="contain" @touchmove="moveCube" @touchstart="setCoordinate">
            <div class="box">
                <div class="face one">one</div> <!-- 上面 -->
                <div class="face two" @click="goto('/recommend/recommend')">{{cubeList[0]}} </div><!-- 正面 -->
                <div class="face three" @click="goto('/recommend/crude-oil')">{{cubeList[1]}} </div> <!-- 右边 -->
                <div class="face four" @click="goto('/recommend/stock-index')">{{cubeList[2]}}</div><!-- 后面 -->
                <div class="face five" @click="goto('/recommend/noble-metal')">{{cubeList[3]}} </div><!-- 左边 -->
                <div class="face six">six </div> <!-- 下面 -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cube",
        props: ['cubeList'],
        data() {
            return {
                currentIndex: 1,
                startCoordinate: {},
                moveFlag: false,
                rotateTime: 0,
            }
        },
        methods: {
            goto (path) {
                this.$router.push({path: path})
            },
            dianwo (times) {
                let cube = document.getElementsByClassName('box')[0];
                let newRotateY = 20 + 90*times;
                cube.style.transform = 'rotateX(-10deg) rotateZ(0deg)'+ `rotateY(${newRotateY}deg)`;
                
            },
            moveCube () {
                 //console.log(event.touches[0])
                 if (!this.moveFlag) return;
                 let currentPoint = event.touches[0];
                      if (currentPoint.pageX - this.startCoordinate.startX > 20) {
                            //console.log('向右滑动了')
                            this.moveFlag = false;
                            this.rotateTime++;
                            this.dianwo(this.rotateTime)
                        }   
                    if (currentPoint.pageX - this.startCoordinate.startX < -20) {
                        //console.log('向左滑动了')
                        this.moveFlag = false;
                        this.rotateTime--;
                        this.dianwo(this.rotateTime)
                    }
            },
            setCoordinate () {
                let startPoint = event.touches[0]; //触摸点
                this.moveFlag = true;
                this.startCoordinate = {
                    startX: startPoint.pageX,
                    startY: startPoint.pageY,
                }
            },
        

    
        },
        mounted() {
            //this.scrollContent()
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/common.scss";
    $width: 1.8rem;
@keyframes rotate {
    100% {
        transform: rotateY(360deg) rotateX(360deg);
    }
}
#cube{
    padding: 0.3rem 0;
    //width: 7.5rem;
}

    .contain {
    padding: 0.3rem 0;
    position: relative;
    perspective: 1600px;
    //animation: rotate-frame 30s linear infinite;

}
.box {
    //animation: rotate 20s ease 0s normal none infinite running ;
    //transform: rotateY(45deg) rotateX(-9deg) rotateZ(-9deg);
    transform: rotateX(-10deg) rotateY(20deg) rotateZ(0deg);
    transition: all 1s;
    height:$width;
    margin: 0 auto;
    position: relative;
    transform-style: preserve-3d;
    width: $width;
}

.face {
    backface-visibility: hidden;
    background-color: #fae48c;
    height: $width;
    opacity: 0.6;
    position: absolute;
    width: $width;
    @include font($fs36,$width,#fff)

}
.box .one {

    background-color: #fae48c;
    transform: rotateX(90deg) translateZ($width/2);

}
.box .two {
    background-color:#ee8a37;
    transform: translateZ($width/2);
}
.box .three {

    transform: rotateY(90deg) translateZ($width/2);
    background-color: #d99694;
}
.box .four {
    transform: rotateY(180deg) translateZ($width/2);
    background-color: #9bbb59;
}
.box .five {

    transform: rotateY(-90deg) translateZ($width/2);
    background-color: #80bfd0;
}
.box .six {
    transform: rotateX(-90deg) translateZ($width/2) rotate(180deg);
    background-color: black;
}
</style>