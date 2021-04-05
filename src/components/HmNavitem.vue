<template>
  <div class="hm-navitem" @click="clickFn">
    <div class="title">
     <slot></slot>
    </div>
    <div class="content">
      <slot name='content'></slot>
    </div>
    <div class="arrow">
      <span class='iconfont iconjiantou1'></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: String
  },
  methods: {
    clickFn () {
      this.$router.push(this.to)
    }
  }
}
</script>

<style scoped lang='less'>
.hm-navitem{
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 16px;
  border-bottom: 1px solid #eee;

   padding: 10px;
      margin-left: 10px;
  .content{
    flex: 1;
    text-align: right;
    font-size: 14px;
    color: #aaa;
    padding-right: 10px;
  }
  .iconfont{
     color: #aaa;
  }

}
</style>
