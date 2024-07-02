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
          <el-form-item label="角色编号">
            <el-input v-model="rolePage.roleId" placeholder="请输入查询角色编号"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="8">
        <el-form label-width="150px">
          <el-form-item label="角色名称">
            <el-input v-model="rolePage.sysRoleName" placeholder="请输入查询角色名称"></el-input>
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

      <!-- <el-table-column label="角色编号" width="300">
        <template slot-scope="x">
          <span>{{ x.row.roleId }}</span>
        </template>
      </el-table-column> -->
      <!--  label是设置列名称-->
      <el-table-column label="角色名称" width="300">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.sysRoleName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="角色代码" width="200">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <span>{{ x.row.sysRoleCode }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="400">
        <!-- slot-scope 插槽 -->
        <template slot-scope="x">
          <el-button type="success" icon="el-icon-edit" size="small" @click="edit(x.$index, x.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="del(x.$index, x.row)">删除</el-button>
          <!--          <el-button type="danger" icon="el-icon-delete" size="small" @click="del(x.$index,x.row)">删除</el-button>-->
        </template>
      </el-table-column>

    </el-table>
    <div class="block">

      <!-- size-change 下来框选中触发的事件 -->
      <!-- current-change 选中当前页码触发的事件 -->
      <!-- current-page 当前页绑定的值-->
      <!-- page-size 每页显示条数数-->
      <!-- total 总条数 -->

      <el-pagination @size-change="selectRow" @current-change="currentPage" :current-page="rolePage.page"
        :page-sizes="[3, 5, 7, 10]" :page-size="rolePage.row" layout="total,sizes, prev, pager, next, jumper"
        :total="rolePage.total">
      </el-pagination>
    </div>

    <!-- 对话框-->
    <el-dialog :title="title" :visible="isShow" width="50%" :before-close="closeWin" center>

      <el-form label-width="80px" :rules="rules" :model="role" ref="myForm">
        <br>

        <el-form-item label="角色名称" prop="sysRoleName">
          <el-col :span="20">
            <el-input v-model="role.sysRoleName"></el-input>
            <input type="hidden" v-model="role.roleId"></input>
          </el-col>
        </el-form-item>

        <el-form-item label="角色代码">
          <el-col :span="20">
            <el-input v-model="role.sysRoleCode" disabled></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="权限分配">
          <el-col :span="20">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
          </el-col>
        </el-form-item>

        <template v-for="x in node">
          <el-form-item :label="x.name">
            <el-col :span="20">
              <el-checkbox-group v-model="role.checkedOption" @change="handleCheckedCitiesChange1">
                <!--                <el-checkbox  :label="x.index" :key="x.index">{{-->
                <!--                    x.name-->
                <!--                  }}-->
                <!--                </el-checkbox>-->
                <el-checkbox v-for="item in x.children" :label="item.index" :key="item.index">{{
                  item.name
                }}
                </el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>
        </template>


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
import myUtil from "../../utile/myUtile";

export default {
  name: "roleInfo",
  data() {
    return {
      rules: {
        sysRoleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      },
      baseLabel: [],
      checkAll: false,
      isIndeterminate: true,
      isShow: false,// 对话框是否显示
      onShow: true,
      role: {
        roleId: "",
        sysRoleName: "",
        sysRoleCode: "",
        checkedOption: [],

      }, rolePage: {
        page: 1, //页码
        row: 10,  //每页显示条数
        total: 0,  //总条数
        roleId: "",
        sysRoleName: "",
      }, list: [],
      title: "修改",
      node: []
    }
  },
  methods: {
    generateRandomString(length) {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    handleCheckAllChange(val) {
      this.role.checkedOption = val ? this.baseLabel : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange1(value) {

      let checkedCount = value.length;
      this.checkAll = checkedCount === this.role.checkedOption.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.role.checkedOption.length;
    },
    add: function () {//新增对话框
      //显示对话框
      this.isShow = true;
      this.title = "新增";
      //数据回显
      this.role.roleId = null;
      this.role.sysRoleName = null;
      this.role.sysRoleCode = this.generateRandomString(7);
      this.role.checkedOption = [];
      this.$nextTick(() => {
        this.$refs.myForm.validate();
      });
    },
    edit(index, x) {//编辑
      console.log(index);
      console.log(x);
      console.log(this.node);
      //显示对话框
      this.onShow = true;
      this.isShow = true;
      this.title = "修改";
      //数据回显
      this.role.roleId = x.roleId;
      this.role.sysRoleName = x.sysRoleName;
      this.role.sysRoleCode = x.sysRoleCode;
      this.checkedOption = [];
      this.loadCurPower(x);

    },
    sure(myForm) { //关闭对话框
      //this.isShow = false;
      this.$refs[myForm].validate((valid) => {
        if (valid) {
          const self = this;
          let url = "";
          if (this.title === "修改") {
            url = myUtile.url + "/sys-role/update";
          } else {
            url = myUtile.url + "/sys-role/add";
          }

          $.ajax({
            url: url,
            type: "get",
            data: self.role,
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
          url: myUtile.url + "/sys-role/del",
          type: "get",
          data: { "roleId": x.roleId },
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
    loadAllPower() {
      const self = this;
      $.ajax({
        url: myUtil.url + "/sys-power/selectAllPower",
        type: "get",
        dataType: "json",
        success: function (data) {
          console.log(data)
          // mythis.node = data.info
          self.node = data.info;
          self.baseLabel = data.permissions;

        }
      })

    },
    loadCurPower(x) {
      const self = this;
      $.ajax({
        url: myUtil.url + "/sys-power/selectPowerRoleId",
        type: "get",
        data: { "roleId": x.roleId },
        dataType: "json",
        success: function (data) {
          console.log(data)
          // mythis.node = data.info
          self.role.checkedOption = data.permissions;
        }
      })

    },
    closeWin() {
      this.role.baseLabel = [];
      this.isShow = false;
    },
    loadData() {
      //加载列表
      //this.isShow = false;
      const self = this;
      $.ajax({
        url: myUtile.url + "/sys-role/list",
        type: "get",
        data: self.rolePage,
        dataType: "json",
        success: function (data) {
          console.log(data);
          self.list = data.list;
          //总条数
          self.rolePage.total = Number(data.total);
        }, error: function (err) {
          console.log(err);
          self.$alert(err.responseText);
        }
      })
    },
    selectRow(row) {//分页下拉框触发 的事件
      console.log("row=" + row)
      this.rolePage.row = row;
      //刷新
      this.loadData();
    },
    currentPage(curPage) {//页码触发事件
      this.rolePage.page = curPage;
      //刷新
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
    this.loadAllPower();
  }
}
</script>

<style scoped></style>
