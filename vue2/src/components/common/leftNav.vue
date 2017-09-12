<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="left-nav">
    <ul>
      <li  v-bind:class="{ active: isActive }"  v-on:click="show = !show">
        <router-link to="/">
          <i class="icon iconfont icon-shouye5"></i>
          <div>收银</div>
        </router-link>
      </li>
      <li>
        <router-link to="/hello">
          <i class="icon iconfont icon-shouye4"></i>
          <div>店铺</div>
        </router-link>
      </li>
      <li>
        <router-link to="/shop">
          <i class="icon iconfont icon-shouye3"></i>
          <div>商品</div>
        </router-link>
      </li>
      <li v-on:click="show = !show">
        <router-link to="/vip">
          <i class="icon iconfont icon-shouye2"></i>
          <div>会员</div>
        </router-link>
      </li>
      <li>
        <router-link to="/hi">
          <i class="icon iconfont icon-shouye1"></i>
          <div>Hi页面</div>
        </router-link>
      </li>
      <li>
        <router-link to="/hi/hi3">
          <i class="icon iconfont icon-shouye"></i>
          <div>设计</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      name: 'left-nav',
      data(){
          return{
            isActive:true,
            show:true
          }
      },
      methods:{

      }
    }
</script>

<style>
  .left-nav{
    color: #fff;
    font-size: 10px;
    height: 100%;
    background-color: #1D8CE0;
    float: left;
    width: 5%;
  }
  .iconfont{
    font-size: 24px;
  }
  .left-nav ul{
    padding: 0px;
    margin: 0px;
  }
  .left-nav li{
    list-style: none;
    text-align: center;
    border-bottom: 1px solid #20a0ff;
    padding: 10px;
    cursor: pointer;
  }
  .left-nav li:hover{
    background-color: #42b983;
  }
  .left-nav .active{
    background-color: #42b983;
  }
  .left-nav li a{
    text-decoration: none;
    color: #ffffff;
  }
</style>
