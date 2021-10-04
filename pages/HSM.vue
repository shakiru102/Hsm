<template>
    <v-img height="100vh"  :src="require('@/assets/3.jpg')">
    <!-- <Feedbacksnackbar  /> -->
      <v-snackbar
       v-model="errsnackBar"
       :color="$store.state.snackBarProps.color"
       top
       timeout="3000"
   >
      <div class="text-center">{{$store.state.snackBarProps.content}}</div> 
       <!-- <v-btn absolute right  text color="primary" @click.native="">Close</v-btn> -->
   </v-snackbar>
    <Hsm :changeBar="changeBar" />
       <v-container class="text-center">
              <h3 class="hsm">HIGH SCHOOL MANAGER</h3>
        </v-container>
        <Footer />
      </v-img>
</template>

<script>
import api from '~/composables/api'
export default {
     setup(){
       const { errsnackBar } =  api()
       const changeBar = () => errsnackBar.value = !errsnackBar.value

       return {
         errsnackBar,
         changeBar
       }
     }
}
</script>

<style scoped>
.hsm{
  height: 50vh;
  display: grid;
  place-items: center;
}

</style>