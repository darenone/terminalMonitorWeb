<style lang="less">
    .status404{
        width: 700px;
        height: 369px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin-top: 15%;
        margin-left: calc(100%/2 - 300px);
        >div{
          float:left;
        }
        .left img{
          width: 300px;
          height: 300px;
          margin-right: 30px;
        }
        .right img{
          margin-top: 24px;
          width: 210px;
          height: 80px;
        }
        h2{
          font-weight: bold;
          font-size: 24px;
          color: #41444d;
          margin-top: 22px;
          height: 24px;
        }
        p{
          font-size: 18px;
          color: #575b66;
          margin-top: 20px;
          margin-bottom: 30px;
          height: 18px;
        }
        .refresh{
          width:80px;
          text-align: center;
        }
        a{
          height: 34px;
        }
    }
</style>

<template>
    <section class="status404 clearfix">
        <div class="left">
            <img src="@/assets/img/errorimg/500.png">
        </div>
        <div class="right">
            <img src="@/assets/img/errorimg/500.png">
            <h2>抱歉，服务器内部故障！</h2>
            <p>您可以选择刷新或者返回首页</p>
            <a class="refresh ef-btn btn-default-blue btn-circle" @click="refresh">刷新</a>
            <a class="return ef-btn btn-text btn-circle" @click="backHome">返回首页</a>
        </div>
    </section>
</template>
<script>
export default {
    name:"status404",
    data(){
        return {

        }
    },
    methods:{
      //刷新
      refresh(){
        this.$router.go(0);
      },
      //返回首页
      backHome(){
         this.$router.push({
           path:'\home'
         });
      }
    }
}
</script>

