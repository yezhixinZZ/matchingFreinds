<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请填写队伍名'}, {validator: value => value.length <= 20, message: '队伍名不超过 20 个字符'}]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="3"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
            :rules="[{validator: value => value.length <= 512, message: '队伍描述不超过 512 个字符'}]"
        />
        <van-field
            v-model="showDateTime"
            is-link
            readonly
            label="过期时间"
            placeholder="请选择过期时间"
            @click="showPicker = true"
            :rules="[{validator: value => Date.now() < new Date(addTeamData.expireTime).getTime(), message: '过期时间必须晚于当前时间'}]"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker-group
              title="过期时间"
              :tabs="['选择日期', '选择时间']"
              next-step-text="下一步"
              @confirm="onConfirm"
              @cancel="showPicker = false"
          >
            <van-date-picker
                v-model="expireDate"
                :min-date="nowDate"
            />
            <van-time-picker v-model="expireTime" />
          </van-picker-group>
        </van-popup>

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码'}, {validator: value => value.length <= 32, message: '密码不超过 32 个字符'}]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          确认
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
//@ts-nocheck
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {formatDateTime} from "../services/datetime.ts";


const router = useRouter();
const route = useRoute();
//需要用户填写的数据
const addTeamData = ref({});
//获取之前的队伍信息
onMounted(async () => {
  if (id <= 0){
    showFailToast('获取队伍信息失败');
    return;
  }
  const res = await myAxios.get('/team/get',{
    params: {
      id,
    }
  });
  if (res?.code === 0){
    addTeamData.value = res.data;
  }else {
    showFailToast('获取队伍信息失败')
  }
})
const nowDate = new Date();
const expireDate = ref(['', '', '']);
const expireTime = ref(['', '']);
const showPicker = ref(false);
const showDateTime = ref('');
const id = route.query.id;

const onConfirm = () => {
  addTeamData.value.expireTime =  `${expireDate.value.join('-')} ${expireTime.value.join(':')}`;
  showDateTime.value = formatDateTime(addTeamData.value.expireTime);
  showPicker.value = false;
};

const onSubmit = async () => {
  let teamPostData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
    expireTime: new Date(addTeamData.value.expireTime)
  };

  const res = await myAxios.post('/team/update', teamPostData);
  if (res['code'] === 0 && res.data) {
    showSuccessToast('修改成功');
    router.push({
      path: '/team',
      replace: true
    })
  } else {
    showFailToast('修改失败');
  }
}
</script>

<style scoped>

</style>