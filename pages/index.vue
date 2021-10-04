<template>
<!-- <div></div> -->
  <v-card class="content_div" tile flat :dark="!$store.state.theme">
      <Head :changeToggle="changeToggle" />
       <v-dialog
         v-model="toggle"
         max-width="500px"
         transition="dialog-transition"
       >
         <v-card>
           <div>term</div>
         </v-card>
       </v-dialog>
      <nuxt-child />
  </v-card>
</template>

<script>
import utils from '@/composables/utility'

export default {
  middleware: "auth",
  
  setup(){
     
     const { toggle } =  utils()
     const changeToggle = () => toggle.value = !toggle.value
   return { changeToggle, toggle }
  }
}
</script>

<style scoped>
.content_div.v-card {
  height: 86.5vh;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  
}
.content_div.v-card::-webkit-scrollbar{
  display: none;
}
.cont{
  height: 200vh;
}
</style>