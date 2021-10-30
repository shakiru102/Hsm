<template>
<div>
   <v-container class="my-8" v-if="$store.state.currentTerm !== null">
      <v-layout row wrap justify-space-between>
        <v-flex   xs4 v-for="item in $store.state.currentTerm.students_level" :key="item._id">
          <v-expansion-panels  :class=" $store.state.theme ? 'panel': 'panel_dark' " flat >
            <v-expansion-panel>
              <v-expansion-panel-header >
                <div :class="$store.state.theme ? ` level  text-center`: 'level_dark  text-center' ">{{ item.level }}</div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
          <div class="level_text_style">
            <div class="level_total">
              <div class="total_text text-center">TOTAL</div>
              <div class="total_num text-center">{{ total(item.level) }}</div>
            </div>
            <div class="level_stats">
              <div class="completed text text-center">
                <div class="completed_text">COMPLETED</div>
                   <v-progress-circular
      :rotate="360"
       :size="70"
      :width="3"
      :value="completed(item.level, 'Completed')"
      color="#29cc97"
    >
      {{ completed(item.level, 'Completed') }}%
    </v-progress-circular>
              </div>
               <div class="uncompleted text text-center">
                <div class="uncompleted_text ">UNCOMPLETE</div>
                  <v-progress-circular
      :rotate="360"
      :size="70"
      :width="3"
      :value="uncompleted(item.level, 'Uncomplete')"
      color="#8061ef"
    >
      {{ uncompleted(item.level, 'Uncomplete') }}%
    </v-progress-circular>
              </div>
               <div class="void text text-center">
                <div class="void_text error--text">VOID</div>
                   <v-progress-circular
      :rotate="360"
      :size="70"
      :width="3"
      :value="Void(item.level, 'Void')"
      color="error"
    >
      {{ Void(item.level, 'Void') }}%
    </v-progress-circular>
              </div>
            </div>
          </div>
                <v-btn fab :to="`/student/${item.level}`" nuxt x-small dark  absolute bottom right color="#5C6BC0">
                   <v-icon color="">mdi-account-group</v-icon>
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
export default {
 middleware: ['term', 'student'] ,
 setup(){
   const { store } = useContext()
    const  completed = (level, status) => {
         const newstudents = store.state.allLevelDetails.filter(item => item.level == level && item.payment_status == status)
         const allLevelStudents = store.state.allLevelDetails.filter(item => item.level == level )
         const Total = (newstudents.length / allLevelStudents.length) * 100
         if(!newstudents.length) return 0
         return Total.toFixed(0)
      }
      const  uncompleted = (level, status) => {
         const newstudents = store.state.allLevelDetails.filter(item => item.level == level && item.payment_status == status)
         const allLevelStudents = store.state.allLevelDetails.filter(item => item.level == level )
         const Total = (newstudents.length / allLevelStudents.length) * 100
         if(!newstudents.length) return 0
         return Total.toFixed(0)
      }
      const Void = (level, status) => {
         const newstudents = store.state.allLevelDetails.filter(item => item.level == level && item.payment_status == status)
         const allLevelStudents = store.state.allLevelDetails.filter(item => item.level == level )
         const Total = (newstudents.length / allLevelStudents.length) * 100
         if(!newstudents.length) return 0
         return Total.toFixed(0)
      }
        
      const total = (level) => {
        const tot = store.state.allLevelDetails.filter(item => item.level == level )
        return tot.length
      }
   return{
     total,
     completed,
     uncompleted,
     Void
   }
 }

}
</script>

<style scoped>
.panel{
  width: 320px;
  margin: 0 auto 1.5em auto;
   box-shadow: 0px 10px  24px rgba(192, 188, 185, 0.336);

}
.panel_dark{
  width: 320px;
  margin: 0 auto;
   box-shadow: 0px 10px  24px rgba(0, 0, 0, 0.301);
  margin: 0 auto 1.5em auto;

}
.level_stats{
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin-top: 1em;

  /* align-items: center; */
}
.level_text_style{
  font-family: Montserrat, sans-serif;
  height: 75%;

}
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
.total_text{
  margin-top: 0.5em;
  font-weight: 700;
  color: #1976D2;
  font-size: 0.8em;
}
.total_num{
  font-size: 1em;
  font-weight: 800;


}
.total_num_dark{
  font-size: 1.2em;
  font-weight: 800;
  color: rgb(201, 197, 197);

}
.completed_text{
  color:#29cc97;
  font-size: 0.6em;
  font-weight: 700;
  margin-bottom: 1em;


}
.completed_num{
  font-weight: 800;
}
.uncompleted_text{
  font-size: 0.6em;
  font-weight: 700;
  margin-bottom: 1em;
  color: #8061ef;


}
.uncompleted_num{
  font-weight: 800;
}
.void_text{
  font-size: 0.6em;
  font-weight: 700;
  margin-bottom: 1em;


}
.void_num{
  font-weight: 800;
}
</style>