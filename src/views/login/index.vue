<template>
  <div class="login-container">
    <el-form class="login-form" ref="login-form" :model="user" :rules="formRoules">
      <!-- logo开始 -->
      <div class="logo-form">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-mofang"></use>
          <span class="logo-title">川式炸匠铺后台管理系统</span>
        </svg>
        <span class="logo-title">川式炸匠铺后台管理系统</span>
      </div>
      <!-- logo结束 -->
      <!-- 手机号开始 -->
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
          prefix-icon="el-icon-mobile-phone"
        >
        </el-input>
      </el-form-item>
      <!-- 手机号结束 -->
      <!-- 验证码开始-->
      <el-form-item prop="code">
        <el-input
          v-model="user.code"
          placeholder="请输入验证码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <!-- 验证码结束-->
      <!-- 勾选协议开始 -->
      <el-form-item class="check-form" prop="agree">
        <el-checkbox v-model="user.agree"
          >我已阅读并同意协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <!-- 勾选协议结束 -->
      <el-form-item>
        <el-button
          class="form-btn"
          type="primary"
          @click="onLogin"
          :loading="loginLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login }from "@/api/user";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "13911111111", //手机号
        code: "246810", //验证码
        agree: false
      },
      loginLoading: false, //登录按钮的loading状态
      //验证规则
      formRoules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {pattern: /^1[3|5|7|8|9]\d{9}$/,message: "请输入正确的号码格式",trigger: "change",}
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "change" },
          { pattern: /^\d{6}$/, message: "请输入正确的验证码格式" }
        ],
        agree: [
          {
            // 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze

            // 验证通过：callback()

            // 验证失败：callback(new Error('错误消息'))

            validator: (rule, value, callback) => {
              if (value) {
                callback();
              } else {
                callback(new Error("请同意用户协议"));
              }
            },

            // message: '请勾选同意用户协议',

            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onLogin() {
      //获取表单数据
      //const user = this.user;
      //表单验证
          this.$refs['login-form'].validate(valid => {

    // 如果表单验证失败，停止请求提交

    if (!valid) {

      return

    }
            this.login()
        })
      
    },
    login(){
        //验证通过--提交
      this.loginLoading = true; //开启loading
      
        login(this.user).then( res =>{
          //处理后端响应结果 成功：xxx
          
          this.$message({
            message: "登录成功！",
            type: "success",
          })
          this.loginLoading = false; //关闭loading
          //将接口返回的用户相关数据储存到本地相关存储，方便应用数据共享
          window.localStorage.setItem('user', JSON.stringify(res.data.data))

          this.$router.push({
            name: 'home'
          })
        })
        .catch(err => {
          //处理后端响应结果 失败：xxx
          console.log("登录失败", err);
          this.$message.error("登录失败！手机号或验证码错误！");
          this.loginLoading = false; //关闭loading
        });
    }
  },
};
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(./login_bg.jpg) no-repeat;
  background-size: cover;
  .login-form {
    background: #fff;
    padding: 22px 50px 22px 50px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .logo-form {
      margin-bottom: 22px;
    }
    .form-btn {
      width: 100%;
    }
  }
  .logo-title {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    font-size: 21px;
    color: rgb(40, 47, 99);
  }
  .icon {
    font-size: 40px;
    width: 1em;
    height: 1em;
    vertical-align: -0.3em;
    fill: currentColor;
    overflow: hidden;
    padding-right: 10px;
  }
}
</style>
