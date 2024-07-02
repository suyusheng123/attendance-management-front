<!--审核列表-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>特殊管理</el-breadcrumb-item>
      <el-breadcrumb-item>加班审核</el-breadcrumb-item>
    </el-breadcrumb>
    <br>

    <el-row>
      <!-- <el-col :span="4">
          <template>
            <el-select v-model="value" placeholder="请选择" style="width: 120px"  @change="isChange(value)">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
</el-col>
-->

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
            <el-input placeholder="请输入查询部门" v-model="leavePage.staffDevelopment"></el-input>
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
          <span>{{ x.row.staffDevelopment }}</span>
        </template>
      </el-table-column>

      <!--        <el-table-column label="类型" width="100px">
          <template slot-scope="x">
            <span>{{x.row.leaveType}}</span>
          </template>
        </el-table-column>-->
      <!--通过选择请假还是出差判断是否有这两个字段-->

      <el-table-column label="申请时间" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.applyTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="起始时间" width="100px">
        <template slot-scope="x">
          <span>{{ x.row.overBegin }}</span>
        </template>
      </el-table-column>

      <el-table-column label="结束时间" width="100px">
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
          <span>{{ x.row.auditResult }}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" width="280" align="center">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <el-button type="success" :disabled="x.row.auditState === 1" icon="el-icon-edit" size="small"
            @click="edit(x.$index, x.row)">审核</el-button>
          <el-button type="danger"  :disabled="x.row.auditState === 0" icon="el-icon-delete" size="small" @click="del(x.$index, x.row)">撤销审核</el-button>
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
        <el-form label-width="90px" :rules="rules" ref="myForm" :model="audit">
          <el-form-item label="审核人姓名">
            <el-col :span="20">
              <input v-model="audit.approverId" disabled type="hidden" />
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
                <el-select v-model="audit.approverDepartment" placeholder="请选择部门" disabled />
              </el-col>
            </el-col>
          </el-form-item>

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
      rules: {
        auditResult: [
          { required: true, message: '不允许为空', trigger: 'change' }
        ]
      },
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
      list: [],
      title: "修改",
      leavePage: {//分页对象
        page: 1, //页码
        row: 10,  //每页显示条数
        total: 0,  //总条数
        staffName: "",
        staffDevelopment: "",
      },
      staffId: ""
    }
  },
  methods: {
    /*页面加载*/
    loadData() {
      var self = this;
      var url = myUtile.url + "/overtime/queryAll";
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
      //this.leave.id=x.id;
      this.$nextTick(() => {
        this.$refs.myForm.validate();
      });
      this.audit.approverId = this.staffId;
      this.audit.staffId = x.staffId;
      this.audit.approverName = sessionStorage.getItem("name");
      this.audit.leaveType = "加班";
      this.audit.approverDepartment = sessionStorage.getItem("department");


      this.leave.id = x.id,
        this.leave.staffId = x.staffId;
      this.leave.staffName = x.staffName;
      this.leave.staffDevelopment = x.staffDevelopment;
      this.leave.applyTime = x.applyTime;
      this.leave.overBegin = x.overBegin;
      this.leave.overEnd = x.overEnd;
      // 审核状态
      this.leave.auditState = x.auditState;
      // 审核结果
      this.leave.auditResult = x.auditResult;
    },
    sure(myForm) {
      this.leave.auditState = 1;
      var self = this;
      this.$refs[myForm].validate((valid) => {
        if (valid) {
          let overtime = {
            id: self.leave.id,
            auditState: self.leave.auditState,
            approverId: self.audit.approverId,
            approverName: self.audit.approverName,
            approverDepartment: self.audit.approverDepartment,
            staffId: self.audit.staffId,
            leaveType: self.audit.leaveType,
            auditResult: self.audit.auditResult
          };
          $.ajax({
            url: myUtile.url + "/overtime/updateAndAdd",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(overtime),
            success: function (data) {
              self.$message(data.info);
              if (data.info === "审核成功") {
                self.isShow = false;
                self.loadData();
              }
            },
            error: function (error) {
              console.error(error);
              self.$alert("审核失败");
            }
          })
        } else {
          this.$alert("提交数据有误");
          return false;
        }
      });
    },
    closeWin() {
      this.isShow = false;
    },
    del(index, x) {
      let id = x.id;
      var self = this;
      this.$confirm("你确定要撤销审核吗？").then(function () {
        $.ajax({
          url: myUtile.url + "/overtime/updateState",
          type: "get",
          data: { id: id },
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
            self.$alert("撤销审核失败");
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
