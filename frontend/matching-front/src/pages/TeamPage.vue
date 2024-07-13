<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {ref} from "vue";

const router = useRouter();
const teamList = ref([]);
const offset = ref({ x: 300, y: 550 });
const searchText = ref('');
//跳转到加入队伍页
const doAddTeam = () => {
  router.push({
    path:"/team/add"
  })
}
const listTeam = async (val = '',status = 0) => {
  const res = await myAxios.get("/team/list",{
    params:{
      searchText:val,
      pageNum:1,
      status,
    },
  });
  if (res?.code === 0){
    teamList.value = res.data;
  }else {
    Toast.fail('加载失败');
  }
}


//页面加载时只触发一次
onMounted( () => {
  listTeam();
})
const onSearch = (val) => {
  listTeam(val);
};
//查询不同状态队伍
const active = ref('public');
const onTabChange = (name) => {
  if (name === 'public'){
    listTeam(searchText.value,0);
  }else {
    listTeam(searchText.value,2);
  }
}
</script>

<template>
  <van-search
      @search="onSearch"
      v-model="searchText"
      shape="round"
      background="#4fc08d"
      placeholder="搜索队伍"
  />
  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab title="公开" name="public"></van-tab>
    <van-tab title="加密" name="private"></van-tab>
  </van-tabs>

  <div id="teamPage">
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="暂无相关队伍"></van-empty>
  </div>

</template>

<style scoped>
#teamPage {

}
</style>