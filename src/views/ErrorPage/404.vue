<!--
 * @Author: Calvin
 * @Date: 2021-12-09 21:04:37
 * @FilePath: /src/views/ErrorPage/404.vue
 * @Description: 404页面
-->
<template>
  <div class="error-container">
    <div class="error-content">
      <img class="err-img" src="@/assets/images/404.png" alt="404" />

      <div class="err-tip">
        <div class="err-tip__headline">页面找不到......</div>
        <div class="err-tip__info">
          请检查您输入的网址是否正确，请点击以下按钮返回主页
        </div>
        <el-button type="primary" round @click="toHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  name: '404',
  setup() {
    const router = useRouter()
    const toHome = () => {
      router.push('/')
    }
    return {
      toHome
    }
  }
}
</script>
<style lang="scss" scoped>
.error-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;

  .err-img {
    width: 600px;
  }

  .err-tip {
    padding-top: 100px;
    text-align: right;

    &__headline {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
      color: #222222;
      line-height: 24px;
    }

    &__info {
      margin-bottom: 30px;
      font-size: 13px;
      color: grey;
      line-height: 21px;
    }
  }
}
</style>
