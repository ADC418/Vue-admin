<template>
  <div class="container">
    <el-card shadow="never" class="card-title">
      <el-page-header @back="goBack" content="轮播图管理" class="title"></el-page-header>
    </el-card>
    <el-card shadow="never" class="margebtm">
      <i class="el-icon-s-unfold icon"></i>
      <span class="smallTitle">轮播图列表</span>
    </el-card>
    <el-card class="fontSty" shadow="never">
      <el-table stripe :data="bannerArr" v-loading="loading" height="620">
        <!-- 多选 -->
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column label="轮播图名称" prop="title"></el-table-column>
        <el-table-column label="缩略图">
          <!-- 表格中的slot，后台定义好的参数中有个row，row代表就是行数据，直接使用即可 -->
          <template v-slot="{row}">
            <img :src="row.img_url" width="120" />
          </template>
        </el-table-column>
        <el-table-column label="上传人" prop="author"></el-table-column>
        <el-table-column label="上传时间" prop="create_at"></el-table-column>
        <el-table-column label="状态" width="220">
          <template v-slot="{row}">
            <el-tag
              :type="row.status?'success':'danger'"
              size="mini"
              effect="dark"
            >{{row.status ? '启用':'禁用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="320">
          <template v-slot="{row}">
            <!-- 可通过slot插槽的参数row，获取id -->
            <el-button size="mini" icon="el-icon-edit" type="success" @click="edit(row)">编辑</el-button>
            <el-button size="mini" icon="el-icon-delete" @click="remove(row.id)"  type="danger" >删除</el-button>
            <!-- 此处的click是自定义事件(在组件中定义的)，但能触发是因为人家在创建组件时用的是$emit("click")
            用原生的点击事件，触发自定义事件-->
          </template>
        </el-table-column>
      </el-table>
      <!-- 实现分页，需要知道总数 默认是第一页，一页是10条 -->
      <el-pagination
        background
        style="margin-top:20px"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="currentChange"
        :page-size="params._limit"
      ></el-pagination>
      <!-- current-change是自定义事件，别人创建组件时用的$emit("current-change"),携带的会有参数-->
    </el-card>
    <!-- 弹出框 -->
    <el-dialog title="更新轮播" :visible.sync="dialogFormVisible">
      <el-form ref="form" label-width="100" :model="banner" v-if="banner">
        <el-form-item label="id">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
            <input type="text" class="titIpt" v-model="banner.id" disabled />
          </template>
        </el-form-item>
        <el-form-item label="轮播图名称">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
            <input type="text" class="titIpt" placeholder="请输入轮播图名称" v-model="banner.title" />
          </template>
        </el-form-item>
        <el-form-item label="轮播图">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
            <!-- on-success 是upload上传的一个属性，他是类型是一个函数，有3个参数 function(response, file, fileList) -->
            <el-upload
              action="http://localhost:3000/upload"
              :limit="1"
              class="upload"
              :on-success="uploadSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip">建议尺寸为768*500像素，大小小于2M</div>
            </el-upload>
          </template>
        </el-form-item>
        <el-form-item label="轮播图状态">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
            <el-switch
              v-model="banner.status"
              active-color="#13ce66"
              inactive-color="#aaa"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-form-item>
        <el-form-item label="上传时间">
          <!-- format="yyyy/MM/dd" 设置显示时间的格式   value-format="yyyy/MM/dd" 绑定时间 -->
          <!--  :picker-options="xxx" 选择时间的范围 -->
          <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="banner.create_at"
            type="date"
            :picker-options="pickerOptions"
            placeholder="2020-09-10"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button @click="dialogFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getBanners, deleteBanner, patchBanner } from "@/api/banner";
import { pickerOptions } from "@/utils/methods";
export default {
  data() {
    return {
      bannerArr: [],
      params: {
        _page: 1, //第几页
        _limit: 8 //每页显示多少条
      },
      loading: false,
      total: 0, //获取数据列表的总数
      pickerOptions,
      dialogFormVisible: false,
      banner: []
    };
  },
  methods: {
    getBannerList(params) {
      this.loading = true;
      return getBanners(params).then(res => {
        //console.log(res.data);
        //console.log(res.headers["x-total-count"])
        this.total = +res.headers["x-total-count"]; //实现分页要获取的总数 转Number类型
        this.bannerArr = res.data;
        this.loading = false;
      });
    },
    remove(id) {
      //console.log(id)
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          deleteBanner(id).then(() => {
            //删除后重新请求数据渲染
            //res不需要写(如果写了，没有使用会报错)
            this.getBannerList(this.params).then(() => {
              this.loading = false;
            });
            //此时不知道数据请求是否成功，因此可使用return，return getBanners(params).then得到的结果还是一个promise，仍可以.el-table--hidden
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
          this.loading = false;
        });
    },
    currentChange(page) {
      //console.log(page) 当前页改变，请求数据
      this.params._page = page; //点击的页码重新给params._page
      this.getBannerList(this.params);
    },
    goBack() {
      //返回上一个历史路由
      this.$router.back();
      //console.log(this.$router)
    },
    // 编辑
    edit(msg) {
      console.log(msg); //参数msg 就是每一行的信息row
      //this.banner=msg
      //编辑使用的row和设置给banner的row指的是同一个对象(所有编辑框改变，对应的列表就改变了。不能直接把row设置给banner)
      //指向同一块堆内存地址，要拷贝一份，(深浅拷贝)
      //this.banner=Object.assign({},msg) 法1 把msg覆盖到一个新对象中
      this.banner = { ...msg }; //法2
      this.dialogFormVisible = true;
    },
    //上传
    uploadSuccess(res) {
      console.log(res);
      if (res.code === 200) {
        //把res.data赋值给img_ulr
        this.banner.img_url = `http://${res.data}`;
      }
    },
    //更新
    onSubmit() {
      // addBanner(this.banner).then(res => {
      //   this.$message.success("添加成功");
      //   console.log(res);
      // });
      patchBanner(this.banner.id, this.banner).then(() => {
        this.$message.success("更新成功")
        this.dialogFormVisible = false;
        this.getBannerList(this.params);
      });
    }
  },
  created() {
    this.getBannerList(this.params);
  },
  computed: {}
};
</script>
<style scoped>
.title {
  font-weight: 600;
  font-size: 20px;
  margin-left: 12px;
  margin-bottom: 12px;
}
.icon {
  margin-right: 5px;
}
.icon,
.smallTitle {
  color: #666666;
  font-size: 14px;
}
.margebtm {
  margin-top: 12px;
  margin-bottom: 10px;
}
.container .card-title {
  height: 60px;
  line-height: 60px;
}
.container .titIpt {
  width: 177px;
  height: 31px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
.container .titIpt:focus {
  border-color: #409eff;
}
.titIpt::placeholder {
  color: #aaa;
}
.container .margLeft {
  margin-left: -10px;
  margin-right: 15px;
}
.container .linkIpt:focus {
  border-color: #409eff;
}
.container .upload {
  width: 300px;
  margin-left: 50px;
}
</style>