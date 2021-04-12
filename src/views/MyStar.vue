<template>
  <div class="my-star">
   <hm-header>我的收藏</hm-header>
   <div class="item" v-for="item in list" :key="item.id">
     <div class="info">
       <div class="title">
         {{item.title}}
       </div>
       <div class="user">
         <span>{{item.user.nickname}}</span>
         &nbsp;&nbsp;
         <span>{{item.comments.length}}回复</span>
       </div>
     </div>
     <div class="img">
       <img :src="$url(item.cover[0].url)" alt="">
     </div>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getStarList()
  },
  methods: {
    async  getStarList () {
      const res = await this.$axios.get('/user_star')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.item{
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .info{
    flex: 1;
    font-size: 16px;
    display: flex;
    flex-direction: column;
   justify-content: space-between;
   .user{
     font-size: 14px;
     color:  #666;
   }
  }
  .img{
    img{
      width: 120px;
      height: 74px;
      object-fit: cover;
    }
  }
}
</style>
