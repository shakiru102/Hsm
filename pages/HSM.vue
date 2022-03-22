<template>
    <v-img height="100vh"
    gradient="to left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)"
      :src="require('@/assets/3.png')">
    <!-- <Feedbacksnackbar  /> -->
      <v-snackbar
       v-model="errsnackBar"
       :color="$store.state.snackBarProps.color"
       top
       timeout="3000"
   >
      <div class="text-center">{{$store.state.snackBarProps.content}}</div> 
   </v-snackbar>
    <Hsm :changeBar="changeBar" />
       <v-container class="text-center">
              <div class="hsm"> 
                <div class="welcomhsm">
                  Welcome To High School Manager
                </div>
                <div class="hsmcontent">High School Manager is an education based website application built for secondary schools that provides a cumulative database for school records and eases their administrative burdens.
                </div>
                <v-btn x-large class="mt-16 btn" dark style="border-radius: 18px" width="319px" @click="hiddenNav = !hiddenNav" color="#E82F2F">get started</v-btn>
              </div> 
        </v-container>
        <Footer />
      </v-img>
</template>

<script>
import api from '~/composables/api'
import utils from '~/composables/utility'

export default {
  middleware: 'signedIn',
     setup(){
       const { errsnackBar } =  api()
       const { hiddenNav } =  utils()
       const changeBar = () => errsnackBar.value = !errsnackBar.value

       return {
         errsnackBar,
         changeBar,
         hiddenNav
       }
     }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,700;1,800;1,900&display=swap');
.hsm{
  height: 50vh;
  margin-top: 12em;
  
  
}
.welcomhsm{
font-family: 'Red Hat Display';
  font-size: 72px;
  font-weight: 700;
  color: whitesmoke;
  text-transform: capitalize;
}
.hsmcontent{
font-family: 'Red Hat Display';
font-style: normal;
font-weight: 400;
font-size: 28px;
width: 90%;
margin: 0 auto;
/* line-height: 37px; */
color: #FCF3F3;
}
.btn{
  font-family: 'Red Hat Display';
  text-transform: capitalize;
}
</style>