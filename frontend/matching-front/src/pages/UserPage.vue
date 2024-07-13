<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import 'vant/es/toast/style'
const router = useRouter();
const user = ref();

onMounted( async () => {
  user.value = await getCurrentUser();

})

import {getCurrentUser} from "../services/user.ts";

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
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="账号信息" is-link to="/user/update" />
    <van-cell title="已创建队伍" is-link to="/user/team/create" />
    <van-cell title="已加入队伍" is-link to="/user/team/join" />

  </template>

</template>

<style scoped>

</style>