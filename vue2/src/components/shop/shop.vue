<template>
    <div id="app">
      {{msg}}
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                msg: '商品'
            }
        }
    }
</script>

<style scoped>
  #app{
    text-align: center;
    font-size: 25px;
  }
</style>
