<template>
  <!--登录组件-->
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <!--<a href="javascript:;" class="on">短信登录</a>-->

          <!--2、导航切换效果的判断-->
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
          <!--2、导航切换效果的判断-->

          <!--<a href="javascript:;">密码登录</a>-->
        </div>
      </div>
      <div class="login_content">
        <!--@submit.prevent阻止默认事件提交-->
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification"
                      :class="{right_phone:rightPhone}" @click.prevent="getCode">
                {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}
              </button>
                          <!--@click.stop 阻止事件冒泡 。@click.prevent 阻止事件的默认行为，-->
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" @click="showPwd=!showPwd" :class="showPwd?'on':'off'">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <!--src="http://localhost:4000/captcha"-->
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
                <!--<img class="get_verification" src="./images/captcha.svg" alt="captcha">-->
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont iconzuojiantou"></i>
      </a>
    </div>

    <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"></AlertTip>
  </section>
</template>

<script>
// 1、引入弹出框组件
import AlertTip from '../../components/AlertTip/AlertTip'
// 从api文件模块的index.js中引入ajax事件reqPwdLogin、reqSendCode、reqSmsLogin
import {reqSendCode, reqPwdLogin, reqSmsLogin} from '../../api'
export default {
  data () {
    return {
      // 1、导航切换效果的判断
      loginWay: true, // true代表短信登录，false代表密码登录
      computeTime: 0,
      showPwd: false, // 是否显示密码
      phone: '', // 初始化手机号
      code: '', // 短信验证码
      name: '', // 密码登录的名字
      pwd: '', // 密码
      captcha: '', // 密码登录的图形验证码
      alertText: '', // 提示文本
      showAlert: false // 是否显示提示框
    }
  },
  // 映射成HTML标签
  components: {
    AlertTip
  },
  computed: { // 计算属性
    rightPhone () { // 返回正则验证是否成功
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    // 点击按钮获取动态图片验证码
    // getCaptcha(event){
    getCaptcha () {
      // 动态改变img的src：当地址不变时img是不会请求的，所以加上Date.now()
      // Date.now():获取当前的时间
      // event.target.src = 'http://localhost:4000/captcha?time='+Date.now()
      // 通过给img标签添加ref属性获得方法
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    },
    async getCode () {
      // 如果当前没有计时
      // if(this.computeTime==0){
      if (!this.computeTime) {
        // 启动倒计时
        this.computeTime = 5
        this.intervalId = setInterval(() => {
          if (this.computeTime <= 0) {
            clearInterval(this.intervalId)
          } else {
            this.computeTime--
          }
        }, 1000)
        // 发送ajax请求（向手机发送验证码短信）
        const result = await reqSendCode(this.phone)
        if (result.code === 1) { // 发送短信失败
          this.showAlerts(result.msg)// 失败弹出提示框
          if (this.computeTime > 0) { // 当 倒计时间大于0时
            this.computeTime = 0// 将当倒计时间设置为0
            clearInterval(this.intervalId)// 停止倒计时
            this.intervalId = undefined// 释放内存
          }
        }
      }
    },
    // 显示弹出框事件
    showAlerts (alertText) {
      this.showAlert = true
      this.alertText = alertText
    },
    // 关闭弹出框事件
    closeTip () {
      this.showAlert = false
      this.alertText = ''
    },
    // 登录事件
    async login () {
      let result
      // 前台表单验证
      if (this.loginWay) { // true代表短信登录
        const {rightPhone, phone, code} = this // 获取phone与code的值
        if (!rightPhone) {
          // 提示手机号格式不对
          this.showAlerts('手机号格式不对')
          return
        } else if (!/^\d{6}$/.test(code)) {
          // 提示验证码必须为6为数字
          this.showAlerts('验证码必须为6为数字')
          return
        }
        // 发送短信登录ajax事件
        result = await reqSmsLogin(phone, code)
      } else { // false代表密码登录
        const {name, pwd, captcha} = this
        if (!name) {
          // 用户名不能为空
          this.showAlerts('用户名不能为空')
          return
        } else if (!pwd) {
          // 密码不能为空
          this.showAlerts('密码不能为空')
          return
        } else if (!captcha) {
          // 图形验证码不能为空
          this.showAlerts('验证码不能为空')
          return
        }
        // 发送密码登录ajax事件
        result = await reqPwdLogin(name, pwd, captcha)
      }
      // 停止定时器
      if (this.computeTime) { // 当倒计时间大于0时
        this.computeTime = 0// 将当倒计时间设置为0
        clearInterval(this.intervalId)// 停止倒计时
        this.intervalId = undefined// 释放内存
      }
      // 统一判断短信登录与密码登录
      if (result.code === 0) { // 登录成功
        // 将user保存在vuex的state中
        const user = result.data
        // vuex方法调用第一种最简单。来调取store里的actions.js的recordUser方法，从而要更新数据。
        this.$store.dispatch('recordUser', user)
        this.$router.replace('/Profile')
      } else { // 登录失败
        // 显示新的图片验证码
        this.getCaptcha()
        this.showAlerts(result.msg)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
