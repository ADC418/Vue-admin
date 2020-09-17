<template>
  <div class="container">
    <el-card shadow="never" class="card-title">
      <el-page-header @back="goBack" content="活动管理" class="title"></el-page-header>
    </el-card>
    <el-card shadow="never" class="margebtm">
      <i class="el-icon-edit icon"></i>
      <span class="smallTitle">请填写活动信息</span>
    </el-card>
    <el-card shadow="never">
      <el-form ref="form" label-width="100" :model="activeArr" v-if="activeArr">
        <el-form-item label="标题">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
            <input type="text" class="titIpt" placeholder="请输入活动标题" v-model="activeArr.title" />
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
        <el-form-item label="活动状态">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
              <el-switch
              v-model="activeArr.status"
              active-color="#13ce66"
              inactive-color="#aaa"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-form-item>
        <el-form-item label="描述">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
            <el-input type="textarea" v-model="activeArr.desc" class="titIpt" style="margin-bottom:15px"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="报名费">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
            <input type="text" class="titIpt" placeholder="请输入费用" v-model="activeArr.price" />
          </template>
        </el-form-item>
        <el-form-item label="上传人">
          <template>
            <span style="color: #FF0000;" class="margLeft">*</span>
            <input type="text" class="titIpt" placeholder="请输入姓名" v-model="activeArr.author" />
          </template>
        </el-form-item>
        <el-form-item label="上传时间">
          <!-- format="yyyy/MM/dd" 设置显示时间的格式   value-format="yyyy/MM/dd" 绑定时间 -->
          <!--  :picker-options="xxx" 选择时间的范围 -->
          <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="activeArr.create_at"
            type="date"
            :picker-options="pickerOptions"
            placeholder="2020-09-10"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { pickerOptions } from "@/utils/methods";
import {addActive} from "@/api/active"
export default {
  data() {
    return {
      activeArr: {
      "title": "",
      "img_url": "",
      "status": "",
      "desc": "",
      "author": "",
      "price": null,
      "create_at": ""
      },
      pickerOptions //时间选择
    };
  },
  methods: {
    goBack() {
      //返回
      this.$router.back();
    },
    uploadSuccess(res) {
      //上传
      console.log(res)
      if(res.code==200){
        this.activeArr.img_url=`http://${res.data}`
      }
    },
    onSubmit() {
      //添加
      addActive(this.activeArr).then(res=>{
        console.log(res)
        this.$message.success("活动添加成功")
      })
    }
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
  margin-bottom: 10px;
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
.margebtm {
  margin-top: 12px;
  margin-bottom: 10px;
}
.container .card-title {
  height: 60px;
  line-height: 60px;
}
</style>