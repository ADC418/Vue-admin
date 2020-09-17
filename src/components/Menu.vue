<template>
  <!-- 滚动条标签 -->
  <el-scrollbar style="height:100%" class="scroll">
    <!-- collapse 折叠菜单 -->
      <div class="logo">
        <img v-if="!isCollapse" src="@/assets/image/logo.png" class="big" />
        <img v-else src="@/assets/image/logo.png" class="small" />
      </div>
    <el-menu
      :collapse="isCollapse"
      router
      :default-active="$route.path"
      class="meun_demo"
      background-color="#191a23"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>管理</span>
        </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-1">选项2</el-menu-item>
      </el-submenu>
      </el-menu>-->

      <!-- 一级菜单 -->
      <template v-for="list in routes">
        <el-submenu :index="list.path" :key="list.path" v-if="list.meta  && !list.meta.hidden">
          <template slot="title" v-if="list.meta">
            <i :class="'el-icon-' + (list.meta.icon || 'orange')"></i>
            <span>{{list.meta.title}}</span>
          </template>

          <!-- 二级菜单 -->

          <el-menu-item
            :index="list.path+'/'+child.path"
            v-for="child in list.children"
            :key="child.path"
          >
            <template v-if="child.meta">{{child.meta.title}}</template>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { routes } from "@/router";

export default {
  data() {
    return {
      //routes:routes,
      routes
    };
  },
  props: {
    isCollapse: Boolean
  }
};
</script>
<style scoped>
.meun_demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.logo {
  display: flex;
  justify-content: center;
  height: 80px;
  align-items: center;
}
.logo .big {
  display: block;
  height: 60px;
}
.logo .small {
  display: block;
  height: 30px;
  margin: 0 auto;
}
</style>