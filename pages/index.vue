<template>
<!-- <div></div> -->
  <v-card class="content_div" :color="$store.state.theme ? '#F5F5F5' : ''"  tile flat :dark="!$store.state.theme">
      <Head :toggleEventDialog="toggleEventDialog" :changeProfile="changeProfile"  :addEvent="addEvent" :snackbar="snackbar" :changeToggle="changeToggle" />
         <v-snackbar
       v-model="snackbar"
       :color="$store.state.snackBarProps.color"
       bottom
       timeout="3000"
   >
    

      <div class="text-center">{{$store.state.snackBarProps.content}}</div> 
   </v-snackbar>
   <v-snackbar
       v-model="eventsnackbar"
       :color="$store.state.snackBarProps.color"
       bottom
       timeout="3000"
   >
      <div class="text-center">{{$store.state.snackBarProps.content}}</div> 
   </v-snackbar>

   <!-- dialog for creating term  -->
       <v-dialog
         v-model="toggle"
         max-width="1000px"
         transition="scroll-y-transition"
         persistent
       >
         <v-card
         :dark="!$store.state.theme"
         :color="$store.state.theme ? '#F5F5F5' : ''"
         class="px-16 pt-5"
         >
            <div class="title font-weight-regular"><span class="">Create Term</span>  </div>
              <v-container class="">
                <v-row>
                  <v-col cols="6">
                  <v-row>
                  <v-col cols="12" >
                   <v-text-field @change="err_termname = '' " v-model="term_name"   :error-messages="err_termname" color="#5C6BC0"  dense required label="Term Name"  ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                   <div class="term_options">
                    Term Duration
                  </div>
                  </v-col>
                   <v-col cols="6" >
                         <v-menu offset-y>
                           <template v-slot:activator="{ on, attrs }">
                              <v-text-field @change="err_termfrom = '' "   :error-messages="err_termfrom" v-bind="attrs"  v-on="on"  v-model="from" color="#5C6BC0" dense required  label="from"  ></v-text-field>
                           </template>
                             <v-date-picker no-title :dark="!$store.state.theme"  v-model="from"></v-date-picker>
                         </v-menu>
                  </v-col> 
                  <v-col cols="6" >
                        <v-menu offset-y>
                           <template v-slot:activator="{ on, attrs }">
                              <v-text-field @change="err_termto = '' "  :error-messages="err_termto" v-bind="attrs"  v-on="on"  v-model="to" color="#5C6BC0" dense required  label="to"  ></v-text-field>
                           </template>
                             <v-date-picker no-title :dark="!$store.state.theme"  v-model="to"></v-date-picker>
                         </v-menu>
                  </v-col>
                  <v-col cols="12" class="mb-3">
                   <div class="level_title"> 
                   <span class="term_options">
                    Level/Amount
                  </span>
                      <v-btn   @click="addLevel"  tag="span" small elevation="" icon color="#5C6BC0">
                           <v-icon color="">mdi-plus</v-icon>
                         </v-btn>
                    </div>
                  </v-col>
                </v-row>
                <v-card-text>
                    <v-layout   row wrap>
                      <v-flex   xs6>
                      <v-text-field @change="err_termlevel = ''"  :error-messages="err_termlevel"    v-model="level_name"  color="#5C6BC0"   class="mr-1"  dense required outlined placeholder="name"  ></v-text-field>
                      </v-flex>
                      <v-flex  xs6>
                      <v-text-field @change="err_termamount = ''" type="number"    :error-messages="err_termamount"   v-model="level_amount"  color="#5C6BC0"  class="ml-1 inputnum "  dense required outlined placeholder="amount"  ></v-text-field>
                      </v-flex>
                    </v-layout>
                </v-card-text>
                </v-col>
                <v-col cols="6" >
                  <div  v-if="level.length"  class="listItem">
                   <v-container  class="text-center">
                      <v-layout  v-for="(item, index) in level" :key="index"   row wrap>
                      <v-flex   xs5>
                      <v-text-field  disabled  :value="item.level"  :color="!$store.state.theme ? '' :  '#37474F' "   class="mr-1 disabledList "  dense required outlined placeholder="name"  ></v-text-field>
                      </v-flex>
                      <v-flex  xs5>
                      <v-text-field    disabled :value="item.amount"  :color="!$store.state.theme ? '' :  '#37474F' "  class="ml-1 disabledList "  dense required outlined placeholder="amount"  ></v-text-field>
                      </v-flex>
                        <v-flex  xs2>
                           <v-btn right @click="deleteLevel(index)"  color="error" icon>
                                  <v-icon >mdi-delete-outline</v-icon>
                                </v-btn>
                      </v-flex>
                    </v-layout>
                    </v-container>
                    </div>
                    <div class="icon" v-else>
                       <v-icon  class="book_icon"   :color="!$store.state.theme ? '' :  '#424242' ">mdi-book-open-page-variant-outline</v-icon> 
                    </div>
                </v-col>
              </v-row>
              </v-container>
              <v-card-actions>
                     <v-btn :loading="disabled"  @click="createterm(changeToggle)" text  elevation="" color="#5C6BC0">Create</v-btn>
                     <v-btn  @click="toggle = !toggle" text  elevation="" color="error">Cancel</v-btn>
              </v-card-actions>
         </v-card>
       </v-dialog>

       <!-- List of Events dialog  -->
        <v-dialog
          v-model="eventDialog"
          max-width="1000px"
          transition="dialog-transition"
        >
          <v-card class="list_card_cont"  :dark="!$store.state.theme">
            <v-card-title>
              <div :class=" $store.state.theme ? 'school_events' : 'school_events_dark'">Current Term Events</div>
            </v-card-title>
            <div class="list_of_events">
            <v-expansion-panels flat v-if="formatted.length" >
               <v-expansion-panel  :style="`border-left: solid 2.5px ${item.event_color}; margin-top: 0.1em;  `" class="events" v-for="(item, index) in formatted" :key="index">
                 <v-expansion-panel-header>
                   <div>
                      <div :class="!$store.state.theme ? 'head_dark' : 'head'">{{ item.event_date }}</div>
                    <div :class=" !$store.state.theme ?  'content_dark text-uppercase' : 'content text-uppercase' ">{{ item.event_title }}</div>
                   </div>
                 </v-expansion-panel-header>
                 <v-expansion-panel-content>
                   <div :class=" !$store.state.theme ?  'subContent_dark' :'subContent' ">{{ item.event_content }}</div>
                 </v-expansion-panel-content>
               </v-expansion-panel>
              </v-expansion-panels>
              <div v-else class="text-center"> There are no events yet. </div>
              </div>
          </v-card>
        </v-dialog>

       <!-- routes children  -->
         <v-window v-model="profile" reverse>
           <v-window-item :value="1">
                <nuxt-child />
           </v-window-item>
             <v-window-item :value="2">
                <v-container class="">
                   <v-row
               >
                 <v-btn @click="profile--" x-large icon>
                        <v-icon >mdi-arrow-left-circle-outline</v-icon>
                      </v-btn>
               </v-row>
                 </v-container>
             </v-window-item>
           </v-window>
      <!-- dialog fron events  -->
 <v-dialog
         v-model="eventToggle"
         max-width="500px"
         transition="slide-x-reverse-transition"
       >
         <v-card
         tile
         :dark="!$store.state.theme"
         :color="$store.state.theme ? '#F5F5F5' : ''"
         class="px-16 pt-8"
         >
          <div class="title font-weight-regular">Add Event</div>
              <v-container >
                 <v-row>
                      <v-col cols="12">
                     <v-text-field :error-messages="event_title_err" color="#5C6BC0"  v-model="event_title" dense label="Event Title" ></v-text-field>
                   </v-col>
                     <v-col cols="12">
                     <v-textarea :error-messages="event_content_err" color="#5C6BC0"  v-model="event_content" auto-grow  rows="3"  label="Event Description" ></v-textarea>
                   </v-col>
                    <v-col cols="6">
                          <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field outlined  :error-messages="event_date_err" color="#5C6BC0" v-model="event_date" v-bind="attrs" v-on="on" dense label="Event Date" ></v-text-field>
                            </template>
                              <v-date-picker :dark="!$store.state.theme" no-title   v-model="event_date"></v-date-picker>
                          </v-menu>
                   </v-col>
                    <v-col cols="6">
                          <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field outlined  :error-messages="event_color_err" color="#5C6BC0" v-model="event_color" v-bind="attrs" v-on="on" dense label="Event Color" >
                                <template v-slot:append>
                                        <v-icon  :color="event_color">mdi-brush</v-icon>
                                </template>
                              </v-text-field>
                            </template>
                              <v-color-picker
                                    :dark="!$store.state.theme"
                                    v-model="event_color"
                                  ></v-color-picker>
                          </v-menu>
                   </v-col>
                 </v-row>
               </v-container>
               <v-card-actions>
                     <v-btn small elevation="" :loading="eventloading"  @click="saveEvent" text color="#5C6BC0">save</v-btn>
                     <v-btn small elevation="" text  @click="eventToggle = false" color="error">cancel</v-btn>
               </v-card-actions>
         </v-card>
       </v-dialog>

  </v-card>
