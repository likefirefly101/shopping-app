<template>
  <div class="login">
    <!-- 头部navbar -->
    <van-nav-bar title="登录" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <!-- 主体 -->

    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img @click="getPicCode" v-if="picUrl" :src="picUrl" alt="加载中...">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getMessageCode">
            {{ currentSecond === second ? '获取验证码' : currentSecond + '秒后重新发送'}}
          </button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, login } from '@/api/login' // 导入登录接口(全局的getPicCode，与login.js文件中的getPicCode不冲突)
import { Toast } from 'vant'

export default {
  name: 'LoginPage',
  data () {
    return {
      picCode: '', // 图形验证码
      mobile: '', // 手机号码
      picKey: '', // 图形验证码唯一标识
      second: 60, // 倒计时
      currentSecond: 60, // 当前计时
      picUrl: '', // 图形验证码base64
      timer: null, // 计时器
      msgCode: '' // 短信验证码
    }
  },
  async created () {
    this.getPicCode()
  },
  mounted () {
    console.log('1. mounted 钩子已执行')
  },
  destroyed () {
    clearInterval(this.timer) // 销毁计时器
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key

      Toast('验证码刷新成功')
    },
    // 校验手机号码与图形验证码
    validate () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        Toast('请输入正确的手机号码')
        return false
      }
      if (!/^\w{4}/.test(this.picCode)) {
        Toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    async getMessageCode () {
      // 校验手机号码与图形验证码
      if (!this.validate()) {
        return
      }

      // 倒计时
      if (!this.timer && this.currentSecond === this.second) {
        // 发送短信验证码
        await getMsgCode(this.mobile, this.picCode, this.picKey)
        // alert(res.message)
        Toast('验证码发送成功')
        this.currentSecond--
        this.timer = setInterval(() => {
          this.currentSecond--
          if (this.currentSecond <= 0) {
            clearInterval(this.timer)
            this.currentSecond = this.second
            this.timer = null // 停止计时器
          }
        }, 1000)
      }
    },

    async login () {
      console.log('111')
      if (!this.validate()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        Toast('请输入正确的短信验证码')
        return
      }

      const res = await login(this.mobile, this.msgCode)
      // alert(res.message)
      this.$store.commit('user/SET_USER_INFO', res.data)
      Toast('登录成功')
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less">
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
