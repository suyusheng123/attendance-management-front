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
  /* 导入myUtile工具类*/
  import myUtil from "../../utile/myUtile";
  export default {
    name: "qingjia",
    data(){
      return{
        BumenName:[],
        xuanBumenName:"",
        options : {
          title: {
            text: '考勤情况'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['迟到', '早退', '迟到,早退', '缺勤']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '迟到',
              type: 'line',
              stack: 'Total',
              data: []
            },
            {
              name: '早退',
              type: 'line',
              stack: 'Total',
              data: []
            },
            {
              name: '迟到,早退',
              type: 'line',
              stack: 'Total',
              data: []
            },
            {
              name: '缺勤',
              type: 'line',
              stack: 'Total',
              data: []
            },

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
          url:myUtil.url+"/leaveTable/listAllKaoqing",
          type:"get",
          dataType:"json",
          success:function(data){
            self.options.series[0].data=data.AllKaoqingChidaoList;
            self.options.series[1].data=data.AllKaoqingZaotuiList;
            self.options.series[2].data=data.AllKaoqingChidaoZaotuiList;
            self.options.series[3].data=data.AllKaoqingQueqingList;
            self.BumenName=data.selectBumenName;
            // console.log(self.BumenName);
            self.barPicture();
          }
        })

      },
      seletbumen(){
        var self=this
        $.ajax({
          url:myUtil.url+"/leaveTable/listBumenKaoqing",
          type:"post",
          data:self.xuanBumenName,
          dataType: "json",
          success:function (data) {
            self.options.series[0].data=data.AllKaoqingChidaoList;
            self.options.series[1].data=data.AllKaoqingZaotuiList;
            self.options.series[2].data=data.AllKaoqingChidaoZaotuiList;
            self.options.series[3].data=data.AllKaoqingQueqingList;
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
