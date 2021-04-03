<template>
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
.hm-header{
  height: 50px;
  border-bottom: 1px #ccc solid;
  display: flex;
  text-align: center;
  // align-items: center;
  line-height: 50px;
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