</template>

<script>
import utils from '@/composables/utility'
import term from '@/composables/storeterm'
import Eventapi from '@/composables/eventapi'
import { useContext } from '@nuxtjs/composition-api'
import { ref, computed } from "@vue/composition-api"
import moment from 'moment'
export default {
  middleware: ["auth", "staff" ,  "event"],
  
  setup(){
     
     const {
        event_title,
        event_color,
        event_date,
        event_content,
        saveEvent,
        eventloading,
        event_title_err,
        event_color_err,
        event_date_err,
        event_content_err,
         eventToggle,
         eventsnackbar
     } = Eventapi()
     const { 
        deleteLevel, 
        disabled, 
        level,
        level_name,
        level_amount,
        addLevel,
        term_name,
        from,
        to, 
        err_termlevel, 
        err_termamount,
        err_termname,
        err_termfrom,
        err_termto,
        createterm,
        snackbar
                 } =  term()
      const {store} =  useContext()
     const { toggle } =  utils()
     const addEvent =   () => {
       if(store.state.hsm.current_term == ''){
             store.commit('setSnackBar', {
                    content: 'Create term first',
                    color: 'error' 
                })
                snackbar.value = !snackbar.value
       }else{
         eventToggle.value = !eventToggle.value
       }
     }
     const changeToggle = () => toggle.value = !toggle.value
     const profile = ref(1)     
     const changeProfile = () => profile.value++
     const formatted = computed(() =>store.state.events.map( item => {
           return {
            event_date:  moment(item.event_date).format('dddd, MMMM Do YYYY'),
            event_title: item.event_title,
            event_content: item.event_content,
            event_color: item.event_color,
            _id: item._id,
           }
         }))
         const eventDialog = ref(false)
         const toggleEventDialog = () => eventDialog.value = !eventDialog.value

return { 
      toggleEventDialog,
       eventDialog,
        formatted,
        changeProfile,
          profile,
          eventsnackbar,
          deleteLevel, 
          disabled,
          changeToggle, 
          toggle, 
          level,
          level_name,
          level_amount,
          addLevel, 
          term_name, 
          from,
          to, 
          err_termlevel, 
          err_termamount, 
          err_termname,
          err_termfrom,
          err_termto,
          createterm,
          snackbar,
          eventToggle,
          addEvent,
          store,
          event_title,
          event_color,
          event_date,
          event_content,
          saveEvent,
          eventloading,
          event_title_err,
          event_color_err,
          event_date_err,
          event_content_err,
                  }
  }
}
</script>

