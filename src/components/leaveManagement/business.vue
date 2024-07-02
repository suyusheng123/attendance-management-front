<!--请假列表-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>差假管理</el-breadcrumb-item>
      <el-breadcrumb-item>出差记录</el-breadcrumb-item>
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
        <el-button size="small" type="success" @click="add()">出差申请</el-button>
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
          <span>{{ x.row.staffDepartment }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="类型" width="100px">
        <template slot-scope="x">
          <span>{{x.row.leaveType}}</span>
        </template>
      </el-table-column>-->
      <!--通过选择请假还是出差判断是否有这两个字段-->

      <el-table-column label="交通工具" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.travelVehicle }}</span>
        </template>
      </el-table-column>

      <el-table-column label="预支费用" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.prepaidExpenses }}</span>
        </template>
      </el-table-column>



      <el-table-column label="请假时间" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.leaveTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="起始时间" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.leaveBeginTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="结束时间" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.leaveEndTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="请假理由" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.leaveReason }}</span>
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
          <span>{{ x.row.auditResult }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="审核意见" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.approverSuggestion }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="190" align="center">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <el-button type="success" :disabled="x.row.auditState === 1" icon="el-icon-edit" size="small"
            @click="edit(x.$index, x.row)">修改
          </el-button>
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
              <el-input v-model="leave.staffName" disabled></el-input>
              <input v-model="leave.staffId" type="hidden"></input>
              <input type="hidden" v-model="leave.id">
            </el-col>
          </el-form-item>

          <el-form-item label="部门">
            <el-col :span="20">
              <el-select v-model="leave.staffDepartment" disabled>
              </el-select>
            </el-col>
          </el-form-item>

          <!--<el-form-item label="类型">
            <el-col :span="20">
              <el-input v-model="leave.leaveType"></el-input>
            </el-col>
          </el-form-item>-->

          <el-form-item label="交通工具" prop="travelVehicle">
            <el-col :span="20">
              <el-input v-model="leave.travelVehicle"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="预支费用" prop="prepaidExpenses">
            <el-col :span="20">
              <el-input v-model="leave.prepaidExpenses"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="申请时间" prop="leaveTime">
            <el-col :span="20">
              <el-date-picker v-model="leave.leaveTime" type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd"
                placeholder="请选择日期" disabled>
              </el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="起始时间" prop="leaveBeginTime">
            <el-col :span="20">
              <el-date-picker v-model="leave.leaveBeginTime" type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd"
                placeholder="请选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="结束时间" prop="leaveEndTime">
            <el-col :span="20">
              <el-date-picker v-model="leave.leaveEndTime" type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd"
                placeholder="请选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="申请理由" prop="leaveReason">
            <el-col :span="20">
              <el-input v-model="leave.leaveReason"></el-input>
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
import { valid } from "semver";
import myUtile from "../../utile/myUtile";

