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
      :items="staffDetails"
    >
     <template v-slot:item.actions="props">
      <v-icon
        small
        @click="editItem(props.item)"
      >
        mdi-pencil
      </v-icon>
    </template> 
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
                  <v-container class="">
                     <v-row>
                       <v-col cols="6">
                            <v-text-field 
                              v-model="lastname"
                              :error-messages="err_lastname"
                              :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                              label="Last Name"></v-text-field>
                       </v-col>
                       <v-col cols="6">
                        <v-text-field 
                          v-model="firstname"
                          :error-messages="err_firstname"
                          :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                          label="First Name"></v-text-field>
                       </v-col>
                       <v-col cols="6">
                          <v-select 
                          v-model="gender"
                          :error-messages="err_gender"
                          :item-color="!$store.state.theme ? '#5C6BC0' :  '#37474F'"
                          :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                          :items="['Male', 'Female']"
                          label="Staff Gender"></v-select>
                       </v-col>
                        <v-col cols="6">
                           <v-text-field 
                          v-model="referAs"
                          disabled
                          :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                          label="Refer as"></v-text-field>
                       </v-col>
                     </v-row>
                   </v-container>
             
                 
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
                          :error-messages="err_category"
                          :item-color="!$store.state.theme ? '#5C6BC0' :  '#37474F'"
                          :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                          :items="['Adminstration', 'Teaching', 'Non-Teaching']"
                          label="Staff Category"></v-select>
                      </v-col>
                         <v-text-field 
                         v-model="task" 
                         :error-messages="err_task"
                         :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' " 
                        label="Staff Task"></v-text-field>
                    </v-row>
                  </v-container>
               </v-card-text>
             </v-window-item>
             <v-window-item :value="3">
               <v-card-text>
                  <v-container class="">
                     <v-row>
                       <v-col cols="12">
                        <v-text-field 
                        v-model="address"
                        :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                        label="Staff Address"></v-text-field>
                       </v-col>
                       <v-col cols="6">
                            <v-text-field 
                            v-model="number"
                            :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                            label="Staff Number"></v-text-field>
                       </v-col>
                       <v-col cols="6">
                             <v-menu offset-y>
                               <template v-slot:activator="{ on, attrs }">
                                 <v-text-field 
                                  :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                                   label="DOB"
                                   v-model="dob"
                                   v-bind="attrs"
                                   v-on="on"
                                 >
                                 </v-text-field >
                               </template>
                                  <v-date-picker v-model="dob"></v-date-picker>
                             </v-menu>
                       </v-col>
                     </v-row>
                   </v-container>
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
        @click="handleNext"
      >
        Next
      </v-btn>
        <v-btn
       v-else
       :loading="loading"
       @click="savestaff"
        color="#5C6BC0"
        depressed
        dark
      >
        Save
      </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
        <v-snackbar
       v-model="snackbar"
       :color="$store.state.snackBarProps.color"
       bottom
       timeout="3000"
   >
      <div class="text-center">{{$store.state.snackBarProps.content}}</div> 
   </v-snackbar>
   <v-bottom-sheet inset v-model="bottomSheet">
     <v-sheet
      :dark="!$store.state.theme"
         :color="$store.state.theme ? '#F5F5F5' : ''"
      min-height="500px">
          <v-card flat class="pa-16" v-if="staffData != null" >
                <v-container class="">
                   <v-row>
                     
                     <v-col cols="6" >
                           <v-card-subtitle>
                         <div class="">Staff</div>
                       </v-card-subtitle>
                       <v-card-text>
                         <v-text-field color="#5C6BC0" dense outlined label="Last Name" v-model="staffData.last_name"></v-text-field>
                         <v-text-field color="#5C6BC0" dense outlined label="First Name" v-model="staffData.first_name"></v-text-field>
                         <v-text-field color="#5C6BC0" dense outlined label="Gender" v-model="staffData.gender"></v-text-field>
                         <v-text-field color="#5C6BC0" dense outlined v-model="staffData.referAs" label="Refer" ></v-text-field>
                         <v-text-field color="#5C6BC0" dense outlined label="Mode of Employment" v-model="staffData.staff_certificate"></v-text-field> 
                         <v-text-field color="#5C6BC0"  label="Address" v-model="staffData.address"></v-text-field>
                       
                       </v-card-text>
                     </v-col>
                      
                     <v-col cols="6" class="text-center">
                        <v-avatar size="120px"
                        color="primary"
                        >
                             <span class=" display-2 white--text font-weight-semibold">{{ staffData.last_name ? staffData.last_name[0].toUpperCase() : ''}}</span>
                           </v-avatar>
                           
                           <v-card-subtitle>
                         <div class="">Staff Task</div>
                       </v-card-subtitle>
                       <v-card-text>
                         <v-text-field color="#5C6BC0"  label="Category" v-model="staffData.staff_category"></v-text-field>
                         <v-text-field color="#5C6BC0"  label="Task" v-model="staffData.staff_task"></v-text-field>
                         <v-text-field color="#5C6BC0"  label="Phone Number" v-model="staffData.staff_number"></v-text-field>
                         <v-btn :loading="loading" @click="handleEditStaff" block color="#5C6BC0" dark>save changes</v-btn>
                         <!-- <v-text-field color="#5C6BC0" dense outlined label="Staff Address" v-model="staffData.address"></v-text-field>  -->
                       </v-card-text>
                     </v-col>
                   </v-row>
                 </v-container>
          </v-card>
     </v-sheet>
   </v-bottom-sheet>
  </v-container>
</template>

<script>
import staff from '~/composables/staffcomposable'
export default {
  setup(){
    const { 
        handleEditStaff,
        bottomSheet,
        staffData,
        editItem,
        staffDetails,
        dob,
        gender,
        err_gender,
        referAs,
        handleNext,
        savestaff,
        loading,
        snackbar,
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
            } = staff()

    return{
      handleEditStaff,
       bottomSheet,
        staffData,
        editItem,
      staffDetails,
      dob,
      gender,
      err_gender,
      referAs,
      handleNext,
      savestaff,
      loading,
      snackbar,
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