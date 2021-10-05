<template>
<!-- <div></div> -->
  <v-card class="content_div" tile flat :dark="!$store.state.theme">
      <Head :changeToggle="changeToggle" />
         <v-snackbar
       v-model="snackbar"
       :color="$store.state.snackBarProps.color"
       bottom
       timeout="3000"
   >
      <div class="text-center">{{$store.state.snackBarProps.content}}</div> 
   </v-snackbar>
       <v-dialog
         v-model="toggle"
         max-width="1000px"
         transition="dialog-transition"
         scrollable
         persistent
       >
         <v-card
         :dark="!$store.state.theme"
         >
            <div class="term"><span class="mt-3">CREATE TERM</span>  </div>
              <v-container class="">
                <v-row>
                  <v-col cols="6">
                  <v-row>
                  <v-col cols="12" >
                   <v-text-field @change="err_termname = '' " v-model="term_name"   :error-messages="err_termname"  :color="!$store.state.theme ? '' :  '#37474F' "  dense required label="Term Name"  ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                   <div class="term_options">
                    Term Duration
                  </div>
                  </v-col>
                   <v-col cols="6" >
                         <v-menu offset-y>
                           <template v-slot:activator="{ on, attrs }">
                              <v-text-field @change="err_termfrom = '' "   :error-messages="err_termfrom" v-bind="attrs"  v-on="on"  v-model="from" :color="!$store.state.theme ? '' :  '#37474F' " dense required  label="from"  ></v-text-field>
                           </template>
                             <v-date-picker no-title :dark="!$store.state.theme"  v-model="from"></v-date-picker>
                         </v-menu>
                  </v-col> 
                  <v-col cols="6" >
                        <v-menu offset-y>
                           <template v-slot:activator="{ on, attrs }">
                              <v-text-field @change="err_termto = '' "  :error-messages="err_termto" v-bind="attrs"  v-on="on"  v-model="to" :color="!$store.state.theme ? '' :  '#37474F' " dense required  label="to"  ></v-text-field>
                           </template>
                             <v-date-picker no-title :dark="!$store.state.theme"  v-model="to"></v-date-picker>
                         </v-menu>
                  </v-col>
                  <v-col cols="12" class="mb-3">
                   <div class="level_title"> 
                   <span class="term_options">
                    Level/Amount
                  </span>
                      <v-btn   @click="addLevel"  tag="span" small elevation="" icon color="">
                           <v-icon color="">mdi-plus</v-icon>
                         </v-btn>
                    </div>
                  </v-col>
                </v-row>
                <v-card-text>
                    <v-layout   row wrap>
                      <v-flex   xs6>
                      <v-text-field @change="err_termlevel = ''"  :error-messages="err_termlevel"    v-model="level_name"  :color="!$store.state.theme ? '' :  '#37474F' "   class="mr-1"  dense required outlined placeholder="name"  ></v-text-field>
                      </v-flex>
                      <v-flex  xs6>
                      <v-text-field @change="err_termamount = ''" type="number"    :error-messages="err_termamount"   v-model="level_amount"   :color="!$store.state.theme ? '' :  '#37474F' "  class="ml-1 inputnum "  dense required outlined placeholder="amount"  ></v-text-field>
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
                     <v-btn :loading="disabled"  @click="createterm(changeToggle)" text  elevation="" color="success">Create</v-btn>
                     <v-btn  @click="toggle = !toggle" text  elevation="" color="error">Cancel</v-btn>
              </v-card-actions>
         </v-card>
       </v-dialog>
      <nuxt-child />
  </v-card>
</template>

<script>
import utils from '@/composables/utility'
import term from '@/composables/storeterm'

export default {
  middleware: "auth",
  
  setup(){

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
     const { toggle } =  utils()
     const changeToggle = () => toggle.value = !toggle.value
   return { 
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
          snackbar
                  }
  }
}
</script>

<style scoped>
.content_div.v-card {
  height: 86.5vh;
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
  font-family: Montserrat, sans-serif;
  font-size: 1.5em;
  text-align: center;
  font-weight: 500;
  padding-top: 1em;
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

</style>