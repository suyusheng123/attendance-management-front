<!--请假列表-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>特殊管理</el-breadcrumb-item>
      <el-breadcrumb-item>加班记录</el-breadcrumb-item>
    </el-breadcrumb>
    <br>

    <el-row>
      <!--    <el-col :span="4">
          <template>
            <el-select v-model="value" placeholder="请选择" style="width: 120px" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
</el-col>-->


      <el-col :span="4" style="padding-left: 5px;padding-top: 5px">
        <el-button icon="el-icon-message" size="small" type="success" @click="add()">加班申请</el-button>
      </el-col>
    </el-row>
    <br>
    <!--绑定json数据-->
    <el-table :data="list" style="width: 100%;">
      <el-table-column label="员工编号" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.staffId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="员工姓名" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.staffName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="员工部门" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.staffDevelopment }}</span>
        </template>
      </el-table-column>
      <el-table-column label="加班申请时间" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.applyTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="加班起始时间" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.overBegin }}</span>
        </template>
      </el-table-column>

      <el-table-column label="加班结束时间" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.overEnd }}</span>
        </template>
      </el-table-column>

      <el-table-column label="审核状态" width="100px">
        <template slot-scope="x">
          <el-tag type="success" effect="dark" v-if="x.row.auditState === 1">已审核</el-tag>
          <el-tag type="danger" effect="dark" v-if="x.row.auditState === 0">未审核</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="审核结果" width="100px">
        <template slot-scope="x">
          <span v-if="x.row.auditState === 1">{{ x.row.auditResult }}</span>
          <span v-else></span>
        </template>
      </el-table-column>


      <el-table-column label="操作" width="280" align="center">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <el-button type="success" :disabled="x.row.auditState === 1" icon="el-icon-edit" size="small"
            @click="edit(x.$index, x.row)">修改</el-button>
          <el-button type="danger" :disabled="x.row.auditState === 1" icon="el-icon-delete" size="small"
            @click="del(x.$index, x.row)">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>



    <div class="block">
      <!-- size-change 下来框选中触发的事件 -->
      <!-- current-change 选中当前页码触发的事件 -->
      <!-- current-page 当前页绑定的值-->
      <!-- page-size 每页显示条数数-->
      <!-- total 总条数 -->

      <el-pagination @size-change="selectRow" @current-change="currentPage" :current-page="leavePage.page"
        :page-sizes="[3, 5, 7, 10]" :page-size="leavePage.row" layout="total,sizes, prev, pager, next, jumper"
        :total="leavePage.total">
      </el-pagination>


      <!--对话框====================================-->
      <el-dialog :title="title" :visible="isShow" width="30%" :before-close="closeWin" center>
        <el-form label-width="80px" :model="leave" :rules="rules" ref="myForm">
          <el-form-item label="姓名">
            <el-col :span="20">
              <input v-model="leave.staffId" type="hidden"></input>
              <el-input v-model="leave.staffName" disabled></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="部门">
            <el-col :span="20">
              <el-select v-model="leave.staffDevelopment" disabled>
              </el-select>
            </el-col>
          </el-form-item>


          <el-form-item label="申请时间">
            <el-col :span="20">
              <el-time-picker v-model="leave.applyTime" disabled>
              </el-time-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="起始时间" prop="overBegin">
            <el-col :span="20">
              <el-time-picker v-model="leave.overBegin" value-format="HH:mm" format="HH:mm" :picker-options="{
                selectableRange: dept.downTime + ':00' + ' - 23:59:59'
              }" placeholder="请选择时间">
              </el-time-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="结束时间" prop="overEnd">
            <el-col :span="20">
              <el-time-picker v-model="leave.overEnd" value-format="HH:mm" format="HH:mm" :picker-options="{
                selectableRange: dept.downTime + ':00' + '- 23:59:59'
              }" placeholder="请选择时间">
              </el-time-picker>
            </el-col>
          </el-form-item>

          <el-form-item>

            <el-col :span="12">
              <el-button type="success" icon="el-icon-apple" @click="sure('myForm')" round>确定</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="success" @click="closeWin" round>取消</el-button>
            </el-col>

          </el-form-item>



        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import myUtile from "../../utile/myUtile";

