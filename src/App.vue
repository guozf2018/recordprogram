<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <a-config-provider :getPopupContainer="getPopupContainer">
        <Index />
    </a-config-provider>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Index from './components/index/index.vue';
export default {
  name: 'App',
  components: {
    Index
  },
  methods:{
    getPopupContainer(el, dialogContext) {
        if (dialogContext) {
          return dialogContext.getDialogWrap();
        } else {
          return document.body;
        }
      },
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
