<template>
  <div class="tabs">
    <!-- 
           v-model/value 绑定的值和name中的值一致标签就会激活
    -->
    <el-tabs
     type="card"
     :value="$route.path"
     v-on:tab-click="tabClick"
     @tab-remove="removeTag">
      <!--  第一个缓存卡，不出现删除按钮 也就是不能有 closable属性 :closable="index!==0" -->
      <el-tab-pane
        v-for="(item,index) in tabMsg"
        :key="item.path"
        :closable="index!==0"
        :label="item.title"
        :name="item.path"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabMsg: [
        {
          path: "/dashboard/console",
          title: "主控台"
        }
      ]
    };
  },
  watch: {
    //监听路由变化 把选择的菜单的路由和title添加到数组中
    $route: {
      handler(to) {
        // console.log(to.meta.title);
        // console.log(to.path);
        if (!this.tabMsg.some(item => item.path === to.path)) {
          this.tabMsg.push({
            path: to.path,
            title: to.meta.title
          });
        }
      },
      immediate: true //监听结束后立即调用
    }
  },
  methods: {
    tabClick(item) {
      // console.log(item.name)
      //点击对应的缓存卡，进行跳转
      this.$router.push(item.name);
    },
    removeTag(name) {
      console.log(name); //被删除的标签的 name
      //根据name找的tabMsg符合条件的index
      //可通过对应的下标，通过数组的splic方法进行删除
      //通过数组的findIndex()方法
      const index = this.tabMsg.findIndex(item => item.path === name);
      //console.log(index);
      this.tabMsg.splice(index, 1);
      //在当前页，如果删除的是当前页，跳转到首页主控台，删除的是其他页，不做任何操作
      if (this.$route.path === name) {
        this.$router.replace("/dashboard/console"); //relpace是替换之前的路径
      }
    }
  }
};
</script>
<style>
</style>