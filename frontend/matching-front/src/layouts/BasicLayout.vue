<template>
  <div>
    <van-nav-bar
        v-if="showLayout"
        :title="title"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <div id="content">
      <router-view/>
    </div>

    <van-tabbar v-if="showLayout" route>
      <van-tabbar-item to="/" icon="wap-home" name="index">主页</van-tabbar-item>
      <van-tabbar-item to="/team" icon="friends" name="team">组队</van-tabbar-item>
      <van-tabbar-item to="/user" icon="contact" name="user">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, computed } from "vue";
import routes from "../config/route";

const router = useRouter();
const route = useRoute();
const DEFAULT_TITLE = 'Matching';
const title = ref(DEFAULT_TITLE);

const showLayout = computed(() => {
  return route.meta.requiresLayout !== false;
});

router.beforeEach((to, from, next) => {
  const toPath = to.path;
  const routeConfig = routes.find((route) => {
    return toPath === route.path;
  });
  title.value = routeConfig?.title ?? DEFAULT_TITLE;
  next();
});

const onClickLeft = () => {
  router.back();
};

const onClickRight = () => {
  router.push('/search');
};
</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
