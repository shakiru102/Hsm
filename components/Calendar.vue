<template>
      <v-date-picker 
      flat
      readonly
      full-width
      show-adjacent-months
      no-title  
      color="#37474F"
      v-model="date"></v-date-picker>
</template>

<script>
import utils from '~/composables/utility'
export default {

setup(){
 const { date } = utils()

 return { date }
}

}
</script>

<style>

</style>