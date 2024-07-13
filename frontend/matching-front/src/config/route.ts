
import Index from "../pages/IndexPage.vue";
import Team from "../pages/TeamPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserPage from "../pages/UserPage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";

//定义路由
const routes = [
    { path: '/', component: Index },
    { path: '/team', title: '队伍',component: Team },
    { path: '/team/add', title: '创建队伍',component: TeamAddPage },
    { path: '/team/update',title: '设置队伍', component: TeamUpdatePage },
    { path: '/user', title: '用户',component: UserPage },
    { path: '/user/update',title: '用户信息', component: UserUpdatePage },
    { path: '/user/team/join', title: '已加入队伍', component: UserTeamJoinPage },
    { path: '/user/team/create', title: '已创建队伍',component: UserTeamCreatePage },
    { path: '/search', title: '搜索',component: SearchPage },
    { path: '/user/list', title: '搜索',component: SearchResultPage },
    { path: '/user/edit', title: '编辑信息',component: UserEditPage },
    //{ path: '/user/login', title: '登录',component: UserLoginPage },
    { path: '/user/login', title: '登录', component: UserLoginPage, meta: { requiresLayout: false } },


]

export default routes