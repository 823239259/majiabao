<template>
  <div id="app">
   <keep-alive  class="router-view" >
        <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    max-width: 7.5rem;
    width: 7.5rem;
    height: auto;
    overflow: hidden;
    background: #ffffff;
  
}
</style>
