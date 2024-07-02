<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-row>
      <el-col :span="8">
        <el-form label-width="150px" :model="userPage" :rules="rules">
          <el-form-item label="员工编号" prop="staffId">
            <el-input v-model="userPage.staffId" placeholder="请输入查询员工编号"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="8">
        <el-form label-width="150px">
          <el-form-item label="姓名">
            <el-input v-model="userPage.userName" placeholder="请输入查询姓名"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="8" style="padding-left: 5px;">
        <el-button icon="el-icon-search" size="small" type="success" @click="loadData">查询</el-button>
        <el-button icon="el-icon-message" size="small" type="success" @click="add()">新增</el-button>
      </el-col>
    </el-row>
    <br>
    <!-- :data 绑定的json数组 -->
    <el-table :data="list" style="width: 100%;">

      <el-table-column label="员工编号" width="100">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.staffId }}</span>
        </template>
      </el-table-column>
      <!--  label是设置列名称-->
      <el-table-column label="用户名" width="100">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.userName }}</span>
        </template>
      </el-table-column>

  


      <el-table-column label="邮箱" width="200">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="200">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">

          <el-tag type="danger" effect="dark" v-if="x.row.state === '1'">禁用</el-tag>


          <el-tag type="success" effect="dark" v-else-if="x.row.state === '0'">启用</el-tag>

        </template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <el-button type="success" icon="el-icon-edit" size="small" @click="edit(x.$index, x.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="del(x.$index, x.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="block">

      <!-- size-change 下来框选中触发的事件 -->
      <!-- current-change 选中当前页码触发的事件 -->
      <!-- current-page 当前页绑定的值-->
      <!-- page-size 每页显示条数数-->
      <!-- total 总条数 -->

      <el-pagination @size-change="selectRow" @current-change="currentPage" :current-page="userPage.page"
        :page-sizes="[3, 5, 7, 10]" :page-size="userPage.row" layout="total,sizes, prev, pager, next, jumper"
        :total="userPage.total">
      </el-pagination>
    </div>


    <!-- 对话框-->
    <el-dialog :title="title" :visible="isShow" width="30%" :before-close="closeWin" center>

      <el-form label-width="80px" :model="user" :rules="rules" ref="myForm">
        <br>

        <el-form-item label="员工编号">
          <el-col :span="20">
            <el-input v-model="user.staffId" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="用户名" prop="userName">
          <el-col :span="20">
            <el-input v-model="user.userName"></el-input>
            <input type="hidden" v-model="user.userId">
          </el-col>
        </el-form-item>


        <el-form-item label="邮箱" prop="email">
          <el-col :span="20">
            <el-input v-model="user.email"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="状态" v-if="onShow">
          <el-col :span="20">
            <!--            <el-input v-model="user.state"></el-input>-->
            <el-select v-model="user.state" placeholder="请选择状态">
              <el-option v-for="x in option" :key="x.value" :label="x.label" :value="x.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <el-button type="success" icon="el-icon-apple" @click="sure('myForm')" round>确定</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="success" @click="closeWin" round>取消</el-button>
          </el-col>

        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
/* 导入myUtile工具类*/


import myUtile from "../../utile/myUtile";

export default {
  name: "student",
  data() {
    var validateEmail = (rule, value, callback) => {
      var emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
      if (!emailRegex.test(value)) {
        callback(new Error('无效的邮箱地址'));
      } else {
        callback();
      }
    };
    var validateStaffId = (rule, value, callback) => {
      if (!/^[0-9]{7}$/.test(value)) {
        callback(new Error('员工编号必须是7位数'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        staffId: [
          { validator: validateStaffId, trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
      },
      isShow: false,// 对话框是否显示
      onShow: false,
      up: true,
      down: false,
      user: { //对话框中的表单对象数据绑定
        userId: 0,
        staffId: "",
        userName: "",
        userPwd: "",
        email: "",
        state: ""
      },
      option: [ //选择框
        { label: "启用", value: "0" },
        { label: "禁用", value: "1" },
      ],
      list: [],
      title: "修改",
      userPage: {//分页对象
        page: 1, //页码
        row: 10,  //每页显示条数
        total: 0,  //总条数
        staffId: "",
        userName: "",
      }
    }
  },
  methods: {

    edit(index, x) {//编辑
      console.log(index);
      console.log(x);
      //显示对话框
      this.onShow = true;
      this.isShow = true;
      this.title = "修改";
      //数据回显
      this.user.userId = x.userId;
      this.user.userName = x.userName;
      this.user.staffId = x.staffId;
      this.user.userPwd = x.userPwd;
      this.user.salt = x.salt;
      this.user.email = x.email;
      this.user.state = x.state;


    },
    del(index, x) {//删除
      const self = this;
      this.$confirm("你确定要删除吗?").then(function () {
        $.ajax({
          url: myUtile.url + "/sys-user/del",
          type: "get",
          data: { "userId": x.userId,
                 "staffId": x.staffId
           },
          dataType: "json",
          success: function (data) {
            console.log(data);
            self.$message(data.info);
            if (data.info === "保存成功") {

              //刷新
              self.loadData();
            }
          }
        })
      }).catch(function () {
        self.$message("你取消删除")
      })
    },
    add: function () {//新增对话框
      //显示对话框
      this.isShow = true;
      this.title = "新增";
      //数据回显
      this.user.userId = null;
      this.user.staffId = Math.floor(Math.random() * 9000000) + 1000000;
      this.user.userPwd = "123456";
      this.user.salt = null;
      this.user.email = null;
      this.user.state = null;
    },
    sure(myForm) { //关闭对话框
      //this.isShow = false;
      this.$refs[myForm].validate((valid) => {
        if (valid) {
          const self = this;
          let url = "";
          if (this.title === "修改") {
            url = myUtile.url + "/sys-user/update";
          } else {
            url = myUtile.url + "/sys-user/add";
          }

          $.ajax({
            url: url,
            type: "get",
            data: self.user,
            dataType: "json",
            success: function (data) {
              console.log(data);
              self.$message(data.info);
              if (data.info === "保存成功") {
                self.isShow = false;
                //刷新
                // self.loadData();
               self.$router.push('/index/employee');
              }
            }, error: function (err) {
              console.log(err);
              self.$alert(err.responseText);
            }
          })
        } else {
          this.$alert("输入错误");
          return false;
        }
      })

    },
    loadData() { //加载列表
      //this.isShow = false;
      const self = this;
      $.ajax({
        url: myUtile.url + "/sys-user/list",
        type: "get",
        data: self.userPage,
        dataType: "json",
        success: function (data) {
          console.log(data);
          self.list = data.list;
          /* if (self.list.state === '0') {
             console.log(self.list.state)
             this.up = true;
             this.down = false;
           } else if (self.list.state === '1') {
             this.up = false;
             this.down = true;
           }*/
          //总条数
          self.userPage.total = Number(data.total);
        }, error: function (err) {
          console.log(err);
          self.$alert(err.responseText);
        }
      })
    },
    closeWin() {
      this.isShow = false;
    },
    selectRow(row) {//分页下拉框触发 的事件
      console.log("row=" + row)
      this.userPage.row = row;
      //刷新
      this.loadData();
    },
    currentPage(curPage) {//页码触发事件
      this.userPage.page = curPage;
      //刷新
      this.loadData();
    }

  },
  mounted() {
    this.loadData();
  }
}
</script>

<style></style>
