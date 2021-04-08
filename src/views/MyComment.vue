<template>
  <div class="my-comment">
    <hm-header>我的评论</hm-header>
    <div class="list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check='false'
        finished-text="我真的没有了"
        @load="onLoad"
      >
         <div class="item" v-for="item in commentList" :key="item.id">
        <div class="time">
         {{item.create_date| time('YYYY-MM-DD hh:mm')}}
        </div>
        <div class="comment" v-if="item.parent">
          <div class="name"> 回复: {{item.parent.user.nickname}}</div>
          <div class="comment_content">
            {{item.parent.content}}
          </div>
        </div>
        <div class="content">
         {{item.content}}
        </div>
        <div class="origin txt-cut one-txt-cut">
          {{item.post.title}}
        </div>
      </div>
      </van-list>
      </van-pull-refresh>

    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.getCommentList()
  },
  data () {
    return {
      commentList: [],
      pageIndex: 1,
      pageSize: 6,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getCommentList () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = [...this.commentList, ...data]
        console.log(this.commentList)
      }
      this.loading = false
      this.refreshing = false

      if (data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.getCommentList()
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        // console.log('刷新了')
        this.commentList = []
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.finished = false
        this.pageIndex = 1
        this.getCommentList()
      }, 1000)
    }
  }

}
</script>

<style lang="less" scoped>
.item{
  padding: 15px;
  border-bottom: 1px solid #888;
  .time{
    padding: 10px 0;
    font-size: 14px;
    color: #666;
  }
  .content{
    font-size: 18px;
    padding: 10px 0;
  }
  .origin{
    font-size: 14px;
    color: #666;
  }
  .comment{
    padding: 10px;
    background-color: #eee;
    font-size: 16px;
    color: #666;
    .name{
      font-size: 14px;
      padding: 5px 0;
    }
  }
}
</style>
