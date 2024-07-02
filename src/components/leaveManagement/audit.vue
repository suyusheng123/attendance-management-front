<!--审核列表-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>差假管理</el-breadcrumb-item>
      <el-breadcrumb-item>审核记录</el-breadcrumb-item>
    </el-breadcrumb>
    <br>

    <el-row>
      <el-col :span="4">
        <template>
          <el-select v-model="value" placeholder="请选择" style="width: 120px" @change="isChange(value)">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-col>

      <el-col :span="8">
        <el-form label-width="150px">
          <el-form-item label="姓名">
            <el-input placeholder="请输入查询姓名" v-model="leavePage.staffName"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="8">
        <el-form label-width="150px">
          <el-form-item label="部门">
            <el-input placeholder="请输入查询部门" v-model="leavePage.staffDepartment"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="4" style="padding-left: 5px;padding-top: 5px">
        <el-button icon="el-icon-search" size="small" type="success" @click="loadData">查询</el-button>
        <!-- <el-button icon="el-icon-message" size="small" type="success" @click="add()">新增</el-button>-->
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

      <!--        <el-table-column label="类型" width="100px">
          <template slot-scope="x">
            <span>{{x.row.leaveType}}</span>
          </template>
        </el-table-column>-->
      <!--通过选择请假还是出差判断是否有这两个字段-->

      <el-table-column label="交通工具" width="100px" v-if="onShow">
        <template slot-scope="x">
          <span>{{ x.row.travelVehicle }}</span>
        </template>
      </el-table-column>

      <el-table-column label="预支费用" width="100px" v-if="onShow">
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

      <el-table-column label="操作" width="280" align="center">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <el-button type="success" :disabled="x.row.auditState === 1" icon="el-icon-edit" size="small"
            @click="edit(x.$index, x.row)">审核</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" :disabled="x.row.auditState === 0"
          @click="del(x.$index, x.row)">撤销审核</el-button>
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
        <el-form label-width="90px" :model="audit" ref="myForm" :rules="rules">


          <el-form-item label="审核人姓名">
            <el-col :span="20">
              <input v-model="audit.approverId" disabled type="hidden"></input>
              <input type="hidden" v-model="leave.id">
              <el-input v-model="audit.approverName" disabled></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="审核类型">
            <el-col :span="20">
              <el-input disabled v-model="audit.leaveType"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="审核部门">
            <el-col :span="20">
              <el-col :span="20">
                <el-select v-model="leave.staffDepartment" placeholder="请选择部门" disabled>
                </el-select>
              </el-col>
            </el-col>
          </el-form-item>
