<template>
  <v-card
    elevation="2"
    shaped
    tile
    style="height: 400px;
          width: 500px;
          margin-left: 150px
          padding: 30px"
  >
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-text-field
          v-model="username"
          counter="25"
          hint="This field uses counter prop"
          label="username"
        ></v-text-field>
        <v-text-field
          v-model="password"
          counter="25"
          hint="This field uses counter prop"
          label="password"
        ></v-text-field>
        <v-btn text
          @click="submit()"
        >
            Sign Up
        </v-btn>
      </v-tab-item>
      <v-tab-item>
        <v-text-field
          v-model="username1"
          counter="25"
          hint="This field uses counter prop"
          label="username"
        ></v-text-field>
        <v-text-field
          v-model="password1"
          counter="25"
          hint="This field uses counter prop"
          label="password"
        ></v-text-field>
        <!-- <router-link @click="login()"> -->
          <v-btn text
          @click="login()"
          >
            Log In
        </v-btn>
        <!-- </router-link> -->
      </v-tab-item>
    </v-tabs-items>
    
  </v-card>
</template>
<script>
import { mapState } from "vuex";

export default {
  data(){
    return {
      // rules: [v => v.length <= 25 || 'Max 25 characters']
      tab: true,
      title: "",
      items:["Sign Up", "Log In"],
      username: "",
      password: "",
      username1: "",
      password1: ""
    }
  },
  computed: {
    ...mapState({
          users: 'users'
      }),
      isFormValid(){
        if( this.username === "" || this.password === ""){
          return false;
        }else{
          return !this.users.filter( u => u.username === this.username).length;
        }
      },
      isFormValidLogin(){
        if( this.username1 === "" || this.password1 === ""){
          return false;
        }else{
          return !!this.users.filter( u => (u.username == this.username1 && u.password == this.password1) ).length;
        }
      }
  },
  methods: {
    submit() {
      if( this.isFormValid ){
        this.$store.dispatch('addNewUser', { username: this.username, password: this.password });
        this.username = "";
        this.password = "";
      }
    },
    login(){
      if( this.isFormValidLogin ){
        this.$router.push('about');
      }

    }

  }
};
</script>
<style scoped></style>
