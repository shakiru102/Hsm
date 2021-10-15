<template>
  <h1 class="primary--text" >Welcome {{ $store.state.hsm.name }} </h1>
</template>

<script>
// import { onMounted } from '@vue/composition-api'
// import { useContext, useRouter } from '@nuxtjs/composition-api'
export default {
  middleware:  'newUser' ,
  setup(){
    // onMounted(() => {
    //     const { store } = useContext()
    //   if(store.state.hsm.current_term != ''){
    //     const router = useRouter()
    //     router.push('Dashboard')
    //   }
    // })
  }
}
</script>

<style>

</style>