<!-- 
          <el-form-item label="审核建议">
            <el-col :span="20">
              <el-input v-model="audit.approverSuggestion" type="hidden"></el-input>
            </el-col>
          </el-form-item> -->

          <el-form-item label="审核结果" prop="auditResult">
            <el-col :span="20">
              <el-select v-model="audit.auditResult" placeholder="请选择">
                <el-option label="通过" value="通过"></el-option>
                <el-option label="未通过" value="未通过"></el-option>
              </el-select>
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
  name: "audit",
  data() {
    return {
      rules: {
        auditResult: [
          { required: true, message: '请输入审核结果', trigger: 'change' }
        ]
      },
      option: [
        { label: "研发部门", value: "研发部门" },
        { label: "产品部门", value: "产品部门" },
        { label: "人事部门", value: "人事部门" },
        { label: "销售部门", value: "销售部门" },
      ],
      curName: "",
      onShow: false,
      isShow: false,
      flag: false,
      leave: {
        id: 0,
        staffId: 0,
        staffName: "",
        staffDepartment: "",
        leaveType: "",
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
      audit: {
        id: 0,
        staffId: "",
        approverId: 0,
        approverName: "",
        leaveType: "",
        approverDepartment: "",
        approverSuggestion: "",
        auditResult: "",
      },
      options: [{
        value: '选项1',
        label: '请假列表'
      }, {
        value: '选项2',
        label: '出差列表'
      }],
      value: '选项1',
      list: [],
      title: "修改",
      leavePage: {//分页对象
        page: 1, //页码
        row: 10,  //每页显示条数
        total: 0,  //总条数
        staffName: "",
        staffDepartment: "",
        leaveType: ""
      },
      staffId: ""
    }
  },
  methods: {
    isChange(value) {
      this.loadData();
    },
    /*页面加载*/
    loadData() {
      var self = this;
      var url;
      if (this.value === "选项1") {
        self.leavePage.leaveType = "请假"
        url = myUtile.url + "/leaveTable/selectAllLeave";
      } else {
        self.leavePage.leaveType = "出差"
        url = myUtile.url + "/leaveTable/selectAllBusiness";
      }
      $.ajax({
        url: url,
        type: "get",
        data: self.leavePage,
        dataType: "json",
        success: function (data) {
          console.log(data);
          self.list = data.list;
          //总条数
          self.leavePage.total = Number(data.total);
        },
        error: function (err) {
          console.log(err);
          self.$alert(err.responseText);
        }
      })
    },
    edit(index, x) {
      /*根据员工序号编辑(不是员工号)*/
      /*虽然是编辑  但其实是对另一张表进行添加操作*/
      console.log(index);
      console.log(x);
      //显示对话框
      this.isShow = true;
      this.title = "审核";
      //数据回显
      this.audit.id = x.id;
      this.audit.approverId = this.staffId;
      this.audit.staffId = x.staffId;
      this.audit.approverName = sessionStorage.getItem("name");
      this.audit.leaveType = x.leaveType;
      this.audit.approverDepartment = sessionStorage.getItem("department");
      this.audit.approverSuggestion = "";
      this.audit.auditResult = "";

      this.leave.id = x.id,
      this.leave.staffId = x.staffId;
      this.leave.staffName = x.staffName;
      this.leave.staffDepartment = x.staffDepartment;
      this.leave.leaveType = x.leaveType;
      this.leave.travelVehicle = x.travelVehicle;
      this.leave.prepaidExpenses = x.prepaidExpenses;
      this.leave.leaveTime = x.leaveTime;
      this.leave.leaveBeginTime = x.leaveBeginTime;
      this.leave.leaveEndTime = x.leaveEndTime;
      this.leave.auditState = x.auditState;
      this.leave.approverSuggestion = "";
      this.leave.leaveReason = x.leaveReason;
      this.$nextTick(() => {
        this.$refs.myForm.validate();
      });

    },
    sure(myForm) {
      this.$refs[myForm].validate((valid) => {
        if (valid) {
          var self = this;
          self.leave.approverSuggestion = self.audit.approverSuggestion;
          self.leave.auditState = 1;
          self.leave.auditResult = self.audit.auditResult;
          $.ajax({
            url: myUtile.url + "/leaveTable/update",
            type: "get",
            data: self.leave,
            dataType: "json",
            success: function (data) {
              self.$message(data.info);
              if (data.info === "新增成功" || data.info === "修改成功") {
                console.log(data.info);

              }
            }, error: function (err) {
              console.log(err);
              self.$alert("服务器错误,请联系管理员");
            }
          });
          $.ajax({
            url: myUtile.url + "/leaveTable/updateAndAdd",
            type: "get",
            data: self.audit,
            async: false,
            dataType: "json",
            success: function (data) {
              alert(data.info);
              if (data.info === "审核成功") {
                self.isShow = false;
                //刷新
                self.loadData();
              }
            }, error: function (err) {
              console.log(err);
              self.$alert("服务器错误,请联系管理员");
            }
          });
        } else {
          this.$alert("审核结果没选择");
          return false;
        }
      });
    },

    closeWin() {
      this.isShow = false;
    },
    del(index, x) {
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
      var self = this;
      this.$confirm("你确定要撤销审核吗？").then(function () {
        $.ajax({
          url: myUtile.url + "/leaveTable/updatesState",
          type: "get",
          data: self.leave,
          dataType: "json",
          success: function (data) {
            alert(data.info);
            if (data.info === "撤销审核成功") {
              self.isShow = false;
              //刷新
              self.loadData();
            }
          }, error: function (err) {
            console.log(err);
            self.$alert(err.responseText);
          }
        })
      }).catch(function () {
        self.$message("你已撤销审核")
      })
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
    }
  },

  mounted() {
    this.loadData();
    this.curName = sessionStorage.getItem("userName");
    this.staffId = sessionStorage.getItem("staffId");
  }
}
</script>

<style scoped></style>
