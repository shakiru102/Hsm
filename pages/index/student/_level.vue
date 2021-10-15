<template>
<div>
 <v-container class="">
   <Toolbar :toggleDialog="toggleDialog" />
  </v-container>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    transition="dialog-transition"
  >
  
     <v-card
    class="px-16"
    :dark="!$store.state.theme"
  >
  <form ref="studentForm" >
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
          <v-btn text x-large  icon  color="#5C6BC0">{{step}}</v-btn>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
           <v-container class="">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                   :color="!$store.state.theme ? '' :  '#37474F' "
                  label="Student Name"
                  v-model="name"
                  :error-messages="err_name"
                  ></v-text-field>
                </v-col>
                    <v-col cols="4">
                  <v-text-field
                   :color="!$store.state.theme ? '' :  '#37474F' "
                  label="Student Level"
                  v-model="level"
                  disabled
                  ></v-text-field>
                </v-col>
                   <v-col cols="4">
                  <v-text-field
                  label="Age"
                   :color="!$store.state.theme ? '' :  '#37474F' "
                  :error-messages="err_age"
                  v-model="student_age"
                  type="number"
                  ></v-text-field>
                </v-col>
                    <v-col cols="4">
                 <v-select 
                  :color="!$store.state.theme ? '' :  '#37474F' "
                  :error-messages="err_gender"
                  v-model="gender" :items="select" 
                 label="Gender"></v-select>
                </v-col>
                
              </v-row>
            </v-container>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
             <v-container class="">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                   :color="!$store.state.theme ? '' :  '#37474F' "
                  label="Amount Paid"
                  v-model="amount_paid"
                  :error-messages="err_amount"
                  type="number"
                  ></v-text-field>
                </v-col>
                    <v-col cols="6">
                  <v-text-field
                   :color="!$store.state.theme ? '' :  '#37474F' "
                  label="Level Amount"
                  v-model="expected_amount"
                  disabled
                  ></v-text-field>
                </v-col>
                    <v-col cols="6">
                   <v-text-field
                  :color="!$store.state.theme ? '' :  '#37474F' "
                  label="Payment Status"
                  v-model="payment_status"
                  disabled
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
      <v-card-text>
             <v-container class="">
              <v-row>
                <div class="subtitle">Next Of Kin</div>
                <v-col cols="12">
                  <v-text-field
                  :color="!$store.state.theme ? '' :  '#37474F' "
                  label="Name"
                  v-model="kin_name"
                  ></v-text-field>
                </v-col>
                    <v-col cols="6">
                  <v-text-field
                   :color="!$store.state.theme ? '' :  '#37474F' "
                  label="Phone Number"
                  v-model="kin_number"
                  ></v-text-field>
                </v-col>
                    <v-col cols="6">
                   <v-text-field
                    :color="!$store.state.theme ? '' :  '#37474F' "
                  label="Address"
                  v-model="kin_address"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
        </v-card-text>
      </v-window-item>
    </v-window>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        :disabled="step === 1"
        depressed
        @click="step--"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="step !== 3"
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
        color="#5C6BC0"
        depressed
        dark
        @click="saveStudent"
        :loading="loading"
      >
        Save
      </v-btn>
    </v-card-actions>
  </form>
  </v-card>
  </v-dialog>
     <v-snackbar
       v-model="studentsnackbar"
       :color="$store.state.snackBarProps.color"
       bottom
       timeout="3000"
   >
      <div class="text-center">{{$store.state.snackBarProps.content}}</div> 
   </v-snackbar>
  </div>
</template>

<script>
import student from '~/composables/students'
export default {
    methods:{
 
    } ,
   setup(){
     const {
        handleNext,
      err_amount,
       err_gender,
       err_name,
       err_age,
       studentsnackbar,
        saveStudent,
        loading,
       select,
        toggleDialog,
       dialog,
      currentTitle,
      step, 
      level,
     name,
     expected_amount,
     address,
     student_age,
     payment_status,
     gender,
     kin_name,
     kin_address,
     kin_number,
     amount_paid
      } = student() 
      const handleAgeChange = (e) => {
        if(e.target.value < 0) {
          student_age.value = 1
        }
      }
      
      const handleAmountChange = (e) => {
        if(e.target.value > expected_amount.value) {
          amount_paid.value = expected_amount.value
        } else if(e.target.value < 0){
          amount_paid.value = 0
        }
      }

      return {
         handleNext,
        err_amount,
        err_gender,
       err_name,
       err_age,
        studentsnackbar,
        handleAmountChange,
        handleAgeChange,
         saveStudent,
        loading,
        select,
        toggleDialog,
        dialog,
      currentTitle,
     step,
     level,
     name,
     expected_amount,
     address,
     student_age,
     payment_status,
     gender,
     kin_name,
     kin_address,
     kin_number,
     amount_paid
      }
   }
  
}
</script>

<style>

</style>