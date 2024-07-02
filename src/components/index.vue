<template>

  <el-container>
    <!-- 头部导航栏开始-->
    <el-header class="index">
      <el-row>
        <el-col :span="8" style="text-align: left;margin-top: 5px;">
          <img src="../../static/images/y.jpg" width="50" height="50" style="border-radius:50% ;" alt="">
          <!-- 设置用户名字体居中的样式-->
          <div style="position: fixed;top:5px;left: 80px;">
            <span style="color: white;">{{ curName }}</span>
          </div>

        </el-col>
        <el-col :span="8">

          <el-button type="primary" size="small" icon="el-icon-edit" @click="openPwdWin" round>修改密码</el-button>
          <el-button type="success" size="small" icon="el-icon-switch-button" @click="exit" round>退出系统</el-button>
          <!-- <el-button type="info" size="small" icon="el-icon-s-home" @click="top" round>系统首页</el-button> -->
          <el-button type="warning" size="small" icon="el-icon-user-solid" @click="openWin" round>个人信息</el-button>

        </el-col>
        <el-col :span="8">
          <span style="color: white;">欢迎使用嫂嫂考勤信息管理系统</span>
          <el-button type="primary" size="small" @click="signin" round>签到</el-button>
          <el-button type="warning" size="small" @click="signout" round>签退</el-button>
        </el-col>
      </el-row>
    </el-header>
    <!-- 头部导航栏结束-->
    <el-container>
      <!-- 左边导航栏开始-->
      <el-aside width="200px">
        <el-menu :default-openeds="ccc" router>
          <template v-for="x in node">
            <el-submenu :index="x.index">
              <template slot="title">{{ x.name }}
              </template>
              <template v-for="y in x.children">
                <el-menu-item :index="y.url">{{ y.name }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <!-- 左边导航栏结束-->
      <el-main>
        <!-- 中间工作区域-->
        <router-view></router-view>

      </el-main>
    </el-container>

    <!-- 修改密码对话框-->
    <el-dialog title="修改密码" :visible="isShow" width="25%" :before-close="closePwdWin">

      <el-form label-width="80px">
        <br>
        <el-form-item label="用户名">
          <el-col :span="20">
            <el-input v-model="curName" disabled>

            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="旧密码">
          <el-col :span="20">
            <el-input v-model="oldPwd" placeholder="请输入旧密码"

            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="新密码">
          <el-col :span="20">
            <el-input v-model="newPwd" placeholder="请输入新密码" show-password>

            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="再输一次">
          <el-col :span="20">
            <el-input v-model="repPwd" placeholder="请输入新密码" show-password>

            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <el-button type="success"  @click="updatePwd" round>确定</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="danger" @click="closePwdWin" round>取消</el-button>
          </el-col>

        </el-form-item>
      </el-form>

    </el-dialog>

    <!--个人信息对话框-->
    <el-dialog title="个人信息" :visible="isShow2" width="25%" :before-close="closeWin" center>

      <el-form label-width="80px">
        <br>
        <el-form-item label="员工编号">
          <el-col :span="20">
            <el-input v-model="employee.staffId" disabled label="男">男</el-input>
            <input type="hidden" v-model="employee.id"></input>
          </el-col>
        </el-form-item>

        <el-form-item label="员工姓名">
          <el-col :span="20">
            <el-input v-model="employee.staffName"></el-input>
          </el-col>
        </el-form-item>
        
        <el-form-item label="员工部门">
          <el-col :span="20">
            <el-input v-model="employee.department" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="上班时间">
          <el-col :span="20">
            <el-input v-model="dept.upTime"  type="time" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="下班时间">
          <el-col :span="20">
            <el-input v-model="dept.downTime"  type="time" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="性别">
          <el-col :span="20">
            <el-radio v-model="employee.staffSex" label="男" >男</el-radio>
            <el-radio v-model="employee.staffSex" label="女" >女</el-radio>
          </el-col>
        </el-form-item>

        <el-form-item label="电话">
          <el-col :span="20">
            <el-input v-model="employee.staffPhone" placeholder="请输入电话"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-col :span="20">
            <el-input v-model="employee.staffEmail" placeholder="请输入邮箱"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <el-button type="success" @click="sure" round>确定</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="danger" @click="closeWin" round>取消</el-button>
          </el-col>

        </el-form-item>
      </el-form>

    </el-dialog>

  </el-container>


</template>

<script>
/* 导入myUtile工具类*/

import myUtile from "../utile/myUtile";

export default {
  name: "index",
  data() {
    return {
      roleName:"",
      isShow: false,//控制密码对话框是否显示
      isShow2: false,//控制个人信息对话框是否显示
      curName: "",
      userId: "",
      oldPwd: "",
      newPwd: "",
      repPwd: "",
      ccc: ['1', '2', '3', '4', '5', '6','7', '8', '9', '10', '11', '12', '13', '15', '16', '17','18','19','20'],
      staffId: "",
      node: [],
      employee: { //对话框中的表单对象数据绑定
        id: "",
        staffId: "",
        staffName: "",
        staffSex: "",
        staffPwd: "",
        department: "",
        sysRole: "",
        staffPhone: "",
        staffEmail: "",
        leaveTime: "",
        lateTime: "",
        earlyTime: ""
      },
      dept:{
        deptName:"",
        upTime:"",
        downTime:""
      }
    }
  },
  methods: {
    rolejia(){
      var self=this;
      if(self.roleName == "董事长"||self.roleName == "管理员"||self.roleName == "部门经理"){
        //alert("请对未处理的事项进行审批")
        // self.$message("请对未处理的事项进行审批");

        console.log(self.roleName);
      }else {

        // alert("请对已经审核过的事项进行查询")
        // self.$message("请对已经审核过的事项进行查询")
        console.log(self.roleName);
      }
    },

    openPwdWin() {//打开修改密码模态框
      this.isShow = true;
    },
    openWin() {//打开修改密码模态框
      this.isShow2 = true;
    },
    closePwdWin() {
      //关闭修改密码框
      this.isShow = false;
    },
    // top() {
    //   this.$router.replace({"name": "xitong"});

    // },
    exit() {
      sessionStorage.removeItem("token", 'true');
      this.$router.replace({"name": "/"});
      location.reload();

    },
    loadPwoer() {
      var mythis = this;
      $.ajax({
        url: myUtile.url + "/sys-power/selectPower",
        type: "get",
        data: {"userName": mythis.curName},
        dataType: "json",
        success: function (data) {
          console.log(data)
          mythis.node = data.info
          sessionStorage.setItem("node", JSON.stringify(data.info));
        }

      })

    },
    updatePwd() {//修改密码
      const self = this;
      if (self.oldPwd == null || self.oldPwd !== sessionStorage.getItem("userPwd")) {
        self.$message("旧密码输入错误")
      } else if (self.newPwd === "" || self.oldPwd === self.newPwd) {
        self.$message("新密码为空或者与旧密码相同")
      } else if (self.newPwd !== self.repPwd) {
        self.$message("两次密码不一致")
      } else {
        $.ajax({
          url: myUtile.url + "/sys-user/updatePwd",
          type: "post",
          contentType: "application/x-www-form-urlencoded",
          data: {"userId": self.userId, "userPwd": self.newPwd},
          dataType: "json",
          success: function (data) {
            self.$message(data.info);
          }
        });
        //关闭修改密码框
        this.isShow = false;
      }
    },
    signin() {
      const self = this;
      $.ajax({
        url: myUtile.url + "/attendance/signin",//请求地址
        type: "get",
        data: {"staffId": self.staffId},
        dataType: "json",//返回的数据类型
        success: function (data) {
          self.$message(data.info);
        }
      })
    },
    signout() {
      const self = this;
      $.ajax({
        url: myUtile.url + "/attendance/signout",//请求地址
        type: "get",
        data: {"staffId": self.staffId},
        dataType: "json",//返回的数据类型
        success: function (data) {
          self.$message(data.info);
        }
      })
    },
    sure() { //关闭对话框
      const self = this;

      $.ajax({
        url: myUtile.url + "/employee/update",
        type: "get",
        data: self.employee,
        dataType: "json",
        success: function (data) {
          console.log(data);
          self.$message(data.info);
          if (data.info === "保存成功") {
            self.isShow2 = false;
            //刷新
            self.loadData();
          }
        }, error: function (err) {
          console.log(err);
          self.$alert(err.responseText);
        }
      })
    },
    loadData() { //加载列表
      //this.isShow = false;
      const self = this;
      console.log(self.staffId);
      self.employee.staffId = self.staffId;
      let deptName = sessionStorage.getItem("department");
      $.ajax({
        url: myUtile.url + "/employee/queryOne",
        type: "get",
        data: self.employee,
        dataType: "json",
        success: function (data) {
          console.log(data);
          self.employee = data.data;
          sessionStorage.setItem("name", self.employee.staffName
          );
        }, error: function (err) {
          console.log(err);
          self.$alert("服务器错误,请联系管理员");
        }
      }),
      $.ajax({
        url: myUtile.url + "/sys-dept/queryDept",
        type: "get",
        data:  {"deptName": deptName},
        dataType: "json",
        success: function (data) {
          console.log(data);
          self.dept = data.dept;
        }, error: function (err) {
          console.log(err);
          self.$alert("服务器错误,请联系管理员");
        }
      })
    },

    closeWin() {
      this.isShow2 = false;
    },
  }
  , mounted() {
    this.dept.deptName = sessionStorage.getItem("department");
    this.roleName = sessionStorage.getItem("role");
    this.curName = sessionStorage.getItem("userName");
    this.staffId = sessionStorage.getItem("staffId");
    this.userId = sessionStorage.getItem("userId");
    this.loadPwoer();
    this.loadData();
    this.rolejia();
  }
}
</script>

<style>
html,
body {
  margin: 0px;
  height: 100%;
}

.el-header {

  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: white;
  color: #333;
  /* text-align: center; */
  height: 700px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: left;

}

.index {
  background-color: #1c77ac;
  background-image: url(../assets/light.png);
  background-repeat: no-repeat;
  /*	//background-position:center top;*/
  overflow: hidden;
  height: 100%;
}
</style>
