<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
      <van-form @submit='register'>
  <van-field
    v-model="user.username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="rules.name "
  />
  <van-field
    v-model="user.nickname"
    name="昵称"
    label="昵称"
    placeholder="昵称"
    :rules="rules.nickname "
  />
  <van-field
    v-model="user.password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="rules.password"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">注册</van-button>
  </div>
  <p class="tips">已有账号？去<router-link to="/login">登录</router-link></p>

</van-form>

  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: '请填写用户名' },
          { pattern: /^\d{5,11}$/, message: '用户名长度必须是5~11位数字', trigger: onchange }],
        nickname: [{ required: true, message: '请填写昵称' },
          { pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '昵称长度必须是2~6汉字', trigger: onchange }],
        password: [{ required: true, message: '请填写密码' },
          { pattern: /^\d{3,9}$/, message: '用户名长度必须是3~9位数字', trigger: onchange }]

      }
    }
  },
  methods: {
    async register () {
      const res = await this.$axios.post('/register',
        this.user)
      console.log(res.data)
      console.log(this.user)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: this.user
        })
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
