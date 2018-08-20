<template>
    <div id="cube">
        <div class="contain" @touchmove="moveCube" @touchstart="setCoordinate">
            <div class='box'>
                <div class="face one">one</div> <!-- 上面 -->
                <div :class="['face',`two${type}`]" @click="goto(typePath)">{{cubeList[0]}} </div><!-- 正面 -->
                <div :class="['face',`three${type}`]" @click="goto(typePath)">{{cubeList[1]}} </div> <!-- 右边 -->
                <div  :class="['face',`four${type}`]" @click="goto(typePath)">{{cubeList[2]}}</div><!-- 后面 -->
                <div :class="['face',`five${type}`]"  @click="goto(typePath)">{{cubeList[3]}} </div><!-- 左边 -->
                <div class="face six">six </div> <!-- 下面 -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cube",
        props: ['cubeList','type'],
        data() {
            return {
                currentIndex: 1,
                startCoordinate: {},
                moveFlag: false,
                rotateTime: 0,
                pathList: ['welfare_details/1', 'welfare_details/1', 'welfare_details/1' ,'welfare_details/1']
            }
        },
        computed: {
            typePath () {
                const pathList = ['welfare_details/1', 'welfare_details/2']
                return pathList[this.type - 1]
            }
        },
        methods: {
            goto (path) {
                this.$router.push({path: path})
            },
            dianwo (parent,times) {
                let cube = typeof parent === 'string' ? document.getElementsByClassName(parent)[0]:parent;
                let newRotateY = 20 + 90*times;
                cube.style.transform = 'rotateX(-10deg) rotateZ(0deg)'+ `rotateY(${newRotateY}deg)`;
                
            },
            moveCube () {
                 if (!this.moveFlag) return;
                 let parent = event.target.parentNode
                 let currentPoint = event.touches[0];
                      if (currentPoint.pageX - this.startCoordinate.startX > 20) {
                            //console.log('向右滑动了')
                            this.moveFlag = false;
                            this.rotateTime++;
                            this.dianwo(parent,this.rotateTime)
                        }   
                    if (currentPoint.pageX - this.startCoordinate.startX < -20) {
                        //console.log('向左滑动了')
                        this.moveFlag = false;
                        this.rotateTime--;
                        this.dianwo(parent,this.rotateTime)
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
    @include font($fs30,$width,#fff)

}
.box .one {
    background-color: #fae48c;
    transform: rotateX(90deg) translateZ($width/2);

}
@for $i from 1 through 2 {
    $bgColorTwo: (#9bbb59, #80bfd0);
    $bgColorThree: (#ee8a37, #d99694);
    $bgColorFour: (#d99694, #ee8a37);
    $bgColorFive: (#80bfd0, #9bbb59);
    .box .two#{$i} {
        transform: translateZ($width/2);
        background-color: nth($bgColorTwo,$i);
    }
    .box .three#{$i} {
        transform: rotateY(90deg) translateZ($width/2);
        background-color: nth($bgColorThree,$i);
    }
    .box .four#{$i} {
        transform: rotateY(180deg) translateZ($width/2);
        background-color: nth($bgColorFour,$i);
    }
    .box .five#{$i} {
        transform: rotateY(-90deg) translateZ($width/2);
        background-color: nth($bgColorFive,$i);
    }

}


// .box .two {
//      background-color: #9bbb59;
//     transform: translateZ($width/2);
// }
// .box .three {
//     background-color:#ee8a37;
//     transform: rotateY(90deg) translateZ($width/2);
    
// }
// .box .four {
//     transform: rotateY(180deg) translateZ($width/2);
//      background-color: #d99694;
// }
// .box .five {

//     transform: rotateY(-90deg) translateZ($width/2);
//     background-color: #80bfd0;
// }
.box .six {
    transform: rotateX(-90deg) translateZ($width/2) rotate(180deg);
    background-color: black;
}
</style>