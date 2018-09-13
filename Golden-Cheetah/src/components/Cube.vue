<template>
<div id="cube">
    <!-- <div class="contain" @touchmove="moveCube" @touchstart="setCoordinate" @touchEnd="handleEnd"> -->
    <div class="contain">
        <div class="box">
            <div class="face one">
                <span class="span">{{cubeList[0]}} </span></div>
            <!-- 上面 -->
            <div class="face two" @click="goto('/recommend/recommend')">
                <span class="span">{{cubeList[1]}} </span>
            </div>
            <!-- 正面 -->
            <div class="face three" @click="goto('/recommend/crude-oil')">
                <span class="span">{{cubeList[2]}} </span>
            </div>
            <!-- 右边 -->
            <div class="face four" @click="goto('/recommend/stock-index')">
                <span class="span">{{cubeList[3]}} </span></div>
            <!-- 后面 -->
            <div class="face five" @click="goto('/recommend/noble-metal')">
                <span class="span">{{cubeList[4]}} </span></div>
            <!-- 左边 -->

            <div class="face six"><span class="span">{{cubeList[5]}} </span></div>
            <!-- 下面 -->
        </div>
    </div>
    <div class="btn" @click="dianwo">点击切换</div>
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
            rotateFont: 'front'
        }
    },
    methods: {
        goto(path) {
            this.$router.push({
                path: path
            })
        },
        dianwo(times) {
            let cube = document.getElementsByClassName('box')[0];
            const transformList = {
                front: `rotateX(0deg) rotateZ(0deg) rotateY(0deg)`,
                back: `rotateX(0deg) rotateZ(0deg) rotateY(-180deg)`,
                right: `rotateX(0deg) rotateZ(0deg) rotateY(-90deg)`,
                left: `rotateX(0deg) rotateZ(0deg) rotateY(90deg)`,
                up: `rotateX(-90deg) rotateZ(0deg) rotateY(0deg)`,
                down: `rotateX(90deg) rotateZ(0deg) rotateY(180deg)`
            }
            const cubeList = ['front', 'back', 'right', 'left', 'up', 'down']
            let item = cubeList[Math.floor(Math.random() * 6)];


            cube.style.transform = transformList[item]

            // cube.style.transform = 'rotateX(0deg) rotateZ(0deg)'+ `rotateY(0deg)`;
            // if (direction==='row') {
            //     //cube.style.transform = 'rotateX(-10deg) rotateZ(0deg)'+ `rotateY(${newRotateY}deg)`;
            //      cube.style.transform = 'rotateX(0deg) rotateZ(0deg)'+ `rotateY(${test1}deg)`;
            // }else if(direction==='col'){
            //     //cube.style.transform =`rotateX(${newRotateX}deg) rotateZ(0deg)`+ `rotateY(20deg)`;
            //     //  cube.style.transform =`rotateX(${test1}deg) rotateZ(-20deg) rotateY(${test2}deg)`;
            //      cube.style.transform =`rotateX(${test1}deg) rotateZ(0deg) rotateY(${test2}deg)`;

            // }


        },
        moveCube() {
            //console.log(event.touches[0])
            if (!this.moveFlag) return;
            let currentPoint = event.touches[0];
            let rowDistance = currentPoint.pageX - this.startCoordinate.startX;
            let colDistance = currentPoint.pageY - this.startCoordinate.startY;
            let Distance = {
                changeValue: Math.abs(rowDistance) >= Math.abs(colDistance) ? rowDistance : colDistance,
                direction: Math.abs(rowDistance) >= Math.abs(colDistance) ? 'row' : "col",
            }
            if (Distance.changeValue > 20) {
                console.log(`向${Distance.direction}滑动了`)
                this.moveFlag = false;
                const rowList = ['font', 'right', 'back', 'left'];

                this.rotateTime++;
                this.dianwo(this.rotateTime, Distance.direction)
            }
            if (Distance.changeValue < -20) {
                console.log(`向${Distance.direction}滑动了`)
                this.moveFlag = false;
                this.rotateTime--;
                this.dianwo(this.rotateTime, Distance.direction)
            }
        },
        setCoordinate() {
            let startPoint = event.touches[0]; //触摸点
            this.moveFlag = true;
            this.startCoordinate = {
                startX: startPoint.pageX,
                startY: startPoint.pageY,
            }
            //阻止页面的滑动默认事件
            window.addEventListener("touchmove", this.defaultEvent, {
                passive: false
            });
        },
        handleEnd() {
            window.removeEventListener("touchmove", this.defaultEvent, {
                passive: false
            });
        },
        defaultEvent(e) {
            e.preventDefault();
        },



    },
    mounted() {
        //this.scrollContent()
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/common.scss";
@keyframes rotate {
    100% {
        transform: rotateY(360deg) rotateX(360deg);
    }
}

#cube {
    padding: 0.3rem 0;
    width: 100%;
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
    transform: rotateX(-10deg) rotateY(20deg) rotateZ(0deg) translateZ(-1.5rem);
    transition: all 1s;
    height: 3rem;
    margin: 0 auto;
    position: relative;
    transform-style: preserve-3d;
    width: 3rem;
    
}

.face {

    backface-visibility: hidden;
    background-color: #fae48c;
    height: 3rem;
    opacity: 0.6;
    position: absolute;
    width: 3rem;
    
    .span {
       position: absolute;
       left: 50%;
       top: 50%;
       transform: translate(-50%,-50%);
        @include font($fs36, 2rem, #fff);
        width: 2rem;
        height: 2rem;
        border: 0.1rem solid #fff;
    }
}

.box .one {
    background-color: #ff8bba;
    transform: rotateX(90deg) translateZ(1.5rem);
}

.box .two {
    background-color: #8c70f6;
    transform: translateZ(1.5rem);
}

.box .three {
    transform: rotateY(90deg) translateZ(1.5rem);
    background-color: #11d3d2;
}

.box .four {
    transform: rotateY(180deg) translateZ(1.5rem);
    background-color: #ffc65e;
}

.box .five {
    transform: rotateY(-90deg) translateZ(1.5rem);
    background-color: #3180ff;
}

.box .six {
    transform: rotateX(-90deg) translateZ(1.5rem) rotate(180deg);
    background-color: #29cc5f;
}

.btn {
    width: 1rem;
    height: 1rem;
    color: red
}
</style>