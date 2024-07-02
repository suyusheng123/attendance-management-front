<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>考勤管理</el-breadcrumb-item>
      <el-breadcrumb-item>考勤查询</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-row>
      <el-col :span="5">
        <el-form label-width="100px">
          <el-form-item label="部门:">
            <el-select v-model="attendanceInformationPage.departmentSelect" placeholder="请选择部门">
              <el-option
                v-for="x in depat"
                :key="x.deptName"
                :label="x.deptName"
                :value="x.deptName"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="5">
        <el-form label-width="100px">
          <el-form-item label="姓名:">
            <el-input placeholder="请输入查询姓名" v-model="attendanceInformationPage.name"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="5">
        <el-form label-width="50px">
          <el-form-item label="日期:">
            <el-date-picker
              v-model="attendanceInformationPage.beginTime"
              type="date"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              placeholder="请选择起始日期">
            </el-date-picker>
          </el-form-item>
<!--          <el-form-item>
            <el-input placeholder="请输入查询结束日期"></el-input>
          </el-form-item>-->
        </el-form>
      </el-col>

      <el-col :span="5">
        <el-form label-width="30px">
          <el-form-item label="-">
            <el-date-picker
              v-model="attendanceInformationPage.endTime"
              type="date"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd"
              placeholder="请选择结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="4" style="padding-left: 5px;">
        <el-button icon="el-icon-search" size="small" type="success" @click="attSelect()">查询</el-button>
      </el-col>
    </el-row>
    <br>
    <!-- :data 绑定的json数组 -->
    <el-table :data="list" style="width: 100%;"  >

      <el-table-column label="编号" width="120" type="index">
        <!-- slot-scope 插槽 -->

      </el-table-column>


      <el-table-column label="员工姓名" width="150">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{x.row.staffName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="部门" width="150">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{x.row.department}}</span>
        </template>
      </el-table-column>

      <el-table-column label="上班打卡时间" width="200">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{x.row.clockInTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="下班打卡时间" width="200">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{x.row.clockOutTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="打卡日期" width="200">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{x.row.clockDate}}</span>
        </template>
      </el-table-column>

      <el-table-column label="备注" width="200">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{x.row.remarks}}</span>
        </template>
      </el-table-column>



    </el-table>
    <div class="block">

      <!-- size-change 下来框选中触发的事件 -->
      <!-- current-change 选中当前页码触发的事件 -->
      <!-- current-page 当前页绑定的值-->
      <!-- page-size 每页显示条数数-->
      <!-- total 总条数 -->

      <el-pagination
        @size-change="selectRow"
        @current-change="currentPage"
        :current-page="attendanceInformationPage.page"
        :page-sizes="[3, 5, 7, 10]"
        :page-size="attendanceInformationPage.row"
        layout="total,sizes, prev, pager, next, jumper"
        :total="attendanceInformationPage.total">
      </el-pagination>
    </div>


  </div>
</template>

<script>
     /* 导入myUtile工具类*/
    import myUtile from "../../utile/myUtile"

    export default {
      name: "attendanceInformationList",
      data(){
        return{
          list:[],
          attendanceInformationPage:{//分页对象
            page:1, //页码
            row:10,  //每页显示条数
            total:0,  //总条数
            beginTime:"",
            endTime:"",
            name:"",
            departmentSelect:""
          },
          depat:["人事","就业"]//部门数组
        }
      },
      methods:{
        loadData(){ //加载列表
          const self = this;
          $.ajax({
            url:myUtile.url+"/attendance/attendceanList",
            type:"get",
            data:self.attendanceInformationPage,
            dataType:"json",
            success:function(data){
              self.list = data.list;
              self.depat = data.depts;
              //总条数
              self.attendanceInformationPage.total = Number(data.total);
            }
          })
        },
        selectRow(row){//分页下拉框触发 的事件
          this.attendanceInformationPage.row=row;
          //刷新
          this.loadData();
        },
        currentPage(curPage){//页码触发事件
          this.attendanceInformationPage.page=curPage;
          //刷新
          this.loadData();
        },
        attSelect(){
          this.attendanceInformationPage.page=1;
          this.loadData();
        }
      },
      mounted(){
        this.loadData();
      }
    }
</script>

<style>

</style>
