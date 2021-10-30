<template>
   <nav>
       <v-navigation-drawer
       app
       mini-variant
       dark
       v-model="nav"
       >
        <v-btn @click="changeTheme" block tile text  class=" mb-16" large >
            <v-icon :color="$store.state.theme ? 'yellow': ''"  >{{ $store.state.theme ? 'mdi-white-balance-sunny'  :' mdi-moon-waning-crescent'}} </v-icon>
          </v-btn>
           <v-tooltip v-for="nav in menu" :key="nav.name"  right>
               <template v-slot:activator="{ on, attrs }">
                     <v-btn x-large   :active-class=" $store.state.theme ?' grey lighten-4 black--text rounded-l-xl' : 'grey darken-2 ' " plain  :to="nav.link" nuxt  v-bind="attrs" v-on="on"  block tile class="grey--text">
                        <v-icon color="">{{ nav.icon }}</v-icon>
                     </v-btn>
               </template>
             <span>{{ nav.name }}</span>
           </v-tooltip>
               <v-btn absolute bottom block plain  class="error--text logout_btn">
                  <v-icon color="">mdi-logout-variant</v-icon>
               </v-btn>
           
       </v-navigation-drawer>
     <v-app-bar 
     clipped-right
     app
     height="90px"
     :dark="!$store.state.theme"
     class="nav_bar"
       flat 
       >
          <v-app-bar-nav-icon @click="nav = !nav" ></v-app-bar-nav-icon>
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                      v-on="on"
                      large
                      plain icon>
                    <v-icon>mdi-bell-outline</v-icon>
                  </v-btn>
              </template>
      <span>Notification</span>
    </v-tooltip>
           <v-tooltip   bottom>
              <template v-slot:activator="{ on, attrs }">
              <v-btn @click="changeToggle" plain   fab depressed large icon color="orange" v-on="on" v-bind="attrs" :class="`${ $store.state.theme ? ' plus_btn' : 'plus_btn_dark' }`" >
                <div class="plus"> + </div>
              </v-btn>
              </template>
      <span>Create Term</span>
    </v-tooltip>
             <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
          <v-badge
          :color=" $store.state.events.length ? '#5C6BC0' : 'transparent'"
          right
          overlap
          >
          <template v-slot:badge>
            <span v-if=" $store.state.events.length">{{ $store.state.events.length }}</span>
          </template>
                  <v-btn
                      large
                      v-bind="attrs"
                      v-on="on"
                      plain icon>
                    <v-icon  >mdi-calendar-search</v-icon>
                  </v-btn>
        </v-badge>
                 
              </template>
      <span>Events</span>
    </v-tooltip>
          <v-spacer></v-spacer>
              <v-btn text>logo</v-btn>
        </v-app-bar> 
        <v-navigation-drawer
        right
        permanent
        app
        clipped
        >
         <Calendar /> 
         <div :class="!$store.state.theme ?'text-center py-2 comingEvents grey darken-4' : 'text-center py-2 comingEvents'"> COMING EVENTS
         </div>
          <v-btn fab absolute small right class="mb-10"   bottom  @click="addEvent"  :light="!$store.state.theme" :color="$store.state.theme ? '#5C6BC0': '#BDBDBD'" :dark="$store.state.theme">
                 <v-icon small >mdi-calendar-plus</v-icon>
               </v-btn>
            <div class="expansionContainer">
              <v-expansion-panels flat>
               <v-expansion-panel  :style="`border-left: solid 2.5px ${item.event_color}; margin-top: 0.1em;  `" class="events" v-for="(item, index) in filtered" :key="index">
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
            </div>
        </v-navigation-drawer>
   </nav>
</template>

<script>
  import moment from 'moment'
import utils from '@/composables/utility'
import { computed } from '@vue/composition-api'
import { useContext } from '@nuxtjs/composition-api'
export default {
  
  props: ['changeToggle', 'addEvent'],
    setup() {
        const { nav, rightBar,  changeTheme, menu, date } = utils()
        const { store } = useContext()
         const filtered = computed(() =>store.state.events.filter(item => item.event_date >= date.value).map( item => {
           return {
            event_date:  moment(item.event_date).format('dddd, MMMM Do YYYY'),
            event_title: item.event_title,
            event_content: item.event_content,
            event_color: item.event_color,
            _id: item._id,
           }
         }))
     
        return {
            nav, rightBar,  changeTheme, menu, filtered, 
        }
    }
}
</script>
<style scoped>
.plus_btn.v-btn{
  box-shadow: 0px 10px  24px rgba(192, 188, 185, 0.336);
  margin: auto 15px auto 15px;

}
.plus_btn_dark.v-btn{
  box-shadow: 0px 10px  24px rgba(32, 31, 31, 0.562);
   margin: auto 15px auto 15px;
   /* color: #5c6bc08c; */

}
 .plus{
  height: 100%;
    font-size: 3em;
    font-weight: 200;
   background: linear-gradient(90deg, red, orange, purple);
   background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
}
.logout_btn{
  transform: rotate(-180deg);
}
span{
  font-family: Montserrat, sans-serif;
  font-weight: 500;
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
.comingEvents{
  font-family: Montserrat, sans-serif;
  font-weight: 500;
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
.expansionContainer{
  height: 270px;
  overflow-y: scroll;
   -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
}
.expansionContainer::-webkit-scrollbar{
  display: none;
}
</style>