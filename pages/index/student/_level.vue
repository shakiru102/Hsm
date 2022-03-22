<template>
<div>
 <v-container class="">
   <Toolbar :printDiv="printDiv" :toggleDialog="toggleDialog" />
   <v-data-table
     :headers=" tableHeader"
     :items="levelDetails"
     hide-default-footer
     id="students"
     item-class="styling_class"
      :items-per-page="-1"
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
  </v-container>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    transition="slide-x-transition"
  >
  
     <v-card
    class="px-16"
    :dark="!$store.state.theme"
    :color="$store.state.theme ? '#F5F5F5' : ''"
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
                   :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                  label="Student Name"
                  v-model="name"
                  :error-messages="err_name"
                  ></v-text-field>
                </v-col>
                    <v-col cols="4">
                  <v-text-field
                   :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                  label="Student Level"
                  v-model="level"
                  disabled
                  ></v-text-field>
                </v-col>
                   <v-col cols="4">
                  <v-text-field
                  label="Age"
                   :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                  :error-messages="err_age"
                  v-model="student_age"
                  type="number"
                  ></v-text-field>
                </v-col>
                    <v-col cols="4">
                 <v-select 
                  :item-color="!$store.state.theme ? '#5C6BC0' :  '#37474F'"
                  :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
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
                   :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                  label="Amount Paid"
                  v-model="amount_paid"
                  :error-messages="err_amount"
                  type="number"
                  ></v-text-field>
                </v-col>
                    <v-col cols="6">
                  <v-text-field
                   :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                  label="Level Amount"
                  v-model="expected_amount"
                  disabled
                  ></v-text-field>
                </v-col>
                    <v-col cols="6">
                   <v-text-field
                  :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
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
                  :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                  label="Name"
                  v-model="kin_name"
                  ></v-text-field>
                </v-col>
                    <v-col cols="6">
                  <v-text-field
                   :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
                  label="Phone Number"
                  v-model="kin_number"
                  ></v-text-field>
                </v-col>
                    <v-col cols="6">
                   <v-text-field
                    :color="!$store.state.theme ? '#5C6BC0' :  '#37474F' "
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
   <v-bottom-sheet inset v-model="bottomSheet">
     <v-sheet
      :dark="!$store.state.theme"
         :color="$store.state.theme ? '#F5F5F5' : ''"
      min-height="500px">
          
          <v-card flat color="transparent" class="pa-16" v-if="studentData != null" >
            <div :class="result != 1 ? 'd-flex justify-space-between' : 'text-right'">
              <v-btn v-if="result != 1" @click="result = 1" x-large icon>
                <v-icon >mdi-arrow-left-circle-outline</v-icon>
              </v-btn>
              <v-avatar size="80px"
                :color="avatarColor(studentData.payment_status)"
                >
                <span class=" display-1 white--text font-weight-semibold">{{studentData.name[0]}}</span>
              </v-avatar>
            </div>
            <v-window v-model="result">
               <v-window-item :value="2"> 
                  <v-container>
                     <v-row>
                       <v-col cols="4">
                         <v-card-text>
                           <v-text-field disabled label="Term" v-model="$store.state.currentTerm.term_name" ></v-text-field>
                           <v-text-field disabled label="Total First CA Score" v-model="fcs" ></v-text-field>
                           <v-text-field disabled label="Total Second CA Score" v-model="scs" ></v-text-field>
                           <v-text-field disabled label="Total Exam Score" v-model="es" ></v-text-field>
                           <v-text-field disabled label="Total Score" :value="totalScore + '/100'" ></v-text-field>
                         </v-card-text>
                       </v-col>
                        <v-col cols="5">
                         <v-card-text>
                           <v-text-field color="#5C6BC0" dense v-model="subjectTitle" outlined label="Subject Title"></v-text-field>
                           <v-text-field color="#5C6BC0" v-model="student_fcs" dense type="number" outlined label="First CA Score"></v-text-field>
                           <v-text-field color="#5C6BC0" v-model="student_scs" dense type="number" outlined label="Second CA Score"></v-text-field>
                           <v-text-field color="#5C6BC0" v-model="student_es" dense type="number" outlined label="Exam Score"></v-text-field>
                           <v-btn block dark @click="addSubject" depressed tile color="#5C6BC0">add subject</v-btn>
                         </v-card-text>
                       </v-col>
                       <v-col cols="3" v-if="studentResults.length">
                         <v-card-text>
                           <div v-for="(item, index) in studentResults" :key="index"  :class="$store.state.theme ? 'subtitle-2 grey lighten-3 mb-2 grey--text text-center' : 'subtitle-2  mb-2 grey--text text-center'">
                          {{ item.subject_title }}
                         </div>
                         <v-btn block @click="handleResults" depressed tile text color="success">save results</v-btn>
                         </v-card-text>
                       </v-col>
                     </v-row>
                  </v-container>
              </v-window-item>
              <v-window-item :value="1">
                <v-container class="">
                   <v-row>
                     <v-col cols="4" >
                           <v-card-subtitle>
                         <div class="">Student</div>
                       </v-card-subtitle>
                       <v-card-text>
                         <v-text-field color="#5C6BC0" dense outlined label="Student Name" v-model="studentData.name"></v-text-field>
                         <v-text-field color="#5C6BC0" dense outlined label="Level" v-model="studentData.level"></v-text-field>
                         <v-text-field color="#5C6BC0" dense outlined v-model="studentData.student_age" label="Age" ></v-text-field>
                          <v-select color="#5C6BC0" item-color="#5C6BC0"  v-model="studentData.gender_gender" :items="['Male', 'Female' ]"
                         label="Gender"></v-select>
                         <v-text-field color="#5C6BC0" dense outlined label="Student Address" v-model="studentData.address"></v-text-field>
                       </v-card-text>
                     </v-col>
                       <v-col cols="4" >
                       <v-card-subtitle>
                         <div class="">Next Of Kin</div>
                       </v-card-subtitle>
                       <v-card-text>
                         <v-text-field color="#5C6BC0" dense outlined label="Full Name" v-model="studentData.kin_name"></v-text-field>
                         <v-text-field color="#5C6BC0" dense outlined label="Phone Number" v-model="studentData.kin_number"></v-text-field>
                         <v-text-field color="#5C6BC0" dense outlined label="Address" v-model="studentData.kin_address"></v-text-field>
                       </v-card-text>
                        <v-card-subtitle>
                         <div class="">Starter Pack</div>
                       </v-card-subtitle>
                       <v-card-text>
                          <v-select color="#5C6BC0" item-color="#5C6BC0" v-model="studentData.starter_pack"  :items="['Collected', 'Awaiting' ]"
                         label="Pack"></v-select>
                       </v-card-text>
                     </v-col>
                     <v-col cols="4" >
                          <v-card-subtitle>
                         <div class="">Payment Details</div>
                       </v-card-subtitle>
                       <v-card-text>
                         <v-text-field color="#5C6BC0" dense outlined label="Amount Paid" type="number" :error-messages="err_amount"  v-model="singleStudentAmount"></v-text-field>
                         <v-text-field color="#5C6BC0" dense outlined label="Expected Amount" type="number" disabled v-model="expected_amount"></v-text-field>
                         <v-text-field color="#5C6BC0" dense outlined label="Payment Status"  disabled  v-model=" single_payment_status"></v-text-field>
                             <v-btn block dark class="mb-2" @click="updateStudent" :loading="loading"  text elevation="" color="primary">save</v-btn>
                             <v-btn block dark class="mb-2" @click="result = 3" text elevation="" color="#5C6BC0">results</v-btn>
                             <v-btn block dark class="mb-2" @click="result = 2" text elevation="" color="success">add results</v-btn>
                       </v-card-text>
                     </v-col>
                     <!-- <v-col cols="12" ></v-col> -->
                   </v-row>
                 </v-container>
                 </v-window-item>
                   <v-window-item :value="3"> 
                     <v-card-text>
                         <v-data-table
                    :headers="resultsHeaders"
                    :items="studentResults"
                    hide-actions
                    pagination.sync="pagination"
                    item-key="id"
                    loading="true"
                    items-per-page="5"
                  >
                    <template v-slot:item.exptotal="{ item }">  
                    <div>{{ parseInt(item.exp_fcs) + parseInt(item.exp_scs) + parseInt(item.exp_es) }}</div>
                    </template>
                     <template v-slot:item.total="{ item }">  
                    <div>{{ parseInt(item.fcs) + parseInt(item.scs) + parseInt(item.es) }}</div>
                    </template>
                  </v-data-table>
                     </v-card-text>
                </v-window-item>
            </v-window>
          </v-card>
     </v-sheet>
   </v-bottom-sheet>
  </div>