<style scoped>
.content_div.v-card {
  height: 100vh;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
}
.content_div.v-card::-webkit-scrollbar{
  display: none;
}
.cont{
  height: 200vh;
}
.term{
  font-size: 1.5em;
  /* text-align: center; */
  font-weight: 400;
}
.level_title{
  display: flex;
  justify-content: space-between;
}
.icon{
    display: grid;
    place-items: center;
   height: 300px;
  width: 100%;
}

.listItem{
   height: 300px;
   overflow-y: scroll;
   -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
}
.listItem::-webkit-scrollbar{
  display: none;
}

.v-icon.book_icon{
  font-size: 15em;
}
.content{
   font-size: 0.7em;
  font-weight: 500;
  margin-top: 0.5em; 
 color: grey;
 
}
.content_dark{
   font-size: 0.7em;
  font-weight: 500;
  margin-top: 0.5em; 
color: rgb(201, 197, 197);
 
}
 .head{
 font-family: Montserrat, sans-serif; 
 font-size: 0.8em;
 font-weight: 500;
 color: grey;
}
 .head_dark{
 font-family: Montserrat, sans-serif; 
 font-size: 0.8em;
 font-weight: 500;
 color: rgb(201, 197, 197);
}
.subContent{
   font-size: 0.7em;
  /* font-weight: 500; */
  margin-top: 0.5em; 
 color: grey;
 
}
.subContent_dark{
   font-size: 0.7em;
  /* font-weight: 500; */
  margin-top: 0.5em; 
color: rgb(201, 197, 197);
 
}
.list_card_cont.v-card{
 height: 500px;
 overflow: hidden;

}
.list_of_events{
 height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
}
.list_of_events::-webkit-scrollbar{
  width: 5px;
}
.list_of_events::-webkit-scrollbar-thumb{
  width: 5px;
  background: #5C6BC0;
  border-radius: 3px;
}
.school_events{
    font-family: Montserrat, sans-serif;
  font-weight: bold;
}
.school_events_dark{
    font-family: Montserrat, sans-serif;
  font-weight: bold;
  color: rgb(201, 197, 197);
}
</style>