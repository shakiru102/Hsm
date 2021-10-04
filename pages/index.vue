<template>
<!-- <div></div> -->
  <v-card class="content_div" tile flat :dark="!$store.state.theme">
      <Head />
      <nuxt-child />
  </v-card>
</template>

<script>
// import utils from '@/composables/utility'

export default {
  middleware: "auth",
  
  setup(){
    
   return {  }
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