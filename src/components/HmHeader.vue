<template>
 <div>
    <div class="holder"></div>
  <div class="hm-header">
      <div class="back" @click="back">
      <span class='iconfont iconjiantou2'></span>
    </div>
    <div class="title">
      <slot></slot>
    </div>
    <div class="right">
    </div>
  </div>
 </div>

</template>

<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='less'>
.holder{
    height: 50px;
    width: 100%;
  }
.hm-header{
  position:fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  text-align: center;
  // align-items: center;
  line-height: 50px;
  border-bottom: 1px #ccc solid;
  background-color: #fff;
  z-index: 999;

  .title{
    flex: 1;
    font-size: 18px;
    font-weight: 700;
  }
  .right,
  .back{
    width: 50px;
  }
}
</style>
