<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="item in BreadRoutes"
      :key="item.path"
      :to="{ path: item.path }"
    >{{item.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      BreadRoutes: []
    };
  },
  methods: {
    getRoutes() {
      const routeArr = this.$route.matched.map(route => {
        return {
          path: route.path,
          title: route.meta.title
        };
      });
      this.BreadRoutes = [
        {
          path: "/",
          title: "首页"
        },
        ...routeArr
      ];
    }
  },
  watch: {
    //使用watch 监听路由的变化，从而让面包屑导航内容跟随变化
    // $route(to){
    //     console.log(to);
    //     this.getRoutes()
    // }
    '$route':{
        handler:"getRoutes",//可写为 要监听的函数名
        immediate:true,//在侦听开始之后被立即调用 因此，created中不用再调用
    }
  },
 /*  created() {
    //this.$route.matched 中包含的有子路由及其父路由
    //this.$route.matched.path 获取路由 this.$route.matched.meta.title 获取标题
    this.getRoutes()
  } */
};
</script>
<style>
</style>