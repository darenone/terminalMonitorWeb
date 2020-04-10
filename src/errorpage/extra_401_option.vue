<template>
<div id="wrap" class="home">
<content>
  <div class="sub-content" style="background:white;">
    <div style="width:760px;vertical-align: middle; margin:10px auto;">
      <img style="float:left;" src="@/assets/img/errorimg/error401.png">
      <div style="float:left; width:400px; margin-top:100px; color:#003;">
        <h1 style="font-family: MicrosoftYaHei-Bold; color: #323954;
                   font-size: 18px;font-weight: bold;letter-spacing: 0px;"
                >未登录，或登录超时操作</h1>
        <div class="time-item">
          页面<strong id="second_show" class="count">0 {{count}} 秒</strong>后自动跳转到网站首页登录
        </div>
      </div>
    </div>
  </div>
</content>
</div>

</template>
<script>
// import {clearToken} from '@/utils/token'
export default {
  data() {
    return {
      count: "",
    };
  },
  methods: {
    getCode() {
      let _self=this;
      let timer=null;
      _self.count=5;
      timer=setInterval(()=>{
        if(_self.count===0){
          clearInterval(timer);
          // sessionStorage.removeItem("accessToken", "");
          // clearToken();
          sessionStorage.removeItem("area", "");
          sessionStorage.removeItem("menu", "");
          sessionStorage.removeItem("powers", "");
          sessionStorage.removeItem("currentPower", "");
          this.$router.push({path: "/login"});
        }
        else{
          _self.count--
        }
      },1000)
    }
  },
  created: function () {
    this.getCode();
  }
};
</script>
<style>
body{
/*  background-color:#FFFFFF;*/
}
  h1 {
    font-family: "微软雅黑";
    font-size: 40px;
    margin: 20px 0;
    border-bottom: solid 1px #ccc;
    padding-bottom: 20px;
    letter-spacing: 2px;
  }

  .time-item strong {
    color: #323954;
    line-height: 49px;
    font-size: 36px;
    font-family: Arial;
    padding: 0 10px;
    margin-right: 10px;
  }

  #day_show {
    float: left;
    line-height: 49px;
    color: #c71c60;
    font-size: 32px;
    margin: 0 10px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .item-title .unit {
    background: none;
    line-height: 49px;
    font-size: 24px;
    padding: 0 10px;
    float: left;
  }

</style>
