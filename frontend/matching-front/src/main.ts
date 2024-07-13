import { createApp } from 'vue'
import App from './App.vue'
import {Button, Col, Icon, NavBar, Row, Swipe, SwipeItem, Tabbar, TabbarItem, ImagePreview,Toast} from "vant";
import * as VueRouter from 'vue-router';
import routes from "./config/route.ts";




const app = createApp(App)
app.use(Button)
app.use(NavBar)
app.use(Icon)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Col);
app.use(Row);
app.use(Swipe);
app.use(SwipeItem);
app.use(ImagePreview);
app.use(Toast);

const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router)

app.mount('#app')




