<template>
  <div class="login-container">
    <!-- 头部 -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 表单 -->
    <van-form
      @submit="onSubmit"
      ref="formRef"
    >
      <!-- 输入框 -->
      <van-cell-group>
        <!-- 手机号 -->
        <van-field
          v-model="mobile"
          placeholder="请输入手机号"
          type="number"
          :rules="mobileRule"
          name="mobile"
        >
          <i
            slot="left-icon"
            class="iconfont iconshouji"
          ></i>
        </van-field>
        <!-- 验证码 -->
        <van-field
          v-model="code"
          placeholder="请输入验证码"
          :rules="codeRule"
        >
          <i
            slot="left-icon"
            class="iconfont iconyanzhengma"
          ></i>
          <van-button
            slot="button"
            round
            class="send-sms-btn"
            native-type="button"
            v-if="smsBtn"
            @click="sendSms"
          >发送验证码</van-button>
          <van-count-down
            v-else
            slot="extra"
            :time="3000"
            format="ss s"
            @finish="smsBtn=true"
          />
        </van-field>

      </van-cell-group>
      <!-- 登录/注册按钮 -->
      <div class="login-btn-wrap">
        <van-button
          type="info"
          block
          class="login-btn"
        >登录</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
// 导入接口
import { login, getCode } from '@/api/user'
// 导入本地存取模块
import { setItem } from '@/utils/storage'

export default {
  // 组件名称
  name: 'LoginPage',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      // 手机号
      mobile: '13911111111',
      // 验证码
      code: '246810',
      // 手机验证
      mobileRule: [
        {
          pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[8])[0-9]{8}$/,
          message: '请输入正确内容'
        }
      ],
      // 验证码验证
      codeRule: [
        {
          pattern: /\d{6}/,
          message: '请输入正确内容'
        }
      ],
      // 控制验证码按钮显示隐藏
      smsBtn: true
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    // 登录
    async onSubmit() {
      try {
        // loading提示
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '登陆中...'
        })
        const { data } = await login({
          mobile: this.mobile,
          code: this.code
        })
        console.log(data)
        // 将数据存到本地
        setItem('token', data.data)

        // 登录成功提示
        this.$toast.success('登录成功')
        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        // 登录失败
        this.$toast.fail('登录失败，请稍后重试')
      }
    },
    // 发送验证码
    async sendSms() {
      // 校验手机号
      try {
        await this.$refs.formRef.validate('mobile')
      } catch (err) {
        // 验证失败
        return this.$toast.fail('请输入正确手机号')
      }
      // 隐藏按钮
      this.smsBtn = false
      try {
        // 发送请求
        await getCode(this.mobile)
        this.$toast.success('发送成功')
      } catch (err) {
        console.log(err.response)
        if (err.response && err.response.status === 429) {
          this.$toast.fail('请求次数过多，请稍后重试')
        } else {
          this.$toast.fail('发送失败，请稍后重试')
        }
      }
    }
  },
  created() {},
  mounted() {}
}
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    box-sizing: content-box;
    border: none;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
/deep/.van-icon {
  color: #ffffff;
}
</style>
