var myUtile = {

  url: "http://127.0.0.1:8080",
  // url: "http://192.168.6.100:8080",
  checkEmail: function (self,x) {

    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; //正则表达式
    if (x === "") { //输入不能为空
      self.$message("邮箱不能为空!");
      return false;
    } else if (!reg.test(x)) { //正则验证不通过，格式不对
      self.$message("邮箱格式不正确！");
      return false;
    } else {
      return true;
    }
  }
}

export default myUtile
