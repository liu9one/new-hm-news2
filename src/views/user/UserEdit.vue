<template>
  <div class="user-edit">
    <hm-header>用户编辑</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      <van-uploader :after-read="afterRead" />
    </div>
    <hm-navitem @click= 'showNickname'>
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </hm-navitem>
    <hm-navitem @click='showPassword'>
      <template>密码</template>
      <template #content>******</template>
    </hm-navitem>
    <hm-navitem @click ='showGender'>
      <template>性别</template>
      <template #content>{{user.gender===1? '男': '女'}}</template>
    </hm-navitem>

    <van-dialog v-model="nicknameShow" title="昵称" show-cancel-button @confirm='updateNickname'>
       <van-field v-model="nickname"  ref="nickname" placeholder="请输入昵称"  />
    </van-dialog>
    <van-dialog v-model="passwordShow" title="密码" show-cancel-button @confirm='updatePassword'>
       <van-field v-model="password"   ref="password" placeholder="请输入密码" />
    </van-dialog>
    <van-dialog v-model="genderShow" title="性别" show-cancel-button @confirm='updateGender'>
       <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>

    <div class="mask" v-show="cropperShow">
           <van-button class="cope" type="primary" @click="crop">确定</van-button>
      <van-button  class="cancel" type="primary">取消</van-button>
      <vue-cropper
      ref="cropper"
      :img='img'
      autoCrop
      fixed
      autoCropWidth='100px'
      autoCropHeight='100px'
      >
      </vue-cropper>
    </div>

  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      user: '',
      nickname: '',
      password: '',
      gender: '',
      nicknameShow: false,
      passwordShow: false,
      genderShow: false,
      cropperShow: false,
      img: ''
    }
  },
  methods: {
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`user/${userId}`)
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
        console.log(this.user)
      }
    },
    // 显示修改昵称框
    async showNickname () {
      this.nicknameShow = true
      this.nickname = this.user.nickname
      await this.$nextTick()
      this.$refs.nickname.focus()
    },
    // 显示密码框
    async  showPassword () {
      this.passwordShow = true
      this.password = this.user.password
      await this.$nextTick()
      this.$refs.password.focus()
    },
    // 显示性别框
    showGender () {
      this.genderShow = true
      this.gender = this.user.gender
    },
    // 更改昵称
    async updateNickname () {
      this.updateUser({ nickname: this.nickname })
    },
    // 更改密码
    async updatePassword () {
      this.updateUser({ password: this.password })
    },
    // 更改性别
    async updateGender () {
      this.updateUser({ gender: this.gender })
    },
    // 封装更改代码
    async updateUser (data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        this.$toast.success('修改完成')
        this.getUserInfo()
      }
    },
    // 判定图片类型
    isImg (name) {
      if (name.endsWith('.gif') || name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.jpeg')) {
        return true
      } else {
        return false
      }
    },
    // 更改头像
    afterRead (file) {
      // console.log(file)
      if (!this.isImg(file.file.name)) {
        return this.$toast('请上传图片')
      }
      if (file.file.size >= 20 * 50000) {
        return this.$toast('图片过大')
      }
      // const fd = new FormData()
      // fd.append('file', file.file)
      // const res = await this.$axios.post('/upload', fd)
      // const { statusCode, data } = res.data
      // if (statusCode === 200) {
      //   // console.log(data.url)
      //   this.updateUser({ head_img: data.url })
      // }
      this.cropperShow = true
      this.img = file.content
    },
    crop () {
      this.$refs.cropper.getCropBlob(async (blob) => {
        // do something
        console.log(blob)
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
        // console.log(data.url)
          this.updateUser({ head_img: data.url })
        }
        this.cropperShow = false
      })
    }
  }

}

</script>

<style lang="less" scoped>
.avatar{
  text-align: center;
  padding: 50px 0;
  position: relative;
  img{
    height: 100px;
    width:  100px;
    border-radius: 50%;
  }
  /deep/.van-uploader{
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    opacity:0;
  }
}
/deep/.van-dialog__content{
  padding: 10px;
}
.van-field{
  border: 1px solid #ccc;
}
.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  .cope,
  .cancel{
    position: fixed;
    z-index: 1;
    top: 0;
  }
  .cope{
    right: 0;
  }
}
</style>
