<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import ferrari from '../assets/ferrari1.png'
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {getCurrentUser} from "../services/user.ts";
interface TeamCardListProps {
  teamList: TeamType[];
}
const props = withDefaults(defineProps<TeamCardListProps>(),{
  // @ts-ignore
  teamList: [] as TeamType[]
});
//加入队伍
const doJoinTeam = async () => {
  if (!joinTeamId.value){
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value,
  });
  if (res?.code === 0){
    showSuccessToast('加入成功');
    doJoinCancel();
    window.location.reload()
  }else {
    showFailToast('加入失败\n' + (res.description ? `${res.description}` : ''));
  }
}
const router = useRouter();
/**
 * 跳转至更新队伍页
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path:"/team/update",
    query: {
      id,
    }
  })
}
/**
 * 退出队伍
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0){
    showSuccessToast('操作成功');
    window.location.reload()
  }else {
    showFailToast('操作失败\n' + (res.description ? `${res.description}` : ''));
  }
}
/**
 * 解散队伍（删除）
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  });
  if (res?.code === 0){
    showSuccessToast('操作成功');
    window.location.reload()
  }else {
    showFailToast('操作失败\n' + (res.description ? `${res.description}` : ''));
  }
}
const currentUser = ref();
const showPasswordDialog = ref(false);
const joinTeamId = ref();
const password = ref('');
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})
const preJoinTeam = (team:TeamType) => {
    joinTeamId.value = team.id;
    if(team.status === 0){
      doJoinTeam()
    }else {
      showPasswordDialog.value = true;
    }
}
const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}
</script>

<template>
    <van-card
        style="height: calc(100% - 50px)"
        v-for="team in props.teamList"
        :tag="teamStatusEnum[team.status] "
        :thumb="ferrari"
        :desc="team.description"
        :title="`${team.name}`"
    >

      <template #tags>

      </template>

      <template #bottom>
        <div>
          {{`队伍人数:${team.hasJoinNum}/${team.maxNum}`}}
        </div>
        <div>
          {{'创建时间:' + team.createTime}}
        </div>
        <div v-if="team.expireTime">
          {{'过期时间:' + team.expireTime}}
        </div>
        <div class="button-wrapper" style="position: absolute; right: 10px; bottom: 10px;"> <!-- 调整right和bottom值来定位 -->
          <div class="button-container">
            <div>
              <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" plain size="mini" type="primary"
                          @click="preJoinTeam(team)">加入
              </van-button>
              <van-button v-if="team.userId === currentUser?.id" plain size="mini" type="warning"
                          @click="doUpdateTeam(team.id)">设置
              </van-button>
            </div>
            <div>
              <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" plain size="mini" type="danger"
                          @click="doQuitTeam(team.id)">退出
              </van-button>
              <van-button v-if="team.userId === currentUser?.id" plain size="mini" type="danger"
                          @click="doDeleteTeam(team.id)">解散
              </van-button>
            </div>
          </div>
        </div>
      </template>
    </van-card>

    <van-dialog v-model:show="showPasswordDialog" title="密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" type="password" left-icon="lock" placeholder="请输入密码"/>
    </van-dialog>


</template>

<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}
::v-deep .van-card__thumb {
  margin-top: 3px; /* 你可以根据需要调整这个值 */
}
</style>