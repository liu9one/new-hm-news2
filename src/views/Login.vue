<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit='login'>
  <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="user.name "
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="user.password"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">登录</van-button>
  </div>
  <p class="tips">没有账号? <router-link to='/register'>去注册</router-link></p>
</van-form>
  </div>
</template>

<script>
import HmHeader from '../components/HmHeader.vue'
import HmLogo from '../components/HmLogo.vue'

export default {

  components: { HmHeader, HmLogo },

  created () {
    // console.log(this.$route)
    const { password, username } = this.$route.params
    this.username = username
    this.password = password
  },
  data () {
    return {

      username: '',
      password: '',
      user: {
        name: [{ required: true, message: '请填写用户名' },
          { pattern: /^\d{5,11}$/, message: '用户名长度必须是5~11位数字', trigger: onchange }],
        password: [{ required: true, message: '请填写密码' },
          { pattern: /^\d{3,9}$/, message: '用户名长度必须是3~9位数字', trigger: onchange }]

      }
    }
  },

  methods: {
    async login () {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        console.log(data)
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        this.$router.push({ path: '/user' })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.tips{
  font-size: 14px;
  text-align: right;
  padding-right: 20px;
  a{
     color: orange;
  }
}
</style>
