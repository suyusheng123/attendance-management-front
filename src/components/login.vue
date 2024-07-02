<template>
  <el-container class="login-one">
    <el-header></el-header>
    <br><br><br><br><br>
    <el-main>
      <el-row>
        <el-col :span="8">&nbsp;</el-col>
        <el-col :span="8" style="background-color: white;border-radius:3% ;">
          <h1>嫂嫂考勤信息管理系统</h1>
          <el-form label-width="80px">
            <br>
            <el-form-item label="用户名">
              <el-col :span="20">
                <el-input placeholder="请输入用户名"
                          v-model="userInfo.userName">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="密码">
              <el-col :span="20">
                <el-input placeholder="请输入密码"
                          v-model="userInfo.userPwd"
                          show-password></el-input>
              </el-col>
            </el-form-item>

            <!-- <el-form-item label="验证码">
              <el-col :span="20">
                <el-input placeholder="请输入验证码"
                          v-model="userInfo.code" style="width: 220px;float: left"></el-input>
                <img alt="" @click="imageChange" :src="imageUrl" style="float: right; margin-right: 0px;
                    width: 120px;height:40px;">
              </el-col>
            </el-form-item> -->
            <!-- <el-form-item>
              <el-col :span="5">
              </el-col>
              <el-col :span="16">
                <div style="margin-left: 40px">
                  <el-link style="color: black" :underline="false" disabled>还没有账户?</el-link>
                  <el-link :underline="false" type="primary" @click="openRegisterWin">创建新账户?</el-link>
                  <el-link :underline="false" type="danger" @click="openPwdWin">忘记密码?
                  </el-link>
                </div>
              </el-col>
              <el-col :span="3">
              </el-col>
            </el-form-item> -->
            <el-form-item>

              <el-col :span="8">
              </el-col>
              <el-col :span="19">
                <el-button type="success" style="width: 200px" icon="el-icon-apple" @click="login" round>登录</el-button>
              </el-col>


            </el-form-item>

          </el-form>

        </el-col>
        <el-col :span="8">&nbsp;</el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>

    <!--注册对话框-->
    <el-dialog title="用户注册" :visible="isShow" width="30%" :before-close="closeRegisterWin">

      <el-form label-width="80px">

        <el-form-item label="登录名">
          <el-col :span="20">
            <el-input v-model="loginUser.userName" placeholder="请输入登录名">

            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="姓名">
          <el-col :span="20">
            <el-input v-model="loginUser.staffName" placeholder="请输入真实姓名"

            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="密码">
          <el-col :span="20">
            <el-input v-model="loginUser.userPwd" placeholder="请输入密码" show-password>

            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="性别">
          <el-col :span="20">

            <el-radio v-model="loginUser.sex" label="男">男</el-radio>
            <el-radio v-model="loginUser.sex" label="女">女</el-radio>

          </el-col>
        </el-form-item>

        <el-form-item label="电话">
          <el-col :span="20">
            <el-input v-model="loginUser.phone" placeholder="请输入电话">

            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-col :span="20">
            <el-input v-model="loginUser.email" placeholder="请输入邮箱">

            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="验证码">
          <el-col :span="20">
            <el-input placeholder="请输入验证码"
                      v-model="loginUser.emailCode" style="width: 130px"></el-input>
            <el-button @click="sendCode" type="success" :disabled="!show" style="float: right">
              获取验证码<span v-show="!show" class="count">({{ count }}s)</span>
            </el-button>
          </el-col>

        </el-form-item>

        <el-form-item>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-button type="success" size="small" @click="register" round>确定</el-button>
          </el-col>
          <el-col :span="11">
            <el-button type="success" size="small" @click="closeRegisterWin" round>取消</el-button>
          </el-col>

        </el-form-item>
      </el-form>

    </el-dialog>

    <!--找回密码对话框-->
    <el-dialog title="找回密码" :visible="isShow2" width="30%" :before-close="closePwdWin">

      <el-form label-width="80px">

        <el-form-item label="登录名">
          <el-col :span="20">
            <el-input v-model="loginUser.userName" placeholder="请输入登录名">

            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="新密码">
          <el-col :span="20">
            <el-input v-model="loginUser.userPwd" placeholder="请输入新密码" show-password>

            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="再输一次">
          <el-col :span="20">
            <el-input v-model="loginUser.surePassword" placeholder="请输入新密码" show-password>

            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-col :span="20">
            <el-input v-model="loginUser.email" placeholder="请输入注册邮箱">

            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="验证码">
          <el-col :span="20">
            <el-input placeholder="请输入验证码"
                      v-model="loginUser.emailCode" style="width: 130px"></el-input>
            <el-button @click="sendCode" type="success" :disabled="!show" style="float: right">
              获取验证码<span v-show="!show" class="count">({{ count }}s)</span>
            </el-button>
          </el-col>

        </el-form-item>

        <el-form-item>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-button type="success" size="small" @click="updatePwd" round>确定</el-button>
          </el-col>
          <el-col :span="11">
            <el-button type="success" size="small" @click="closePwdWin" round>取消</el-button>
          </el-col>

        </el-form-item>
      </el-form>

    </el-dialog>
  </el-container>

</template>

<script>
/* 导入myUtile工具类*/
import myUtile from "../utile/myUtile"

