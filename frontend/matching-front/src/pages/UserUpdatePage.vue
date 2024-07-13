<script setup lang="ts">
import {onMounted, ref} from "vue";
import 'vant/es/toast/style'
const user = ref();
onMounted( async () => {
  user.value = await getCurrentUser();

})
import {useRouter} from "vue-router";
import {getCurrentUser} from "../services/user.ts";
const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query:{
      editKey,
      editName,
      currentValue,
    }
  })
}
const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};


</script>

<template>
  <template v-if="user">
    <van-cell title="头像" is-link to="/user/edit" :value="user.avatarUrl">
      <img style="height: 48px" :src="user.avatarUrl" />
    </van-cell>
    <van-cell title="昵称" is-link  :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号"    :value="user.userAccount" />
    <van-cell title="编号"    :value="user.planetCode" />
    <van-cell title="性别" is-link  :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="手机" is-link  :value="user.phone"  @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link  :value="user.email"  @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="注册时间" :value="formatDate(user.createTime)" />

  </template>

</template>

<style scoped>

</style>