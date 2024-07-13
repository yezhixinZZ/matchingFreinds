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
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/join",{
    params:{
      searchText:val,
      pageNum:1,
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
</script>

<template>
  <van-search
      @search="onSearch"
      v-model="searchText"
      shape="round"
      background="#4fc08d"
      placeholder="搜索"
  />
  <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
    已加入队伍
  </van-divider>
  <div id="teamPage">
    <team-card-list :teamList="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="暂无相关队伍"></van-empty>
  </div>

</template>

<style scoped>
#teamPage {

}
</style>