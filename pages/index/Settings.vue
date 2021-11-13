<template>
  <v-container class="">
   <toolbar>
     <template v-slot:titles>
       School Staffs
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
          class="px-16 py-8"
      :dark="!$store.state.theme"
    :color="$store.state.theme ? '#F5F5F5' : ''"
        >
      <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
          <v-btn text x-large  icon  color="#5C6BC0">{{ rooms }}</v-btn>
        </v-card-title>
          <v-window v-model="rooms">
             <v-window-item :value="1">
               <v-card-text>
                <v-text-field 
                v-model="lastname"
                :error-messages="err_lastname"
                :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                label="Last Name"></v-text-field>
                 <v-text-field 
                v-model="firstname"
                :error-messages="err_firstname"
                :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                label="First Name"></v-text-field>
               </v-card-text>
             </v-window-item>
             <v-window-item :value="2">
               <v-card-text>
                 <v-container class="">
                    <v-row>
                      <v-col cols="6">
                           <v-text-field 
                          v-model="certificate" 
                          :error-messages="err_certificate"
                      :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' " 
                    label="Certificate"></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-select 
                         v-model="category"
                          :item-color="!$store.state.theme ? '#5C6BC0' :  '#37474F'"
                          :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                          :items="['Adminstration', 'Teaching', 'Non-Teaching']"
                        label="Staff Category"></v-select>
                      </v-col>
                         <v-text-field 
                         v-model="task" 
                      :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' " 
                    label="Staff Task"></v-text-field>
                    </v-row>
                  </v-container>
               </v-card-text>
             </v-window-item>
             <v-window-item :value="3">
               <v-card-text>
                 <v-text-field 
                 v-model="address"
                 :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                 label="Staff Address"></v-text-field>
                <v-text-field 
                v-model="number"
                :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                label="Staff Number"></v-text-field>
               </v-card-text>
             </v-window-item>
          </v-window>
          <v-card-actions>
             <v-btn
        :disabled="rooms === 1"
        depressed
        @click="rooms--"
      >
        Back
      </v-btn>
            <v-spacer></v-spacer>
            <v-btn
        v-if="rooms !== 3"
        color="#5C6BC0"
        depressed
        dark
        text
        @click="rooms++"
      >
        Next
      </v-btn>
        <v-btn
       v-else
        color="#5C6BC0"
        depressed
        dark
      >
        Save
      </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import staff from '~/composables/staffcomposable'
export default {
  setup(){
    const { tableTitle,
            dialog,
            rooms,
          lastname,
        err_lastname,
        firstname,
        err_firstname,
        address,
        number,
        certificate,
        err_certificate,
        category,
        err_category,
        task,
        err_task,
        currentTitle
            } = staff()

    return{ 
      tableTitle,
      dialog,
      rooms,
        lastname,
        err_lastname,
        firstname,
        err_firstname,
        address,
        number,
        certificate,
        err_certificate,
        category,
        err_category,
        task,
        err_task,
        currentTitle

    }
  }

}
</script>

<style>

</style>