<template>
  <v-container class="">
   <toolbar>
     <template v-slot:titles>
       Home Room Teacher
     </template>
     <template v-slot:buttons>
        <v-btn @click="dialog = !dialog"  x-small   plain color="">
               <v-icon color="">mdi-plus</v-icon>
          </v-btn>
     </template>
   </toolbar>
    <v-data-table
      :headers="tableTitle"
      hide-default-footer
    >
      
    </v-data-table>
    <v-dialog
      v-model="dialog"
      transition="slide-y-reverse-transition"
      max-width="500px"
    >
      <v-card
          class="pa-16"
      elevation=""
          max-width=""
        >
          <v-window v-model="rooms">
             <v-window-item :value="1">
               <v-card-text>
                <v-text-field label="Username"></v-text-field>
                <v-text-field label="Full Name"></v-text-field>
               </v-card-text>
             </v-window-item>
             <v-window-item :value="2">
               <v-card-text>
                <v-text-field type="password" label="Password"></v-text-field>
                <v-text-field type="password" label="Confirm Password"></v-text-field>
               </v-card-text>
             </v-window-item>
             <v-window-item :value="3">
               <v-card-text>
                 <v-select  :items="level" 
                 label="Select Room Level"></v-select>
                 
               </v-card-text>
             </v-window-item>
          </v-window>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="rooms++"
            >
             Next 
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import roomTeacher from '~/composables/roomTeacher'
export default {
  setup(){
    const { tableTitle,
            dialog,
            rooms
            } = roomTeacher()

    return{ 
      tableTitle,
      dialog,
      rooms

    }
  }

}
</script>

<style>

</style>