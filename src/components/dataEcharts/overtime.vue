<template>

    <div>
      <el-row>
      <el-col :span="5">
        <el-form label-width="100px">
          <el-form-item label="按部门查询:">
            <el-select v-model="xuanBumenName" @change="seletbumen()" placeholder="请选择部门查询">
              <el-option
                v-for="x in BumenName"
                :key="x.deptName"
                :label="x.deptName"
                :value="x.deptName"
                >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      </el-row>
  
      <div id="ddd" style="width: 1200px;height: 600px"></div>
  
  
    </div>
  </template>
  
  <script>
    import * as echarts from 'echarts';
    import myUtil from "../../utile/myUtile";
  
    export default {
      name: "qingjia",
      data(){
        return{
        BumenName:[],
          xuanBumenName:"",
        options:{
          title: {
            text: '部门每月加班总天数'
          },
          tooltip: {},
          xAxis: {
            data: ['一月', '二月', '三月', '四月', '五月', '六月','七月','八月','九月','十月','十一月','十二月']
          },
          yAxis: {},
          series: [
            {
              name: '加班天数',
              type: 'bar',
              data: []
            }
          ]
        }
        }
  
      },
      methods: {
        barPicture() {
          //基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('ddd'));
          // 绘制图表
          myChart.setOption(this.options);
  
        },
        login(){
          var self=this
          $.ajax({
            url:myUtil.url+"/overtime/selectMonth",
            type:"get",
            dataType:"json",
            success:function(data){
              self.options.series[0].data=data.overtimeList;
              self.BumenName=data.selectBumenName;
              console.log(self.BumenName);
              self.barPicture();
            }
          })
  
        },
        seletbumen(){
          var self=this
          $.ajax({
            url:myUtil.url+"/overtime/selectDept",
            type:"get",
            data:{
                xuanBumenName:self.xuanBumenName
            },
            dataType: "json",
            success:function (data) {
              self.options.series[0].data=data.integerList;
              self.barPicture();
  
            }
  
          })
        }
  
      },
      mounted() {
        this.login();
  
  
      }
    }
  </script>
  
  <style scoped>
  
  </style>
  