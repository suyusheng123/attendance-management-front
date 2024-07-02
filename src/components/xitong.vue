<template>

  <div>
    <el-row>
      <el-col :span="5">
        <el-form label-width="100px">
          <el-form-item label="按月份查询:">
            <el-select v-model="xuanBumenName" @change="seletbumen()" placeholder="请选择月份查询">
              <el-option
                v-for="x in BumenName"
                :key="x"
                :label="x"
                :value="x"
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
  import myUtil from "../utile/myUtile"
  export default {
    name: "qingjia",
    data(){
      return{
        BumenName:[],
        xuanBumenName:"",
        options: {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['80%', '50%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [

              ]
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
          url: myUtil.url+"/leaveTable/listMaxqingjia",
          type:"get",
          dataType:"json",
          success:function(data){
            self.options.series[0].data=data.qingjiaMaxArrayList;
            self.BumenName=data.yuefen;
            // console.log(self.BumenName);
            self.barPicture();
          }
        })

      },
      seletbumen(){
        var self=this
        $.ajax({
          url:myUtil.url+"/leaveTable/listMaxaaaqingjia",
          type:"post",
          data:self.xuanBumenName,
          dataType: "json",
          success:function (data) {
            self.options.series[0].data=data.qingjiaMaxArrayList;
            self.barPicture();

          }

        })
      },

    },
    mounted() {
      this.login();


    }
  }
</script>

<style scoped>

</style>
