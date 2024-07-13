<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import myAxios from "../plugins/myAxios.ts";
import UserCardList from "../components/UserCardList.vue";
import {showFailToast, showSuccessToast} from "vant";
import {UserType} from "../models/user";

const isMatchMode = ref<boolean>(false)

const userList = ref([]);
const loading = ref<boolean>(true);

const loadData = async () => {
  let userListData;
  loading.value = true;
  if (isMatchMode.value){
    //心动模式
    const num = 5;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/recommend success', response);
          //showSuccessToast('请求成功');
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          showFailToast('请求失败');
        })
  } else {
    //普通推荐模式
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend success', response);
          //showSuccessToast('请求成功');
          return response?.data?.records;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          showFailToast('请求失败');
        })
  }
  if (userListData){
    userListData.forEach((user:UserType) => {
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}
watchEffect(() => {
  loadData();
})
defineExpose({userList});
</script>

<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" />
    </template>
  </van-cell>

<user-card-list :user-list="userList" :loading="loading"/>

  <van-empty v-if="!userList || userList.length < 1" description="暂无相关用户"></van-empty>
</template>

<style scoped>

</style>