<template>
  <div class="about">
    <p class="userClass">user: {{ getUserName }} </p>
    <v-btn class="userClass" color="deep-purple lighten-2" v-on:click="logout()"> Log out</v-btn>
    <invoice-list></invoice-list>
  </div>
</template>

<script>
// import invoiceList from "@/components/invoiceList.vue";
import { mapState } from "vuex";

export default {
  components: {
    //  invoiceList
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapState({
          users: 'users'
    }),
    getUserName(){
      return this.users.filter( u => u.id == parseInt(this.$route.params.id))[0].username;
    },
    getUserActivation(){
      return this.users.filter( u => u.id == parseInt(this.$route.params.id))[0].isActive;
    }
  },
  methods:{
    logout(){
      const username = this.getUserName;
      this.$store.dispatch('editUserActivation', username);
      this.$router.push('/');
    },
    handler(){
      if( !this.getUserActivation ){
        this.$router.replace({ name: "Home"});
      }
    }
  },
  created() {
    window.addEventListener('beforeunload', this.handler());
  }
  
};
</script>

<style scoped>
  .userClass{
    margin-top: 20px;
    margin-left: 20px;
  }
</style>
