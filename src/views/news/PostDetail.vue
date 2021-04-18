<template>
  <div class="post-detail">
    <div class="header">
      <div class="back" @click="$router.go(-1)">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title">
        <span class="iconfont iconnew">
        </span>
      </div>
      <div class="follow">
        <div class="onfollow" v-if="post.has_follow" @click="unfollow" >已关注</div>
        <div class="nofollow" v-else @click="follow" >关注</div>
      </div>
    </div>
    <div class="content"  >
      <div class="title">
        <h5>{{post.title}}</h5>
      </div>
      <div class="user">
        <span>{{post.user.nickname}}</span>
        <span>{{post.create_date | time}}</span>
      </div>
      <div class="post-content" v-html="post.content"  v-if="post.type === 1"></div>
      <video :src="post.content" v-else controls></video>
          <div class="share-good">
        <div class="goods" :class="{active: post.has_like}" @click="like">
          <span class="iconfont icondianzan"></span>
          &nbsp;<span>{{post.like_length || 0}}</span>
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>
          &nbsp;<span>微信</span>
        </div>
      </div>

      </div>

      <!-- 评论区域  -->
    <div class="comment-list">
      <h3>精彩跟贴</h3>
      <hm-comment :comment='comment' v-for="comment in commentList" :key="comment.id"></hm-comment>
    </div>

    <!-- 底部区域 -->
    <div class="footer-textrea" v-if="isshowTextarea">
      <textarea :placeholder="'回复:' + nickname
       " v-model="content" @blur="onBlur" ref="textarea"></textarea>
      <van-button type="info" @click="pubilsh">发送</van-button>
    </div>
    <div class="footer-text" v-else>
      <div class="search">
        <input type="text"  @focus='onFocus' placeholder="回复">
      </div>
      <span class="iconfont iconpinglun-"><i>{{post.comment_length}}</i></span>
      <span class="iconfont iconshoucang" :class="{now: post.has_star}" @click="star"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.getInfo()
    this.getCommentList()
    // bus事件
    this.$bus.$on('reply', this.onReply)
  },
  destroyed () {
    this.$bus.$off('reply', this.onReply)
  },
  data () {
    return {
      post: {
        user: {}
      },
      commentList: [],
      isshowTextarea: false,
      content: '',
      replyId: '',
      nickname: ''
    }
  },
  methods: {
    // 获取文章详情
    async getInfo () {
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        console.log(this.post)
      }
    },
    // 获取评论列表
    async getCommentList () {
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post_comment/${id}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    },
    // 判定是否登录
    noLogin () {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return true
      } else {
        return false
      }
    },
    // 关注用户
    async follow () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('已关注')
        this.getInfo()
      }
    },
    // 取关某用户
    async unfollow () {
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取消关注')
        this.getInfo()
      }
    },
    // 点赞
    async like () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      if (res.data.statusCode === 200) {
        this.getInfo()
      }
    },
    // 收藏
    async star () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      if (res.data.statusCode === 200) {
        this.getInfo()
      }
    },
    // 底部回复
    async onFocus () {
      this.isshowTextarea = true

      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    onBlur () {
      if (!this.content) {
        this.isshowTextarea = false
        this.nickname = ''
        this.replyId = ''
      // this.content = ''
      }
    },
    async pubilsh () {
      if (this.content.trim() !== '') {
        const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
          content: this.content,
          parent_id: this.replyId
        })
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          this.content = ''
          this.replyId = ''
          this.nickname = ''
          this.isshowTextarea = false
          this.getInfo()
          this.getCommentList()
        }
      } else {
        return this.$toast('回复不能为空')
      }
    },
    async onReply (id, nickname) {
      console.log(id, nickname)
      this.isshowTextarea = true
      await this.$nextTick()
      this.$refs.textarea.focus()
      this.nickname = '@' + nickname
      this.replyId = id
    }

  }
}
</script>

<style lang='less' scoped>
.header{
  display: flex;
  padding:0 10px;
  border-bottom: #ccc 1px solid;
  align-items: center;
  .title{
    flex: 1;
    margin-left:10px ;
    .iconnew{
      font-size: 50px;
    }
  }
  .onfollow{
    width: 60px;
    height: 24px;
    font-size: 14px;
    border: 1px solid #666;
    text-align: center;
    line-height: 24px;
    border-radius: 12px;

  }
  .nofollow{
      width: 60px;
      height: 24px;
      font-size: 14px;
      background-color: red;
      border: 1px solid red;
      color: #fff;
       text-align: center;
    line-height: 24px;
    border-radius: 12px;
    }
}
.content{

  padding: 10px;
  border-bottom: 3px #ccc solid;
  .post-content{
  font-size: 16px;

  }
  video{
    width: 100%;
  }
  .user{
    padding: 10px 0;
    font-size: 14px;
    color: #666;
  }
  span:last-child{
    // text-indent: 2em;
    margin-left: 10px;
  }
  /deep/img{
    width: 100%;
  }
  .share-good{
    padding: 30px;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    .goods,
    .share{
      width: 80px;
      height: 30px;
      border: 1px solid #666;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
      .iconweixin{
        color: chartreuse;
      }

    }
    .active{
      color: red;
      border: 1px solid red;

    }
  }

}
.comment-list{
  h3{
    text-align: center;
    padding: 10px;
  }
}
.footer-text{
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  .iconfont {
    font-size: 24px;
  }
  .now {
    color: red;
  }
  .iconpinglun- {
    position: relative;
    i {
      position: absolute;
      right: 0;
      top: 0;
      background-color: red;
      font-size: 10px;
      color: #fff;
      padding: 0 3px;
      right: -5px;
      border-radius: 5px;
      font-style: normal;
    }
  }
  .search {
    width: 180px;
    padding-right: 10px;
    input {
      height: 30px;
      background-color: #ddd;
      border-radius: 15px;
      width: 100%;
      border: none;
      font-size: 14px;
      padding-left: 20px;
    }
  }
}
.footer-textrea{
  width: 100%;
  height:100px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  border-top: 1px #ccc solid;
  background-color: #fff;
  z-index: 999;
  textarea{
    width: 260px;
    height: 80px;
    padding: 10px;
    font-size: 14px;
    text-indent: 1.5em;
    border-radius: 10px;
    background-color: #ccc;
    border: none;
  }
}
.post-detail{
  padding-bottom: 100px;
}

/deep/.ql-video{
  width: 100%;
}
</style>
