<template>
  <div class="home">
   <div class="header">
     <div class="logo">
       <span class="iconfont iconnew"></span>
     </div>
     <div class="search">
       <div class="search-box">
         <span class="iconfont iconsearch"></span>
         <span>搜索新闻</span>
       </div>
     </div>
     <div class="user" @click="$router.push('/user')">
       <span class="iconfont iconwode"></span>
     </div>
   </div>

   <div class="tab">
      <van-sticky class="more-sticky" >
      <div class="more" @click="$router.push('/manage')">
        <span class="iconfont iconlianjie"></span>
      </div>
    </van-sticky>

     <van-tabs sticky swipeable  v-model="active">
        <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
           <news-post v-for="item in newsList " :key="item.id" :post='item' ></news-post>
          </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      tabList: [],
      newsList: [],
      pageIndex: 1,
      pageSize: 7,
      loading: false,
      finished: false,
      refreshing: false

    }
  },
  created () {
    this.getTabList()
  },
  watch: {
    active (val) {
      // console.log(val)
      this.newsList = []
      this.pageIndex = 0
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getNewsList(this.tabList[val].id)
      })
    }
  },
  methods: {
    async getTabList () {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabList = activeList
        this.getNewsList(this.tabList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        this.getNewsList(this.tabList[0].id)
      }
    },
    async getNewsList (id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize

        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        if (this.pageIndex === 1) {
          this.newsList = []
        }
        this.newsList = [...this.newsList, ...data]
        console.log(this.newsList)
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      setTimeout(() => {
        console.log('需要加载更多了')
        // 加载下一页数据
        this.pageIndex++
        this.getNewsList(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh () {
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getNewsList(this.tabList[this.active].id)
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.home{
  .header{
    display: flex;
    align-items: center;
    text-align: center;
    height: 50px;
    width: 100%;
    background-color: #ff0000;
    color: #fff;
    .logo,
    .user{
      width: 70px;
    }
    .logo{
      span{
        font-size: 50px;
      }
    }
    .user{
      span{
        font-size: 24px;
      }
    }
    .search{
      flex: 1;
      .search-box{
        width: 210px;
        height: 34px;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 17px;
        line-height: 34px;
        span{
          font-size: 16px;
        }

      }
    }
  }
  /deep/.van-tabs__wrap{
    width: 87%;
  }
  .more{
    width: 13%;
    height: 45px;
    position: absolute;
    right: 0;
     line-height: 45px;
     text-align: center;
     background-color: #fff;
    z-index: 999;

  }
  .more-sticky {
    /deep/.van-sticky{
      z-index: 100;
    }
  }
}
</style>