export default {
  name: "leave",
  data() {
    return {
      rules: {
        leaveTime: [{ required: true, message: "请选择申请时间", trigger: "blur" }],
        leaveBeginTime: [{ required: true, message: "请选择起始时间", trigger: "blur" },
        {
          validator: (rule, value, callback) => {
            let date = this.leave.leaveTime;
            let newDate;
            if (!date.includes("-")) {
              newDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            } else {
              newDate = date;
            }
            if (value < newDate) {
              callback(new Error('起始时间必须大于申请时间'));
            }
            else {
              callback();
            }
          },
          trigger: 'blur',
        },
        ],
        leaveEndTime: [{ required: true, message: "请选择结束时间", trigger: "blur" },
        {
          validator: (rule, value, callback) => {
            if (value <= this.leave.leaveBeginTime) {
              callback(new Error('结束时间必须大于开始时间'));
            }
            else {
              callback();
            }
          },
          trigger: 'blur',
        },
        ],
        leaveReason: [{ required: true, message: "请输入请假理由", trigger: "blur" }],
        travelVehicle: [{ required: true, message: "请输入交通工具", trigger: "blur" }],
        prepaidExpenses: [{ required: true, message: "请输入预支费用", trigger: "blur" }]
      },
      curId: "",
      option: [
        { label: "研发部门", value: "研发部门" },
        { label: "产品部门", value: "产品部门" },
        { label: "人事部门", value: "人事部门" },
        { label: "销售部门", value: "销售部门" },
      ],
      list: [],
      isShow: false,
      leave: {
        id: 0,
        staffId: 0,
        staffName: "",
        staffDepartment: "",
        leaveType: "出差",
        travelVehicle: "",
        prepaidExpenses: "",
        leaveTime: "",
        leaveBeginTime: "",
        leaveEndTime: "",
        leaveReason: "",
        auditState: "",
        approverSuggestion: "",
        auditResult: ""
      },
      leavePage: {//分页对象
        page: 1, //页码
        row: 10,  //每页显示条数
        total: 0  //总条数
      },
      title: "xxxx"
    }
  },
  methods: {
    formatDate(date) {
      if (!date.includes('-'))
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      else return date;
    },
    /*新增方法====================================*/
    add: function () {
      let date = new Date();
      let dateStr = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      this.isShow = true;
      this.title = "出差申请";
      //数据回显
      this.leave.staffId = this.curId;
      this.leave.staffName = sessionStorage.getItem("name");
      this.leave.staffDepartment = sessionStorage.getItem("department");
      this.leave.leaveType = "出差";
      this.leave.travelVehicle = "";
      this.leave.prepaidExpenses = "";
      this.leave.leaveTime = dateStr;
      this.leave.leaveBeginTime = "";
      this.leave.leaveEndTime = "";
      this.leave.leaveReason = "";
      this.$nextTick(() => {
        this.$refs.myForm.validate();
      });
    },
    /*删除方法======================================*/
    del: function (index, x) {//撤销申请
      var self = this;
      this.$confirm("你确定要撤销申请吗？").then(function () {
        $.ajax({
          /*给出后端删除的路径*/
          url: myUtile.url + "/leaveTable/del",
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
      this.leave.staffDepartment = x.staffDepartment;
      this.leave.leaveType = x.leaveType;
      this.leave.travelVehicle = x.travelVehicle;
      this.leave.prepaidExpenses = x.prepaidExpenses;
      this.leave.leaveTime = x.leaveTime;
      this.leave.leaveBeginTime = x.leaveBeginTime;
      this.leave.leaveEndTime = x.leaveEndTime;
      this.leave.leaveReason = x.leaveReason;
    },
    sure(myForm) {
      this.$refs[myForm].validate((valid) => {
        if (valid) {
          this.leave.leaveTime = this.formatDate(this.leave.leaveTime);
          const self = this;
          let url = "";
          if (this.title === "修改") {
            url = myUtile.url + "/leaveTable/update";
          } else {
            url = myUtile.url + "/leaveTable/add";
          }
          $.ajax({
            url: url,
            type: "get",
            data: self.leave,
            dataType: "json",
            success: function (data) {
              self.$message(data.info);
              if (data.info === "新增成功" || data.info === "修改成功") {
                self.isShow = false;
                //刷新
                self.loadData();
              }
            }, 
            error: function (err) {
              console.log(err);
              self.$alert("服务器错误,请联系管理员");
            }
          })
        } else {
          this.$alert("输入数据有误");
          return false;
        }
      })

    },
    loadData() { //加载列表
      //this.isShow = false;
      const self = this;
      var staffId = sessionStorage.getItem("staffId");
      $.ajax({
        url: myUtile.url + "/leaveTable/selectByIdBusiness?staffId=" + staffId + "&leaveType=出差",
        type: "get",
        data: self.leavePage,
        dataType: "json",
        success: function (data) {
          console.log(data);
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
    selectRow(row) {//分页下拉框触发的事件
      console.log("row=" + row)
      this.leavePage.row = row;
      //刷新
      this.loadData();
    },
    currentPage(curPage) {//页码触发事件
      this.leavePage.page = curPage;
      //刷新
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
    this.curId = sessionStorage.getItem("staffId");
  }
}
</script>

<style scoped></style>
