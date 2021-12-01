<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-title">后台管理系统</div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
      >
        <el-form-item prop="username">
          <el-input
            v-model.trim="loginForm.username"
            placeholder="请输入用户名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="loginForm.password"
            placeholder="请输入密码"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button type="primary" @click="submitForm">
          登录
        </el-button>
      </div>
      <span class="icon icon-l-t"></span>
      <span class="icon icon-r-t"></span>
      <span class="icon icon-l-b"></span>
      <span class="icon icon-r-b"></span>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { reactive, ref, toRefs } from 'vue'

import { login } from '@/api/user'
export default {
  name: 'Login',
  setup() {
    const state = reactive({
      loginForm: {
        username: 'admin',
        password: '123456'
      }
    })
    const loginRules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ]
    }
    const loginFormRef = ref(null)
    const submitForm = () => {
      loginFormRef.value.validate((valid) => {
        if (valid) {
          login({
            username: state.loginForm.username,
            password: state.loginForm.password
          }).then((res) => {
            console.log(res, '打印数据')
          })
          ElMessage.success('登录成功')
        } else {
          return false
        }
      })
    }
    return {
      ...toRefs(state),
      loginFormRef,
      loginRules,
      submitForm
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 2px solid #5270fd;
    padding: 30px;
    width: 400px;
    box-sizing: border-box;
    transform: translate(-50%, -50%);

    .login-title {
      margin-bottom: 10px;
      width: 100%;
      font-size: 20px;
      text-align: center;
      color: #ffffff;
      line-height: 50px;
    }

    .login-btn {
      text-align: center;

      button {
        margin-bottom: 10px;
        width: 100%;
        height: 36px;
      }
    }

    .icon {
      position: absolute;
      width: 20px;
      height: 20px;
    }

    .icon-l-t {
      bottom: -3px;
      left: -3px;
      border-bottom: 3px solid #20a3f5;
      border-left: 3px solid #20a3f5;
    }

    .icon-l-b {
      top: -3px;
      left: -3px;
      border-top: 3px solid #20a3f5;
      border-left: 3px solid #20a3f5;
    }

    .icon-r-t {
      right: -3px;
      bottom: -3px;
      border-right: 3px solid #20a3f5;
      border-bottom: 3px solid #20a3f5;
    }

    .icon-r-b {
      top: -3px;
      right: -3px;
      border-top: 3px solid #20a3f5;
      border-right: 3px solid #20a3f5;
    }
  }
}
</style>
