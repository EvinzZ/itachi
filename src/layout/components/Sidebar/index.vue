<template>
  <div :class="{ 'has-logo': showLogo }"
       :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
    <logo v-if="showLogo" :collapse="isCollapse" style="float: left; width: auto; margin: 0px 20px"/>
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
          :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
          :unique-opened="true"
          :active-text-color="theme"
          :collapse-transition="false"
          mode="vertical"
      >
        <sidebar-item
            v-for="(route, index) in sidebarRouters"
            :key="route.path + index"
            :item="route"
            :base-path="route.path"
        />
      </el-menu>
      <div class="navbar">
        <div class="right-menu">
          <template v-if="appStore.device !== 'mobile'">
            <header-search id="header-search" class="right-menu-item"/>

            <!--          <el-tooltip content="源码地址" effect="dark" placement="bottom">-->
            <!--            <ruo-yi-git id="ruoyi-git" class="right-menu-item hover-effect" />-->
            <!--          </el-tooltip>-->

            <!--          <el-tooltip content="文档地址" effect="dark" placement="bottom">-->
            <!--            <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />-->
            <!--          </el-tooltip>-->

            <!--                      <screenfull id="screenfull" class="right-menu-item hover-effect" />-->

            <!--          <el-tooltip content="布局大小" effect="dark" placement="bottom">-->
            <!--            <size-select id="size-select" class="right-menu-item hover-effect" />-->
            <!--          </el-tooltip>-->
          </template>
          <div class="avatar-container" style="margin-right: 0">
            <el-dropdown @command="handleCommand" class="right-menu-item hover-effect" trigger="click">
              <div class="avatar-wrapper" style="margin-top: 10px">
                <!--                <img-->
                <!--                    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F23%2F20210623123209_3fcf2.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1689731692&t=2576fa8a469c40c18356316b96c9c5d6"-->
                <!--                    class="user-avatar"/>-->
<!--                                <button class="user-avatar" style="background:none;border: none;width: auto;">-->
<!--                                  发布-->
<!--                                </button>-->
                <el-button :icon="Edit">发布</el-button>
<!--                <el-button type="primary" :icon="Edit" circle />-->
                <!--                <el-icon>-->
                <!--                  <caret-bottom/>-->
                <!--&lt;!&ndash;                  <el-icon-menu/>&ndash;&gt;-->
                <!--                </el-icon>-->
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <router-link to="/user/profile">
                    <el-dropdown-item>发布歌曲</el-dropdown-item>
                  </router-link>
                  <router-link to="/user/profile">
                    <el-dropdown-item>发布悬赏</el-dropdown-item>
                  </router-link>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="avatar-container">
            <el-dropdown @command="handleCommand" class="right-menu-item hover-effect" trigger="click">
              <div class="avatar-wrapper">
                <!--                          <img :src="userStore.avatar" class="user-avatar" />-->
                <img
                    src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F23%2F20210623123209_3fcf2.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1689731692&t=2576fa8a469c40c18356316b96c9c5d6"
                    class="user-avatar"/>
                <el-icon>
                  <caret-bottom/>
                </el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <router-link to="/user/profile">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                  </router-link>
                  <router-link to="/user/profile">
                    <el-dropdown-item>签到</el-dropdown-item>
                  </router-link>
                  <router-link to="/user/profile">
                    <el-dropdown-item>消息中心</el-dropdown-item>
                  </router-link>
                  <!--                  <el-dropdown-item command="setLayout">-->
                  <!--                    <span>布局设置</span>-->
                  <!--                  </el-dropdown-item>-->
                  <el-dropdown-item divided command="logout">
                    <span>退出登录</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import HeaderSearch from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.module.scss'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

const route = useRoute();
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const sidebarRouters = computed(() => permissionStore.sidebarRouters);
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
  const {meta, path} = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
})

function handleCommand(command) {
  switch (command) {
    case "setLayout":
      setLayout();
      break;
    case "logout":
      logout();
      break;
    default:
      break;
  }
}

</script>
<style lang='scss' scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  //box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 40px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        i {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>