const TIME_COUNT = 60; //更改倒计时时间
export default {
  name: "login",
  data() {
    return {
      show: true, // 初始启用按钮
      count: '', // 初始化次数
      timer: null,
      userInfo: {
        userName: "",
        userPwd: "",
        code: ""
      },
      isShow: false,
      isShow2: false,
      loginUser: {
        userName: "",
        staffName: "",
        userPwd: "",
        sex: "男",
        phone: "",
        email: "",
        emailCode: "",
        surePassword: ""
      },
      imageUrl: myUtile.url + "/getKaptchaImage"
    }
  },
  methods: {
    login() {//登录
      const self = this;
      console.log(self.userInfo);
      $.ajax({
        url: myUtile.url + "/sys-user/login",
        type: "post",
        dataType: "json",
        xhrFields: {withCredentials: true},
        contentType: "application/x-www-form-urlencoded",
        data: self.userInfo,
        success: function (data) {
          if (data.info === "密码不正确" || data.info === "用户名不正确" || data.info === "验证码错误" || data.info === "该用户已经停用") {
            self.$message(data.info);
            self.imageChange();

          } else if (data.info === "登录成功") {

            self.$message(data.info);
            console.log(data.staffId);
            sessionStorage.setItem("role", data.role);
            sessionStorage.setItem("staffId", data.staffId);
            sessionStorage.setItem("userName", data.userName);
            sessionStorage.setItem("userId", data.userId);
            // sessionStorage.setItem("userPwd", self.userInfo.userPwd);
            sessionStorage.setItem("department", data.department);
            sessionStorage.setItem("token", 'true');
            // self.$router.replace({"name": "xitong"});
            self.$router.push({"name":"index"});
          } else {
            self.$message(data.info);
          }
        },
        error: function () {
          self.$message("登录失败");
        }
      })

    },
    imageChange() {
      console.log(this.imageUrl);
      //获取现在时间的原始值
      var timestamp = (new Date()).valueOf();
      this.imageUrl = myUtile.url + "/sys-user/getKaptchaImage?timestamp=" + timestamp;
    },
    openRegisterWin() {//打开注册用户模态框
      this.loginUser.loginName = "",
        this.loginUser.name = "",
        this.loginUser.userPwd = "",
        this.loginUser.sex = "",
        this.loginUser.phone = "",
        this.loginUser.email = "",
        this.loginUser.code = "",
        this.isShow = true

    },
    closeRegisterWin() {
      //关闭修改密码框
      this.isShow = false;
      if (this.count != null) {
        this.show = true;
        clearInterval(this.timer); // 清除定时器
        this.timer = null;
      }

    },
    openPwdWin() {//打开修改密码模态框
      this.loginUser.loginName = "",
        this.loginUser.name = "",
        this.loginUser.userPwd = "",
        this.loginUser.sex = "",
        this.loginUser.phone = "",
        this.loginUser.email = "",
        this.loginUser.code = "",
        this.isShow2 = true
    },
    closePwdWin() {
      //关闭修改密码框
      this.isShow2 = false;
      if (this.count != null) {
        this.show = true;
        clearInterval(this.timer); // 清除定时器
        this.timer = null;
      }

    },
    sendCode() {
      let self = this;
      $.ajax({
        url: myUtile.url + "/sys-user/emailCode",
        type: "get",
        data: {"email": self.loginUser.email},
        dataType: "json",
        success: function (data) {
          self.$message("验证码获取成功！");
          sessionStorage.setItem("Code", data.info);

        }
      });
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        self = this;

        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer); // 清除定时器
            this.timer = null;
            sessionStorage.removeItem("Code");
          }
        }, 1000)
      }
    },
    register() {
      const self = this;
      if (self.loginUser.userName === "") {
        self.$message("登录名不能为空");
      } else if (self.loginUser.staffName === "") {
        self.$message("姓名不能为空");
      } else if (self.loginUser.userPwd === "") {
        self.$message("密码不能为空");
      } else if (myUtile.checkEmail(self, self.loginUser.email)) {
        if (self.loginUser.emailCode.toUpperCase() === "") {
          self.$message("验证码不能为空！");
        } else if (sessionStorage.getItem("Code").toUpperCase() !== self.loginUser.emailCode.toUpperCase()) {
          self.$message("验证码错误！");
        } else {

          $.ajax({
            url: myUtile.url + "/sys-user/register",
            type: "post",
            data: self.loginUser,
            xhrFields: {withCredentials: true},
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {
              self.isShow = false;
              self.$message(data.info);
              sessionStorage.removeItem("Code");
            }
          });
        }
      }

    },
    updatePwd() {
      const self = this;
      if (self.loginUser.userName === "") {
        self.$message("登录名不能为空");
      } else if (self.loginUser.userPwd !== self.loginUser.surePassword) {
        self.$message("两次密码不一致！");
      } else if (myUtile.checkEmail(self, self.loginUser.email)) {
        if (self.loginUser.emailCode.toUpperCase() === "") {
          self.$message("验证码不能为空！");
        } else if (sessionStorage.getItem("Code").toUpperCase() !== self.loginUser.emailCode.toUpperCase()
        ) {
          self.$message("验证码错误！");
        } else {

          $.ajax({
            url: myUtile.url + "/sys-user/updatePassword",
            type: "post",
            data: self.loginUser,
            xhrFields: {withCredentials: true},
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {
              self.isShow2 = false;
              self.$message(data.info);
              sessionStorage.removeItem("Code");
            }
          });
        }


      }
    }
  }
}

</script>

<style>
html, body {
  margin: 0px;
  height: 100%;
}

.el-header, .el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  color: #333;
  text-align: center;
  height: 100%;

}

.login-one {
  background-color: #1c77ac;
  background-image: url(../assets/light.png);
  background-repeat: no-repeat;
  /*	//background-position:center top;*/
  overflow: hidden;
  height: 100%;
}
</style>
