<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import DefaultLayout from "./layouts/DefaultLayout.vue";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    },
  },
  components: {
    DefaultLayout,
  },
};
</script>

<style>
body {  
  padding: 0 calc(10px - (100vw - 100%)) 0 0;
  margin: 0;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1b1b1b;
  box-sizing: border-box;
}

p {
  margin: 0;
  padding: 0;
}

a {
  color: #1b1b1b;
  text-decoration: none;
}

button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  border: 0px;
  background-color: #fff;
  padding: 0px;
  cursor: pointer;
}
</style>
