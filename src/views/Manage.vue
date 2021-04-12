<template>
  <div class="manage">
    <hm-header>栏目管理</hm-header>
    <div class="content">
      <div class="active">
        <h6>点击删除以下栏目</h6>
        <div class="item" v-for="item in activeList" :key="item.id" @click="delTab(item.id)">{{item.name}}</div>

      </div>
      <div class="deactive">
        <h6>点击添加以下栏目</h6>
        <div class="item" v-for="item in deactiveList" :key="item.id" @click="addTab(item.id)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
    if (activeList) {
      this.activeList = activeList
      this.deactiveList = deactiveList
      return
    }
    this.getList()
  },
  data () {
    return {
      activeList: [],
      deactiveList: []
    }
  },
  methods: {
    async getList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeList = data
        console.log(this.activeList)
      }
    },
    delTab (id) {
      console.log(id)
      const index = this.activeList.findIndex(item => item.id === id)
      this.deactiveList.push(this.activeList[index])
      this.activeList.splice(index, 1)
    },
    addTab (id) {
      console.log(id)
      const index = this.deactiveList.findIndex(item => item.id === id)
      this.activeList.push(this.deactiveList[index])
      this.deactiveList.splice(index, 1)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler (val) {
        localStorage.setItem('activeList', JSON.stringify(val))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
</script>

<style lang='less' scoped>
.content{
  padding: 10px;
  .active,
  .deactive{
    overflow: hidden;
    h6{
      padding: 10px 0;
    }
    .item{
      float: left;
      width: 60px;
      height: 30px;
      margin: 0 10px 10px 0;
      font-size: 16px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #666;
      background-color: #ddd;
    }
  }
}
</style>
