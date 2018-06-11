<template>
  <div>
    <h2>快速查看</h2>
    <ul class="fast-list">
      <li v-for="item in indexList" @click="ToItem(item.commodity_no)">{{ item.commodity_name }} {{ item.commodity_no }}</li>
    </ul>
  </div>
</template>

<script>
import pro from "../assets/common";
import {mapMutations, mapGetters,mapActions} from 'vuex'
const local = pro.local;

export default {
  name: "searchBefore",
  data() {
    return {
      itemName: ["国际原油", "美黄金", "恒指期货", "富时A50", "美铜"],
      test1: ""
    };
  },
  computed: {
    ...mapGetters({
      searchArr: 'searchArr'
    }),
    contractList () {
      return this.$store.state.contractList
    },
    indexList(){
      return this.contractList.filter((item)=>{
        return this.itemName.includes(item.commodity_name);                
      })
    }
  },
  methods: {
    ToItem(id) {
      this.$router.push({ path: `/kDetails/${id}` });
    },
    ...mapActions([
      'getContractList',
    ]),
  },
  mounted() {
    this.getContractList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/css/common.scss";
h2 {
  @include font(0.28rem, 0.88rem, #fff, left);
  padding-left: 0.3rem;
}
.fast-list {
  width: 6.9rem;
  margin: 0 auto;
  li {
    @include font(0.32rem, 1rem, #666, left);
    padding-left: 0.31rem;
    border-radius: 0.08rem;
    border: solid 1px #ebf0f2;
    margin-bottom: 0.3rem;
    background: url("../assets/img/youjiantou.png") 6.48rem center no-repeat;
    background-size: 0.12rem 0.2rem;
  }
  .checked {
    color: #fff;
    background-color: #e64552;
    background-image: url("../assets/img/youjiantou_bai.png");
    background-size: 0.12rem 0.2rem;
  }
}
</style>
