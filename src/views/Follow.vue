<template>
  <div class="follow">
    <hm-header>我的关注</hm-header>
      <div class="list">
        <div class='item' v-for="item in followList" :key="item.id">
        <div class="avatar">
          <img :src="$base + item.head_img" alt="">
        </div>
        <div class="content">
          <p>{{item.nickname}}</p>
          <span>{{item.create_date | time}}</span>
        </div>
        <div class="right">
          <van-button type="info" @click="unfollow(item.id)" round size="small">关注取消</van-button>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
export default {
  created () {
    this.getFollowList()
  },
  data () {
    return {
      followList: []
    }
  },
  methods: {
    async getFollowList () {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.followList = data
        console.log(this.followList)
      }
    },
    async unfollow (id) {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '确定要取消关注吗'
        })
      } catch {
        return this.$toast('取消操作')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('操作完成')
        this.getFollowList()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.item{
  display: flex;
  padding: 20px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar{

    img{
      width: 50px;
      height:50px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .content{
    flex: 1;
  font-size: 16px;
  span{
    color: #666;
  }

  }
  .right{
    text-align: right;
  }
}

</style>
