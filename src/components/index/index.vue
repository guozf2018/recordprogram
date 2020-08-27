<template>
  <a-layout id="components-layout-demo-top-side">
    <div class="wiki-collection-top">
        <div class="wiki-collection-top-buttongroup" >
            <a-button class="wiki-collection-top-button" type="primary" @click="doLogin" ghost>
                登录
            </a-button>
            <a-button class="wiki-collection-top-button" type="danger" @click="doLogout" ghost>
                注销
            </a-button>
        </div>
    </div>
    <div class="wiki-collection-background"></div>
    <!-- 头部 -->
    <div class="wiki-collection-header">
      <a-menu class="wiki-collection-menu" v-model="currentMenu" mode="horizontal" @click="doMenuClick">
        <a-menu-item key="index"> <a-icon type="mail" />首页</a-menu-item>
        <a-menu-item key="member"> <a-icon type="user" />成员</a-menu-item>
        <a-menu-item key="chart"> <a-icon type="area-chart" />图表</a-menu-item>
      </a-menu>
    </div>
    <!-- 中间内容  -->
    <a-layout-content style="padding: 25px 50px">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-content :style="{ padding: '10px 50px', minHeight: '500px' }">
             <!-- <Result v-if="currentMenu[0] == 'index'"/> -->
             <Chart v-if="currentMenu[0] == 'chart'"/>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    
    <!-- 底部说明 -->
    <a-layout-footer style="text-align: center">
      wiki-collection ©2020 Created by zhisugar
    </a-layout-footer>
  </a-layout>
</template>

<script>
//import Result from '../result/result.vue';
import Chart from '../result/chart.vue';
export default {
    name: "Index",
    components: {
        //Result,
        Chart
    },
    data(){
        return{
            title:"鹿乃大家族",
            currentMenu: ['chart'],
        };
    },
    methods:{
        doMenuClick(e){
            const keyPath = e.keyPath;
            this.currentMenu = keyPath;
        },
        doLogin(){ 
            console.log("登录方法");
            console.log(this);
            this.$message.warning('developing'); 
        },
        doLogout(){ 
            console.log("注销方法");
            this.$message.warning('developing'); 
        },
    }
}
</script>

<style>

.wiki-collection-background{
    width: 100%;
    height: 280px;
    background: url("../../assets/image/index-background.jpg") no-repeat;
    background-size:100% 100%;
    opacity: 0.8;
}

.wiki-collection-top{
    background: rgba(255, 255, 255, 0.329);
    width: 100%;
    height: 40px;
    z-index: 9999;
    position: absolute;
    top:0;
}

.wiki-collection-top-button{
    margin: 0 10px 0 10px;
}

.wiki-collection-top-buttongroup{
    float:right;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}

.wiki-collection-header{
    background: rgb(255, 255, 255);
    text-align: center;
}

.wiki-collection-menu{
    height: 100%;
    width: 50%;
    background: transparent;
}

#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgb(170, 221, 219);
  margin: 16px 28px 16px 28px;
  float: left;
}
</style>