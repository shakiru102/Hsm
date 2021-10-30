<template>
 <v-container class=" my-5 " >
    <v-row>
      <v-col cols="4"  align="center" >
            <div class=" completed mb-5">COMPLETED</div>
        <v-progress-circular      
              color="#29cc97"
              size="150"
              :value="completed('Completed')"
              class="progress_barCirular"
            >{{ completed('Completed') }}%</v-progress-circular>
      </v-col>
      <v-col cols="4" align="center"  >
            <div class=" uncomplete mb-5">UNCOMPLETE</div>
        <v-progress-circular      
              color="#8061ef"
              size="150"
              class="progress_barCirular"
              :value="uncompleted('Uncomplete')"
            >{{ uncompleted('Uncomplete') }}%</v-progress-circular>
      </v-col>
      <v-col cols="4"  align="center" >
            <div class=" void error--text mb-5">VOID</div>
         <v-progress-circular      
               color="error"
             size="150"
            class="progress_barCirular"
               :value="Void('Void')"
             >{{ Void('Void') }}%</v-progress-circular>
      </v-col>
      <v-col cols="4"   class="pl-16 mt-16 mx-auto" >
        <client-only>
          <bar-chart :data="barData" :options="barOptions"   :height="400" />
        </client-only>
      </v-col>
      <v-col cols="4"   class="mt-16 mx-auto"  >
         <client-only>
        <doughnut-chart :options="chartOptions"   :data="chartData" :height="250"></doughnut-chart>
    </client-only>
      </v-col>
          <!-- <v-col cols="4" class="mt-16"  > -->
         <!-- <client-only>
        <doughnut-chart :options="chartOptions"   :data="chartData" :height="200"></doughnut-chart>
    </client-only> -->
      <!-- </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'
export default {

 middleware: ['student', 'term'],

setup() {
   const { store } = useContext()
    const  completed = (status) => {
         const newstudents = store.state.allLevelDetails.filter(item => item.payment_status == status)
         const allLevelStudents = store.state.allLevelDetails
         const Total = (newstudents.length / allLevelStudents.length) * 100
         if(!newstudents.length) return 0
         return Total.toFixed(0)
      }
      const  uncompleted = (status) => {
         const newstudents = store.state.allLevelDetails.filter(item => item.payment_status == status)
         const allLevelStudents = store.state.allLevelDetails
         const Total = (newstudents.length / allLevelStudents.length) * 100
         if(!newstudents.length) return 0
         return Total.toFixed(0)
      }
      const Void = (status) => {
         const newstudents = store.state.allLevelDetails.filter(item => item.payment_status == status)
         const allLevelStudents = store.state.allLevelDetails
         const Total = (newstudents.length / allLevelStudents.length) * 100
         if(!newstudents.length) return 0
         return Total.toFixed(0)
      }

      //barData.length
      const totalNumber = computed(() => store.state.allLevelDetails)
      const completedNumber = computed(() => store.state.allLevelDetails.filter(item => item.payment_status == 'Completed'))
      const uncompleteNumber = computed(() => store.state.allLevelDetails.filter(item => item.payment_status == 'Uncomplete'))
      const voidNumber = computed(() => store.state.allLevelDetails.filter(item => item.payment_status == 'Void'))
      const collectedNumber = computed(() => store.state.allLevelDetails.filter(item => item.starter_pack == 'Collected'))
      const awaitingNumber = computed(() => store.state.allLevelDetails.filter(item => item.starter_pack == 'Awaiting'))
        
     
      const barData = {
        labels: [ 'Total','Completed', 'Uncomplete', 'Void'],
        datasets: [
        {
          data: [totalNumber.value.length, completedNumber.value.length, uncompleteNumber.value.length, voidNumber.value.length],
          backgroundColor: ['#1976D2','#29cc97', '#8061ef', '#FF5252'],
          }
        
        ]
      }
      const barOptions = {
        responsive: true,
        title: {
          display: true,
          text: 'NUMBER OF STUDENTS'
        },
          legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            maxBarThickness: 35,
            gridLines: {
            display: false
        }
          }],
          yAxes: [{
          gridLines: {
         display: false
      }
      }]
        }
      }
       const chartData = {
        labels: [ 'Collected', 'Awaiting'],
        datasets: [
        {
          data: [collectedNumber.value.length, awaitingNumber.value.length],
          backgroundColor: ['#1976D2','#29cc97'],
          borderColor: ['#1976D2','#29cc97'],
          }
        
        ]
      }
      const chartOptions = {
         legend: {
        display: false,
      },
       title: {
          display: true,
          text: 'STUDENTS STARTER PACK'
        },
      }
 
   return{
     completed,
     uncompleted,
     Void,
     barData,
     barOptions,
     chartData,
     chartOptions,
   }
  }
}
</script>

<style scoped>
.completed {
  color: #29cc97;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
}
.uncomplete {
  color: #8061ef;
   font-family: Montserrat, sans-serif;
  font-weight: 500;
}
.void{
   font-family: Montserrat, sans-serif;
  font-weight: 500;
}
.progress_barCirular{
  font-family: Montserrat, sans-serif;
  font-size: 1.8em;
}
.total_text{
     font-size: 1.8em;
    font-weight: 800;
   background: linear-gradient(90deg, #29cc97, #8061ef, purple);
   background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
}
.total_num{

}
</style>