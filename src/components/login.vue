<template>
  <v-card
    elevation="2"
    shaped
    tile
    style="height: 450px;
          width: 500px;
          margin-left: 450px;
          padding: 30px;
          margin-top: 200px;"
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
          counter="10"
          hint="This field uses counter prop"
          label="username"
        ></v-text-field>
        <v-text-field
          v-model="password"
          counter="10"
          label="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-text-field
          v-model="repeatPassword"
          counter="10"
          hint="Correct"
          label="Repeat Password"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.repeatPassword]"
          :type="show2 ? 'text' : 'password'"
          @click:append="show2 = !show2"
        ></v-text-field>
        <v-btn text
          @click="submit()"
        >
            Sign Up
        </v-btn>
        <div v-if="messageAppearance" style="padding-top: 20px">
          <p v-if="isActive" :class="{ signUpClass: isActive }"> {{this.singnUpMsgn}}  </p>
          <p v-if="!isActive" :class="{ signUpInvalidClass: !isActive }"> Invalid entries! </p>
        </div>
      </v-tab-item>

      <v-tab-item>
        <v-text-field
          v-model="username1"
          counter="10"
          :hint="returnError"
          label="username"
          persistent-hint
          :error="triggerErrorUsername"
        ></v-text-field>
        <v-text-field
          v-model="password1"
          counter="10"
          label="password"
          :error="triggerErrorPassword"
          :hint="returnError1"
          persistent-hint
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
      tab: true,
      title: "",
      items:["Sign Up", "Log In"],
      username: "",
      password: "",
      triggerErrorUsername: false,
      triggerErrorPassword: false,
      singnUpMsgn: "You have successfully registered!",
      isActive: false,
      repeatPassword: "",
      returnError: "",
      returnError1: "",
      messageAppearance: false,
      username1: "",
      password1: "",
      show1: false,
      show2: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        repeatPassword: v => v === this.password || 'Inccorect password!'
      }
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
      this.messageAppearance = true;
      if( this.isFormValid ){
        this.isActive = true;
        this.$store.dispatch('addNewUser', { username: this.username, password: this.password, isActive: false });
        this.username = "";
        this.repeatPassword = "";
        this.password = "";
      }else{
        this.isActive = false;
        this.username = "";
        this.password = "";
        this.repeatPassword = "";
      }
    },
    login(){
      if( this.isFormValidLogin ){
        const usersId = this.users.filter( u => u.username == this.username1)[0];
        this.$store.dispatch('editUserActivation', this.username1);
        this.$router.push({ name: 'Main', params: { id: usersId.id } });
      }else{
        const matchUsername = this.users.filter( u => { return u.username == this.username1}).length;
        console.log(matchUsername);
        if( matchUsername ){
          this.triggerErrorPassword = true;
          this.returnError1 = "Wrong password!";
        }else{
          this.triggerErrorUsername = true;
          this.returnError = "User with this username does not exist.";
        }
      }
    }
  },
  watch: {
    messageAppearance( newVal ){
      if(newVal)
      setTimeout(() => this.messageAppearance = false, 3000);
    }
  }
};
</script>
<style scoped>
  .errorClass{
    color: rgb !important;
  }
  .signUpClass{
    color: green;
  }
  .signUpInvalidClass{
    color: red;
  }
</style>
