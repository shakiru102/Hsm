<template>
   <nav>
       <v-navigation-drawer
       app
       mini-variant
       dark
       v-model="nav"
       >
        <v-btn @click="changeTheme" block tile text class="deep-purple darken-1 mb-16"  large :color="$store.state.theme ? 'yellow': ''" >
            <v-icon >{{ $store.state.theme ? 'mdi-white-balance-sunny'  :' mdi-moon-waning-crescent'}} </v-icon>
          </v-btn>
           <v-tooltip v-for="nav in menu" :key="nav.name"  right>
               <template v-slot:activator="{ on, attrs }">
                     <v-btn x-large   :active-class=" $store.state.theme ?' white black--text rounded-l-xl' : 'grey darken-2 ' " plain  :to="nav.link" nuxt  v-bind="attrs" v-on="on"  block tile class="grey--text">
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
      :color="$store.state.theme ?  'transparent': ''"
       flat >
          <v-app-bar-nav-icon @click="nav = !nav" ></v-app-bar-nav-icon>
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                      v-on="on"
                      plain icon>
                    <v-icon>mdi-bell-outline</v-icon>
                  </v-btn>
              </template>
      <span>Notification</span>
    </v-tooltip>
           <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
              <v-btn fab depressed large icon color="orange" v-on="on" v-bind="attrs" :class="`${ $store.state.theme ? ' plus_btn' : 'plus_btn_dark' }`" >
                <div class="plus"> + </div>
              </v-btn>
              </template>
      <span>Create Term</span>
    </v-tooltip>
             <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                      v-on="on"
                      plain icon>
                    <v-icon  >mdi-calendar-search</v-icon>
                  </v-btn>
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
        </v-navigation-drawer> 
   </nav>
</template>

<script>
import utils from '@/composables/utility'
export default {
    setup(props) {
        const { nav, rightBar,  changeTheme, menu } = utils()
        return {
            nav, rightBar,  changeTheme, menu
        }
    }
}
</script>
<style scoped>
.plus_btn.v-btn{
  box-shadow: 0px 10px  24px rgba(242, 148, 76, 0.336);
  margin: auto 15px auto 15px;

}
.plus_btn_dark.v-btn{
  box-shadow: 0px 10px  24px rgba(32, 31, 31, 0.562);
   margin: auto 15px auto 15px;

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
</style>