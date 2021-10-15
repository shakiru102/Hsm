<template>
  <v-toolbar color="transparent" flat>
      <v-toolbar-title>
        <div :class="$store.state.theme ? ` level`: 'level_dark' ">{{ $route.params.level }}</div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
          <v-btn @click="toggleDialog" x-small elevation=""  plain color="">
               <v-icon color="">mdi-plus</v-icon>
          </v-btn>
          <v-btn x-small elevation="" plain color="">
               <v-icon color="">mdi-printer-outline</v-icon>
          </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: ['toggleDialog']
}
</script>

<style scoped>
.level{
  font-weight: 800;
  font-size: 1.1em;
  font-family: Montserrat;
  color: rgb(70, 68, 68);
}
.level_dark{
  font-weight: 800;
  font-size: 1..1em;
  font-family: Montserrat;
  color: rgba(201, 197, 197, 0.747);
}

</style>