export default {
  name: "overtime",
  data() {
    return {
      curId: "",
      list: [],
      isShow: false,
      leave: {
        id: 0,
        staffId: 0,
        staffName: "",
        staffDevelopment: "",
        applyTime: "",
        overBegin: "",
        overEnd: "",
        auditState: "",
        auditResult: ""
      },
      rules: {
        overBegin: [
          { required: true, message: '时间不允许为空', trigger: 'change' }
        ],
        overEnd: [
          { required: true, message: '时间不允许为空', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value <= this.leave.overBegin) {
                callback(new Error('结束时间必须大于开始时间'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ]
      },
      leavePage: {//分页对象
        page: 1, //页码
        row: 10,  //每页显示条数
        total: 0  //总条数
      },
      title: "xxxx",
      dept: {
        deptId: " ",
        deptName: " ",
        upTime: " ",
        downTime: " "
      },

    }
  },
  methods: {
    /*新增方法====================================*/
    add: function () {

      this.isShow = true;
      this.title = "加班申请";
      //数据回显
      this.leave.staffId = this.curId;
      this.leave.staffName = sessionStorage.getItem("name");
      this.leave.staffDevelopment = sessionStorage.getItem("department");
      this.dept.deptName = sessionStorage.getItem("department");
      this.leave.applyTime = new Date();
      this.$nextTick(() => {
        this.$refs.myForm.validate();
      });
      // console.log(this.dept);
    },
    /*删除方法======================================*/
    del: function (index, x) {//撤销申请
      var self = this;
      this.$confirm("你确定要撤销申请吗？").then(function () {
        $.ajax({
          /*给出后端删除的路径*/
          url: myUtile.url + "/overtime/del",
          type: "get",
          data: { "id": x.id },
          dataType: "json",
          success: function (data) {
            self.$message(data.info);
            if (data.info == "撤销成功") {
              //刷新
              self.loadData();
            }
          }
        })
      }).catch(function () {
        self.$message("你已撤销申请")
      })
    },
    /*编辑方法========================================*/
    edit(index, x) {
      /*根据员工序号编辑(不是员工号)*/
      console.log(index);
      console.log(x);
      //显示对话框
      this.isShow = true;
      this.title = "修改";
      //数据回显
      this.leave.id = x.id;
      this.leave.staffId = x.staffId;
      this.leave.staffName = x.staffName;
      this.leave.staffDevelopment = x.staffDevelopment;
      this.leave.applyTime = x.applyTime;
      this.leave.overBegin = x.overBegin;
      this.leave.overEnd = x.overEnd;
      // this.$nextTick(() => {
      //   this.$refs.myForm.validate();
      // });
    },
    // 时间日期格式化
    formatDateTime(date) {
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);
      let hour = ("0" + date.getHours()).slice(-2);
      let minute = ("0" + date.getMinutes()).slice(-2);
      let second = ("0" + date.getSeconds()).slice(-2);

      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    // 日期 + 时间
    addDate(time) {
      // 检查 time 是否已经包含日期
      if (time.includes('-')) {
        // 如果 time 包含日期，直接返回 time
        return time;
      } else {
        let date = new Date();
        let currentDate = this.formatDateTime(date).split(' ')[0];
        let seconds = (this.formatDateTime(date).split(' ')[1]).split(':')[2];
        return `${currentDate} ${time}:${seconds}`;
      }
    },
    sure(myForm) {
      // 检查
      this.$refs[myForm].validate((valid) => {
        if (valid) {
          const self = this;
          let url = "";
          this.leave.overBegin = this.addDate(this.leave.overBegin);
          this.leave.overEnd = this.addDate(this.leave.overEnd);
          if (this.title === "修改") {
            url = myUtile.url + "/overtime/update";
          } else {
            url = myUtile.url + "/overtime/add";
            this.leave.applyTime = this.formatDateTime(this.leave.applyTime);
          }
          $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(self.leave),
            success: function (data) {
              self.$message(data.info);
              if (data.info === "新增成功" || data.info==="修改成功") {
                self.isShow = false;
                self.loadData();
              }
            },
            error: function (error) {
              console.error(error);
              self.$alert(error.message);
            }
          })
        }
        else {
          this.$alert("加班时间填写不正确");
          return false;
        }
      });
    },
    loadData() { //加载列表
      //this.isShow = false;
      const self = this;
      var staffId = sessionStorage.getItem("staffId");

      $.ajax({
        url: myUtile.url + "/overtime/queryOverTime?staffId=" + staffId,
        type: "get",
        data: self.leavePage,
        dataType: "json",
        success: function (data) {
          console.log(data.list);
          console.log(staffId);
          self.list = data.list;
          //总条数
          self.leavePage.total = Number(data.total);
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
      this.leavePage.row = row;
      //刷新
      this.loadData();
    },
    currentPage(curPage) {//页码触发事件
      this.leavePage.page = curPage;
      //刷新
      this.loadData();
    },
    startRange() {
      this.dept.deptName = sessionStorage.getItem("department");
      const self = this;
      $.ajax({
        url: myUtile.url + "/sys-dept/queryDept",
        type: "get",
        data: self.dept,
        dataType: "json",
        success: function (data) {
          if (data.info === "查询成功") {
            self.dept.deptId = data.dept.deptId;
            self.dept.deptName = data.dept.deptName;
            self.dept.upTime = data.dept.upTime;
            self.dept.downTime = data.dept.downTime;
          }
        }, error: function (err) {
          console.log(err);
          self.$alert(err.responseText);
        }
      })
    },
  },
  mounted() {
    this.loadData();
    this.startRange();
    this.curName = sessionStorage.getItem("userName");
    this.userId = sessionStorage.getItem("userId")
    this.curId = sessionStorage.getItem("staffId")
  }
}
</script>

<style scoped></style>