<template>
  <div class="container">
    <el-card shadow="never" class="card-title">
      <el-page-header @back="goBack" content="文章管理" class="title"></el-page-header>
    </el-card>
    <el-card class="margebtm" shadow="never">
      <i class="el-icon-s-unfold icon"></i>
      <span class="smallTitle">文章列表</span>
    </el-card>
    <el-card shadow="never">
      <el-table :data="topicArr" v-loading="loading">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="列表图">
          <template v-slot="{row}">
            <img :src="row.img_url" width="110" />
          </template>
        </el-table-column>
        <el-table-column label="描述" width="207">
          <template v-slot="{row}">
            <p class="desc">{{row.desc}}</p>
          </template>
        </el-table-column>
        <el-table-column label="上传人" prop="authro"></el-table-column>
        <el-table-column label="上传时间" prop="create_at"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{row}">
            <el-button type="success" size="mini" style="margin-right:10px" @click="edit(row)">编辑</el-button>
            <el-popconfirm title="这一条活动确定删除吗？" @onConfirm="remove(row.id)">
              <el-button slot="reference" size="mini" type="info" class="el-icon-delete">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev,pager,next,jumper"
        :total="total"
        :page-size="params._limit"
        @current-change="change"
      ></el-pagination>
    </el-card>
    <!-- 编辑弹框 -->
    <el-dialog title="文章信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" label-width="100" :model="topic" v-if="topic">
         <el-form-item label="id">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
            <input type="text" class="titIpt" v-model="topic.id" disabled readonly/>
          </template>
        </el-form-item>
        <el-form-item label="标题">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
            <input type="text" class="titIpt" placeholder="请输入文章标题" v-model="topic.title" />
          </template>
        </el-form-item>
        <el-form-item label="列表图片">
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
              <div slot="tip">建议尺寸为70*70像素，大小小于2M</div>
            </el-upload>
          </template>
        </el-form-item>
        <el-form-item label="描述">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
            <el-input
              type="textarea"
              v-model="topic.desc"
              class="titIpt"
              style="margin-bottom:15px"
            ></el-input>
          </template>
        </el-form-item>
        <el-form-item label="上传人">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
            <input type="text" class="titIpt" placeholder="请输入姓名" v-model="topic.author" />
          </template>
        </el-form-item>
        <el-form-item label="上传时间">
          <!-- format="yyyy/MM/dd" 设置显示时间的格式   value-format="yyyy/MM/dd" 绑定时间 -->
          <!--  :picker-options="xxx" 选择时间的范围 -->
          <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="topic.create_at"
            type="date"
            :picker-options="pickerOptions"
            placeholder="2020-09-10"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updata">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTopics, deleteTopic, patchTopic } from "@/api/topic";
import { pickerOptions } from "@/utils/methods";
export default {
  data() {
    return {
      topicArr: [],
      params: {
        _page: 1,
        _limit: 9
      },
      loading: false,
      total: 0,
      pickerOptions, //时间
      dialogFormVisible: false,
      topic: []
    };
  },
  methods: {
    getTopicList(params) {
      this.loading = true;
      return getTopics(params).then(res => {
        this.topicArr = res.data;
        //console.log(res.headers);
        this.loading = false;
        this.total = +res.headers["x-total-count"];
      });
    },
    remove(id) {
      this.loading = true;
      deleteTopic(id).then(() => {
        this.getTopicList(this.params).then(() => {
          this.loading = false;
        });
      });
    },
    change(page) {
      this.params._page = page;
      this.getTopicList(this.params);
    },
    goBack() {
      this.$router.back();
    },
    uploadSuccess(res) {
      //上传图片
      if (res.code === 200) {
        this.topic.img_url = `http://${res.data}`;
      }
    },
    //编辑
    edit(data){
      this.topic={...data};//拷贝 
      this.dialogFormVisible = true;
    },
    //更新
    updata() {
      patchTopic(this.topic.id, this.topic).then(() => {
        this.$message.success("更新文章成功");
        this.dialogFormVisible = false;
        this.getTopicList(this.params);
      });
    }
  },
  created() {
    this.getTopicList(this.params);
  }
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
.container .desc {
  width: 200px;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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