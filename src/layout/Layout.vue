<template>
  <el-container style="height:100vh">
    <el-aside style="background: #191a23;width:auto">
      <Menu :isCollapse="coll"></Menu>
    </el-aside>

    <el-container class="bord-right">
      <el-header style="background:#ddd;padding:0">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#fff"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 折叠标签 在组件layout中，向组件中的子组件menu进行通信，所以是父子通信-->
          <div class="collapse" @click="coll=!coll">
            <i :class="[coll ?'el-icon-s-unfold':'el-icon-s-fold']"></i>
          </div>
          <!-- 刷新 就是 router-view的消失和显示  -->
          <div class="collapse" @click="refresh">
            <i class="el-icon-refresh"></i>
          </div>
          <!-- 面包屑导航 -->
          <Breadcrumb class="bread"></Breadcrumb>
        </el-menu>
      </el-header>
      <el-main style="background-color: rgba(242, 242, 242, 1)">
        <!-- 标签导航切换-(缓存选项卡) -->
        <ChooseTab></ChooseTab>
        <!-- 添加动画属性 -->
        <transition name="el-fade-in-linear" mode="out-in">
          <keep-alive v-if="showview">
            <router-view v-if="showview" :key="$route.fullPath"></router-view>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "@/components/Menu";
import Breadcrumb from "@/layout/Breadcrumb";
import ChooseTab from "@/layout/chooseTab";
export default {
  data() {
    return {
      coll: false,
      showview: true
    };
  },
  methods: {
    refresh() {
      this.showview = false;
      //$nextTick 会在DOM加载完成后执行
      this.$nextTick(() => {
        this.showview = true;
      });
    }
  },
  components: {
    Menu,
    Breadcrumb,
    ChooseTab
  }
};
</script>
<style>
.bread {
  display: flex;
  height: 60px;
  align-items: center;
  font-size: 16px;
}
.bord-right .el-menu {
  border-right: none;
}
.el-menu-demo {
  display: flex;
  align-items: center;
}
.collapse {
  padding: 0 12px;
  height: 60px;
  line-height: 60px;
  outline: 0;
  cursor: pointer;
}
</style>