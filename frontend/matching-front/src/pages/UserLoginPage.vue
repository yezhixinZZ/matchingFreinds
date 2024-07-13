<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import 'vant/es/toast/style'
import myAxios from "../plugins/myAxios.ts";
import {showFailToast,showSuccessToast} from "vant";

const router = useRouter();
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/login',{
    userAccount:userAccount.value,
    userPassword:userPassword.value,
  })
  console.log(res,'用户登录');
  if (res.code === 0 && res.data){
    showSuccessToast('登录成功');
    //登陆后跳转到之前的页面
    const  redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  } else {
    showFailToast('账号或密码错误');
  }
};


</script>

<template>
  <div style="margin-top: 200px;background-color: bisque">
    <h1 style="text-align: center">登录</h1>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="userAccount"
            name="userAccount"
            label="账号"
            placeholder="请输入账号"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="userPassword"
            type="password"
            name="userPassword"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>

</style>



