<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-row>
      <el-col :span="8">
        <el-form label-width="150px">
          <el-form-item label="部门id">
            <el-input v-model="deptPage.deptId" placeholder="请输入查询部门编号"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="8">
        <el-form label-width="150px">
          <el-form-item label="部门名称">
            <el-input v-model="deptPage.deptName" placeholder="请输入查询部门名称"></el-input>
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

      <!-- <el-table-column label="部门id" width="100">
        <template slot-scope="x">
          <span>{{ x.row.deptId }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="部门名称" width="200">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.deptName }}</span>
        </template>
      </el-table-column>


      <el-table-column label="部门上班时间" width="200">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.upTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门下班时间" width="250">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.downTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200" align="center">
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

      <el-pagination @size-change="selectRow" @current-change="currentPage" :current-page="deptPage.page"
        :page-sizes="[3, 5, 7, 10]" :page-size="deptPage.row" layout="total,sizes, prev, pager, next, jumper"
        :total="deptPage.total">
      </el-pagination>
    </div>
    <!-- 对话框-->
    <el-dialog :title="title" :visible="isShow" width="30%" :before-close="closeWin" center>

      <el-form label-width="80px" :rules="rules" ref="myForm" :model="dept">
        <br>


        <el-form-item label="部门名称" prop="deptName">
          <el-col :span="20">
            <el-input v-model="dept.deptName" placeholder="请选择部门"></el-input>

          </el-col>
        </el-form-item>

        <el-form-item label="上班时间" prop="upTime">
          <el-col :span="20">
            <el-time-picker v-model="dept.upTime" value-format="HH:mm" format="HH:mm" placeholder="请选择时间">
            </el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="下班时间" prop="downTime">
          <el-col :span="20">
            <el-time-picker v-model="dept.downTime" value-format="HH:mm" format="HH:mm" placeholder="请选择时间">
            </el-time-picker>
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
import { valid } from "semver";
import myUtile from "../../utile/myUtile";

export default {
  name: "deptInfo",
  data() {
    return {
      rules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        upTime: [
          { required: true, message: "请选择上班时间", trigger: "blur" },
        ],
        downTime: [
          { required: true, message: "请选择上班时间", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let upTime = new Date(`1970-01-01T${this.dept.upTime}:00`);
              let downTime = new Date(`1970-01-01T${value}:00`);
              if (downTime.getTime() <= upTime.getTime()) {
                callback(new Error('结束时间必须大于开始时间'));
              } else if (downTime.getTime() - upTime.getTime() < 20 * 60 * 1000) {
                callback(new Error('下班时间和上班时间之间的差距必须大于或等于20分钟'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ]
      },
      isShow: false,// 对话框是否显示
      onShow: true,
      dept: {
        deptId: "",
        deptName: "",
        upTime: "",
        downTime: "",
      },
      deptPage: {
        page: 1, //页码
        row: 10,  //每页显示条数
        total: 0,  //总条数
        deptId: "",
        deptName: "",
      },
      list: [],
      title: "修改",
      roleName: "",
    }
  },
  methods: {
    add: function () {//新增对话框
      //显示对话框
      this.isShow = true;
      this.title = "新增";
      //数据回显
      this.dept.deptId = null;
      this.dept.deptName = null;
      this.dept.upTime = null;
      this.dept.downTime = null;
      this.$nextTick(() => {
        this.$refs.myForm.validate();
      })
    },
    edit(index, x) {//编辑
      console.log(index);
      console.log(x);
      //显示对话框
      this.onShow = true;
      this.isShow = true;
      this.title = "修改";
      //数据回显
      this.dept.deptId = x.deptId;
      this.dept.deptName = x.deptName;
      this.dept.upTime = x.upTime;
      this.dept.downTime = x.downTime;
    },
    sure(myForm) { //关闭对话框
      this.$refs[myForm].validate((valid) => {
        if (valid) {
            //this.isShow = false;
            const self = this;
            let url = "";
            if (this.title === "修改") {
              url = myUtile.url + "/sys-dept/update";
            } else {
              url = myUtile.url + "/sys-dept/add";
            }

            $.ajax({
              url: url,
              type: "get",
              data: self.dept,
              dataType: "json",
              success: function (data) {
                console.log(data);
                self.$message(data.info);
                if (data.info === "保存成功") {
                  self.isShow = false;
                  //刷新
                  self.loadData();
                }
              }, error: function (err) {
                console.log(err);
                self.$alert("服务器错误,请联系管理员");
              }
            })
        } else {
          this.$alert("数据填写错误");
          return false;
        }
      });
    },
    del(index, x) {//删除
      const self = this;
      this.$confirm("你确定要删除吗?").then(function () {
        $.ajax({
          url: myUtile.url + "/sys-dept/del",
          type: "get",
          data: { "deptId": x.deptId },
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
    closeWin() {
      this.isShow = false;
    },
    loadData() { //加载列表
      //this.isShow = false;
      const self = this;
      $.ajax({
        url: myUtile.url + "/sys-dept/list",
        type: "get",
        data: self.deptPage,
        dataType: "json",
        success: function (data) {
          console.log(data);
          self.list = data.list;
          //总条数
          self.deptPage.total = Number(data.total);
        }, error: function (err) {
          console.log(err);
          self.$alert("服务器错误,请联系管理员");
        }
      })
    },
    selectRow(row) {//分页下拉框触发 的事件
      console.log("row=" + row)
      this.deptPage.row = row;
      //刷新
      this.loadData();
    },
    currentPage(curPage) {//页码触发事件
      this.deptPage.page = curPage;
      //刷新
      this.loadData();
    }
  }, 
  mounted() {
    this.loadData();
  }
}
</script>

<style scoped></style>
