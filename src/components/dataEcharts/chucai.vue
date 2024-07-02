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
                :value="x.deptName">
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
    name: "chucai",
    data(){
      return{
        BumenName:[],
        xuanBumenName:"",
        options : {
          title: {
            text: '每月总出差数',
            subtext: 'Business Trip',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '当月出差总数',
              type: 'pie',
              radius: '75%',
              data: [
                { value: 555, name: '一月' },
                { value: 735, name: '二月' },
                { value: 580, name: '三月' },
                { value: 484, name: '四月' },
                { value: 300, name: '五月' },
                { value: 300, name: '六月' },
                { value: 484, name: '七月' },
                { value: 484, name: '八月' },
                { value: 484, name: '九月' },
                { value: 484, name: '十月' },
                { value: 484, name: '十一月' },
                { value: 484, name: '十二月' },

              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
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
          url:myUtil.url+"/leaveTable/listAllchu",
          type:"get",
          dataType:"json",
          success:function(data){
            self.options.series[0].data=data.chuchaiList;
            self.BumenName=data.selectBumenName;
            console.log(self.options.series[0].data);
            self.barPicture();
          }
        })

      },
      seletbumen(){
        var self=this
        $.ajax({
          url:myUtil.url+"/leaveTable/listBumenChu",
          type:"post",
          data:self.xuanBumenName,
          dataType: "json",
          success:function (data) {
            self.options.series[0].data=data.chuchaiList;
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
