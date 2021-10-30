<template>
  <nav>
       <v-app-bar height="80px"  color="transparent" flat  dense dark>
            <v-spacer></v-spacer>
            <v-btn fab class="mr-3 mt-5" light  @click="hiddenNav = !hiddenNav"  >
              <v-icon color="#5C6BC0"  >mdi-login-variant</v-icon>
            </v-btn>
          </v-app-bar>
          <v-navigation-drawer
          disable-resize-watcher
          disable-route-watcher
          floating
           dark app v-model="hiddenNav" >
                <div v-if="logOption" class="signup my-16">
        <v-form ref="form"  lazy-validation  @submit.prevent="validate" >
        <v-text-field :rules="nameRule"  v-model="school_name"  color="rgba(240, 126, 50, 0.918)"  outlined dense label="School Name"  type="text" ></v-text-field>
        <v-text-field :rules="passRule"  v-model="school_password"  color="rgba(240, 126, 50, 0.918)"  outlined dense label=" Password"  type="password" ></v-text-field>
        <v-text-field :rules="emailRule"  v-model="school_email"  color="rgba(240, 126, 50, 0.918)"  outlined dense label="Email"  type="email" ></v-text-field>
        <v-text-field :rules="numRule"  v-model="school_phonenum"  color="rgba(240, 126, 50, 0.918)"  outlined dense label="Phone Number"  type="text" ></v-text-field>
        <v-container class="">
            <v-row>
            <v-col>
            <v-btn small @click="logOption = !logOption"  elevation="" block  color="primary">login</v-btn>
            </v-col>
            <v-col>
            <v-btn  type="submit" :loading="loading"  small  elevation="" block  color="success">signup</v-btn>
            </v-col>
            </v-row>
        </v-container>
        </v-form>
    </div>
  <div v-else class="signup my-16">
    <form @submit.prevent="login"  >
       <v-text-field required   v-model="loginschool_email"  color="rgba(240, 126, 50, 0.918)"  outlined dense label="Email"  type="email" ></v-text-field>
        <v-text-field required  v-model="loginschool_password"  color="rgba(240, 126, 50, 0.918)"  outlined dense label=" Password"  type="password" ></v-text-field>
        <v-container class="">
            <v-row>
            <v-col>
            <v-btn small type="submit"  :loading="loading"  elevation="" block  color="primary">login</v-btn>
            </v-col>
            <v-col>
            <v-btn small elevation="" block @click="logOption = !logOption"  color="success">signup</v-btn>
            </v-col>
            </v-row>
        </v-container>
    </form>
    </div>
  </v-navigation-drawer>
  </nav>
</template>

<script>
import utils from "@/composables/utility"
import api from "@/composables/api"
export default {
props: ['changeBar'], 
methods: {
    validate(){
      const valid = this.$refs.form.validate()
      if(valid) return this.signup()
    }
},
 setup(props){
   const { changeBar } = props
     const { hiddenNav, logOption } = utils()
         const {
    passRule,
    emailRule,
    nameRule,
    school_documents,
    school_email,
    school_name,
    school_password,
    logo,
    school_phonenum,
    school_terms,
    signup,
    valid,
    numRule,
    loading,
    login,
    loginschool_email,
    loginschool_password
     
     } = api(changeBar)
     
     return { 
       hiddenNav,
        passRule,
    emailRule,
    nameRule,
    school_documents,
    school_email,
    school_name,
    school_password,
    logo,
    school_phonenum,
    school_terms,
    logOption,
    signup,
    valid,
    numRule,
    loading,
    login,
    loginschool_email,
    loginschool_password

       }
 }
}
</script>

<style>
#logo{
    display: none;
}
.signin_label{
    font-family: Montserrat,sans-serif;
    display: block;
    width: 100%;
    margin: 0 auto;
    color: rgba(240, 126, 50, 0.918);
    text-align: center;
    height: 2em;
    border-radius: 3px;
    display: grid;
    place-items: center;
    font-weight: bold;
    background-color: rgb(247, 240, 240);
    margin-bottom: 1em;

}
.signup{
    padding: 0 1em;
}
</style>