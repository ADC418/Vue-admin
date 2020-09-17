<template>
  <el-row type="flex" justify="center" class="login">
    <el-col :xs="24" :sm="18" :md="14" :lg:="10" :xl="6">
      <div class="logo">
        <img src="@/assets/image/logos.png">
      </div>
      <el-card shadow="never" style="background-color:#bbb">
        <template #header>
          <!-- v-slot 简写 # -->
          <div class="clearfix">
            <span>自定义后台管理系统</span>
          </div>
        </template>
        <el-form :model="user" ref="loginForm" :rules="ruler">
          <el-form-item label="账号" prop="username">
            <el-input placeholder="请输入用户名" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" v-model="user.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" icon="el-icon-s-promotion" @click="login">登录</el-button>
            <el-button icon="el-icon-edit" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { login } from "@/api/login";
import { loginRuler } from "@/validate/ruler";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      ruler: loginRuler
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(vaild => {
        if (vaild) {
          login(this.user).then(res => {
            // console.log(res);
            //本地存储token token相当于是火车票 一个凭证
            localStorage.setItem("token", res.data.token);
            this.$message.success("登录成功");
            this.$router.replace("/"); //登录成功跳转到首页

            //但token会有过期时间，每次需要验证token是否存在，因此在请求数据时可携带一下header参数
            /*  get请求中是和params同级
             headers:{
                    authorization:localStorage.getItem("token"),//单个请求
          } */
          });
        }
      });
    },
    reset() {
      //调用表单的内置的resetFields()方法
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>
<style scoped>
.login{
  position: relative;
  top: 60px;
}
.logo{
  display: flex;
  align-items: center;
  height: 100px;
}
</style>