<template>
  <v-app>
    <about></about>
  </v-app>
</template>

<script>
import About from "./views/About.vue";
// import Home from "./views/Home.vue";

export default {
  name: "App",

  components: {
    About

  },

  data: () => ({
    //
  })
};
</script>
