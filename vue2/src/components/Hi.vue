<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/hi/hi1">-Hi页面1</router-link>
    <router-link to="/hi/hi2">-Hi页面2</router-link>
    <router-link to="/hi/hi3">-Hi页面3</router-link>
    <router-view class="aaa"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Hi, I am yuebanjiang'
      }
    }
  }
</script>


<style scoped>
  .aaa{
    margin-top: 50px;
  }
</style>
