<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from "vue-router";

const searchText = ref('');
const router = useRouter()

const onSearch = () => {
  tagList.value = originTagList.map(parentTag => {
        const tempChildren = [...parentTag.children];
        const tempParentTag = {...parentTag};
        tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
        return tempParentTag;
    });
};

//执行搜索
const doSearchResult = () => {
 router.push({
   path:'/user/list',
   query: {
      tags:activeIds.value
   }
 })
}

const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

//移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag
  })
}

//已选中标签
const activeIds = ref([]);
const activeIndex = ref(0);

//标签列表
const originTagList = [{
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: "女" },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大四', id: '大四' },
    ],
  },
];

let tagList = ref(originTagList);


</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入相关标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">已选择</van-divider>

  <van-row justify="center" v-if="activeIds.length === 0">
    暂未选择
  </van-row>
  <!-- 设置垂直间距 -->
  <van-row justify="center">
      <van-tag v-for="tag in activeIds"  closeable size="large" type="primary" @close="doClose(tag)">{{ tag }}</van-tag>
  </van-row>



  <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">请选择</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <div style="padding: 12px;">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>


</template>

<style scoped>

</style>