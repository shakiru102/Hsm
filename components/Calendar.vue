<template>
      <v-date-picker 
      flat
      full-width
      show-adjacent-months
      readonly
      no-title
      elevation="0"
      :show-current="true"
      :color="$store.state.theme ? '#5C6BC0': 'grey'"
      :events="$store.getters.event"
      event-color="#5C6BC0"
      ></v-date-picker>
</template>

<script>
import utils from '~/composables/utility'
export default {
setup(props){

 const { date } = utils()
 return { date }
}

}
</script>

<style>

</style>