</template>

<script>
import student from '~/composables/students'
export default {
 
   setup(){
     const {
        updateStudent,
        singleStudentAmount,
        single_payment_status,
       avatarColor,
       studentData,
       bottomSheet,
       editItem,
       levelDetails,
        tableHeader,
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
     amount_paid,
     result,
     fcs,
    scs,
    es,
    student_fcs,
    student_scs,
    student_es,
    tscore,
    totalScore,
    addSubject,
    studentResults,
    subjectTitle,
    handleResults,
    resultsHeaders,
    results
      } = student() 
   
     const printDiv = () => {
            var divContents = document.getElementById("students").innerHTML;
            var a = window.open('', 'PRINT', 'height=500, width=800');
            a.document.write('<html>');
            a.document.write(`<body > <h2>${level.value} </h2>`);
            a.document.write(divContents);
            a.document.write('</body></html>');
            a.document.close();
            a.print();
        }
      return {
        printDiv,
         updateStudent,
        singleStudentAmount,
        single_payment_status,
        avatarColor,
        studentData,
        bottomSheet,
         editItem,
        levelDetails,
         tableHeader,
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
     amount_paid,
     result,
     fcs,
    scs,
    es,
    student_fcs,
    student_scs,
    student_es,
    tscore,
    totalScore,
    addSubject,
    subjectTitle,
    studentResults,
    handleResults,
    resultsHeaders,
    results
      }
   }
  
}
</script>

<style scoped>
@media print {
#students {
  width: 100vh;
}
}

</style>