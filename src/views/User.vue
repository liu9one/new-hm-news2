<template>
  <div class="user">
    <div class="header">
      <div class="avatar">
        <img :src=' base + user.head_img' alt="">
      </div>
      <div class="content">
        <div class="info">
          <span v-if="user.gender ===1" class="iconfont iconxingbienan"></span>
          <span  v-else class="iconfont iconxingbienv"></span>
        <span class="name">{{user.nickname}}</span>
        </div>
        <div class="date">
         {{user.create_date|time}}
        </div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navitem to='/follow'>
      <template>我的关注</template>
      <template #content>关注的用户</template>
    </hm-navitem>
    <hm-navitem>
      <template >我的跟帖</template>
      <template #content>跟帖/回复</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的收藏</template>
      <template #content>文章/收藏</template>
    </hm-navitem>
    <hm-navitem to='/edit'>
      <template>设置</template>
      <template #content></template>
    </hm-navitem>
    <div class="logout">
      <van-button @click="logout" type="warning" block>退出</van-button>
    </div>

  </div>
</template>

<script>
export default {

  async created () {
    const userId = localStorage.getItem('userId')
    // console.log(token, userId)
    const res = await this.$axios.get(`/user/${userId}`
    )
    // console.log(res.data)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
      console.log(this.user)
    }
  },
  data () {
    return {
      user: ''
    }
  },
  computed: {
    base () {
      return this.$axios.defaults.baseURL
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '您确定要退出吗?'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$toast.success('已退出')
        this.$router.push('/login')
      } catch {

      }
    }
  }
}
</script>

<style scoped  lang='less'>
.header{
  display: flex;
  padding:20px;
  align-items: center;
  border-bottom: 3px solid #ccc;
  .avatar{
     width: 70px;
      height: 70px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;

    }
  }
  .content{
    flex: 1;
    padding-left: 15px;
    font-size: 18px;
    .date{
      margin-top: 7px;
      font-size: 14px;
      color: #aaa;
    }
    .iconxingbienan{
      color: skyblue;
    }
    .iconxingbienv{
      color: pink;
    }
  }

}
.logout{
  margin: 10px ;
}

</style>
