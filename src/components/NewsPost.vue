<template>
  <div class="news-post" @click="$router.push(`/post-detail/${post.id}`)">
    <!-- 视频 -->
    <div class="video-post" v-if="post.type===2">
      <div class="title">
        {{post.title}}
      </div>
      <div class="video">
        <span class="iconfont iconshipin"></span>
        <img :src="$url(post.cover[0].url)" alt="">
      </div>
       <div class="user">
         <span>{{post.user.nickname}}</span>
         &nbsp;&nbsp;
         <span>{{post.comment_length}}回复</span>
       </div>
    </div>
    <!-- 单图片 -->
    <div class="single-post" v-else-if="post.cover.length<3" >
     <div class="info">
       <div class="title">
         {{post.title}}
       </div>
       <div class="user">
         <span>{{post.user.nickname}}</span>
         &nbsp;&nbsp;
         <span>{{post.comment_length}}回复</span>
       </div>
     </div>
     <div class="img">
       <img :src="$url(post.cover[0].url)" alt="">
     </div>
   </div>
   <!-- 多图片 -->
    <div class="multiple-post" v-else >
      <div class="title">
        {{post.title}}
      </div>
      <div class="imgs">
         <img :src="$url(post.cover[0].url)" alt="">
         <img :src="$url(post.cover[1].url)" alt="">
         <img :src="$url(post.cover[2].url)" alt="">
      </div>
      <div class="user">
         <span>{{post.user.nickname}}</span>
         &nbsp;&nbsp;
         <span>{{post.comment_length}}回复</span>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  color: #666;
  font-size: 14px;
  span:first-child {
    margin-right: 10px;
  }
}
// 视频
.video-post{
   //  display: flex;
   padding: 10px;
   border-bottom: 1px solid #ccc;
  .title{
    font-size: 16px;
  }
  .video{
    padding: 10px 0;
    position: relative;
    span{
      position: absolute;
      width: 50px;
      height: 50px;
      font-size: 28px;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      line-height: 50px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, .5);
    }
    img{
      width: 100%;
      height: 170px;
      object-fit: cover;
    }
  }
}
// 单图片
.single-post{
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .info{
    flex: 1;
    font-size: 16px;
    display: flex;
    flex-direction: column;
   justify-content: space-between;

  }
  .img{
    img{
      width: 120px;
      height: 74px;
      object-fit: cover;
    }
  }
}
// 多图片
.multiple-post{
  //  display: flex;
   padding: 10px;
   border-bottom: 1px solid #ccc;
  .title{
    font-size: 16px;
  }
  .imgs{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    img{
      width: 114px;
    height: 74px;
    object-fit: cover;
    }
  }
}
</style>
