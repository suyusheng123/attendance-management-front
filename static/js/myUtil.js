var myUtil = {
    url: "http://localhost:8080",
    valNum: function(v) { //验证文本框只能输入数字
      //定义一个正则表达式对象
      var rs = /^[0-9]*$/;
      if (rs.test(v)) {
        return true;
      } else {
        return false;
      }
    }
}
export default myUtil;
