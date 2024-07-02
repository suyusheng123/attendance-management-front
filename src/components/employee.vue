<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      <el-breadcrumb-item>信息维护</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-row>

      <el-col :span="6">
        <el-form label-width="150px">
          <el-form-item label="员工编号">
            <el-input v-model="employeePage.staffId" placeholder="请输入查询编号"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="6">
        <el-form label-width="150px">
          <el-form-item label="姓名">
            <el-input v-model="employeePage.staffName" placeholder="请输入查询姓名"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="6">
        <el-form label-width="150px">
          <el-form-item label="部门">
            <el-select v-model="employeePage.department" placeholder="请下拉选择部门">
              <el-option v-for="x in option" :key="x.deptName" :label="x.deptName" :value="x.deptName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="6" style="padding-left: 5px;">
        <el-button icon="el-icon-search" size="small" type="success" @click="loadData">查询</el-button>
        <!-- <el-button icon="el-icon-message" size="small" type="danger" @click="add()">新增</el-button> -->
      </el-col>

    </el-row>
    <br>
    <!-- :data 绑定的json数组 -->
    <el-table :data="list" style="width: 100%;">

      <!--  label是设置列名称-->
      <el-table-column label="员工编号" width="100">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.staffId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="员工姓名" width="100">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.staffName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="性别" width="100">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.staffSex }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="密码" width="100">
        &lt;!&ndash; slot-scope 插槽 &ndash;&gt;
        <template slot-scope="x">
          <span>{{x.row.staffPwd}}</span>
        </template>
      </el-table-column>-->

      <el-table-column label="部门" width="100">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.department }}</span>
        </template>
      </el-table-column>

      <el-table-column label="系统角色" width="100">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.sysRole }}</span>
        </template>
      </el-table-column>

      <el-table-column label="员工电话" width="150">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.staffPhone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="员工邮箱" width="200">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.staffEmail }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="请假剩余次数" width="110">
        slot-scope 插槽 
        <template slot-scope="x">
          <span>{{ x.row.leaveTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="迟到剩余次数" width="110">
        slot-scope 插槽
        <template slot-scope="x">
          <span>{{ x.row.lateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="早退剩余次数" width="110">
        <template slot-scope="x">
          <span>{{ x.row.earlyTime }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="操作" width="200">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <el-button type="success" icon="el-icon-edit" size="small" @click="edit(x.$index, x.row)">修改</el-button>
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

      <el-pagination @size-change="selectRow" @current-change="currentPage" :current-page="employeePage.page"
        :page-sizes="[3, 5, 7, 10]" :page-size="employeePage.row" layout="total,sizes, prev, pager, next, jumper"
        :total="employeePage.total">
      </el-pagination>
    </div>

    <!-- 对话框-->
    <el-dialog :title="title" :visible="isShow" width="30%" :before-close="closeWin" center>

      <el-form label-width="80px" :model="employee" :rules="rules" ref="myForm">
        <br>

        <el-form-item label="员工姓名" prop="staffName">
          <el-col :span="20">
            <el-input v-model="employee.staffName" placeholder="请输入姓名"></el-input>
            <input type="hidden" v-model="employee.id"></input>
          </el-col>
        </el-form-item>

        <el-form-item label="性别" prop="staffSex">
          <el-col :span="20">
            <el-radio v-model="employee.staffSex" label="男">男</el-radio>
            <el-radio v-model="employee.staffSex" label="女">女</el-radio>
          </el-col>
        </el-form-item>

       

        <el-form-item label="部门" prop="department">
          <el-col :span="20">
            <el-select v-model="employee.department" placeholder="请选择部门">
              <el-option v-for="x in option" :key="x.deptName" :label="x.deptName" :value="x.deptName">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="系统角色" prop="sysRole">
          <el-col :span="20">
            <el-select v-model="employee.sysRole" placeholder="请选择部门">
              <el-option v-for="x in op" :key="x.sysRoleName" :label="x.sysRoleName" :value="x.sysRoleName">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="电话" prop="staffPhone">
          <el-col :span="20">
            <el-input v-model="employee.staffPhone" placeholder="请输入电话"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="邮箱" :rules="isAdding ? emailRules : []">
          <el-col :span="20">
            <el-input v-model="employee.staffEmail" :disabled="employee.staffEmail !== ''"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <el-button type="success" @click="sure('myForm')" round>确定</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="danger" @click="closeWin" round>取消</el-button>
          </el-col>

        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
/* 导入myUtile工具类*/
import myUtile from "../utile/myUtile"

export default {
  name: "employee",
  data() {
    var validatePhone = (rule, value, callback) => {
      var phoneRegex = /^1[3456789]\d{9}$/;
      if (!phoneRegex.test(value)) {
        callback(new Error('无效的电话号码'));
      }else{
        callback();
      } 
    };
    return {
      isAdding: true, // 判断是添加还是编辑操作
      show: false,//修改或增加的时候，密码显示与否。
      isShow: false,// 对话框是否显示
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
      option: [],//部门数组
      op: [],//系统角色数组
      list: [],
      title: "修改",
      employeePage: {//分页对象
        page: 1, //页码
        row: 10,  //每页显示条数
        total: 0,  //总条数
        id: "",
        staffName: "",
        department: "",
        staffId: "",
      },
      rules: {
        staffPhone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'change' }
        ],
        staffName: [
          {  required: true ,message: '请输入员工姓名', trigger: 'blur' }
        ],
        staffSex: [
          {  required: true ,message: '请选择性别', trigger: 'blur' }
        ],
        department: [
          { required: true ,message: '请选择部门', trigger: 'blur' }
        ],
        sysRole: [
          {  required: true ,message: '请选择系统角色', trigger: 'blur' }
        ],
      },
      emailRules: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]
    }
  },
  methods: {
    edit(index, x) {//编辑
      console.log(index);
      console.log(x);
      //显示对话框
      this.isShow = true;
      this.isAdding = false;
      //密码不显示
      this.show = false;
      this.title = "修改";
      //数据回显
      this.employee.id = x.id;
      this.employee.staffName = x.staffName;
      this.employee.staffId = x.staffId;
      this.employee.staffSex = x.staffSex;
      this.employee.staffPwd = x.staffPwd;
      this.employee.department = x.department;
      this.employee.sysRole = x.sysRole;
      this.employee.staffPhone = x.staffPhone;
      this.employee.staffEmail = x.staffEmail;

    },
    del(index, x) {//删除
      var self = this;
      this.$confirm("你确定要删除吗?").then(function () {
        $.ajax({
          url: myUtile.url + "/employee/del",
          type: "get",
          data: { "id": x.id, "staffId": x.staffId },
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
      //密码框显示
      this.show = true;
      this.isAdding = true;
      this.title = "新增";
      //数据回显
      this.employee.staffName = "";
      this.employee.staffSex = "";
      this.employee.staffPwd = "123456";
      this.employee.department = "";
      this.employee.sysRole = "";
      this.employee.staffPhone = "";
      this.employee.staffEmail = "";
    },
    sure(myForm) { //关闭对话框
      this.$refs[myForm].validate((valid) => {
        if (valid) {
          const self = this;
          let url = "";
          //===相当于equals
          if (this.title === "修改") {
            url = myUtile.url + "/employee/update";
          } else {
            url = myUtile.url + "/employee/add";
          }
          $.ajax({
            url: url,
            type: "get",
            data: self.employee,
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
              self.$alert("操作失败");
            }
          })
        } else {
          this.$alert("输入数据有误");
        }
      });
    },
    loadData() { //加载列表
      //this.isShow = false;
      const self = this;
      $.ajax({
        url: myUtile.url + "/employee/list",
        type: "get",
        data: self.employeePage,
        dataType: "json",
        success: function (data) {
          console.log(data);
          self.list = data.list;
          self.option = data.deptNames;
          self.op = data.sysRoles;
          //总条数
          console.log(self);
          self.employeePage.total = Number(data.total);
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
      this.employeePage.row = row;
      //刷新
      this.loadData();
    },
    currentPage(curPage) {//页码触发事件
      this.employeePage.page = curPage;
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
