import { useContext } from "@nuxtjs/composition-api"
import { ref } from "@vue/composition-api"

const Eventapi = () => {
   const {store, $axios} =  useContext()
   const school_id = ref(store.state.hsm.id)
   const term_id = ref(store.state.hsm.current_term)
   const event_title  = ref('')
   const event_content = ref('')
   const event_date = ref( (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
   const event_color = ref("#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}))
   const event_title_err  = ref('')
   const event_content_err = ref('')
   const event_date_err = ref('')
   const event_color_err = ref('')
   const eventloading = ref(false)
   const eventToggle = ref(false)
   const eventsnackbar = ref(false)
   

    
  //functions
  const saveEvent = async () => {
      if(event_date.value == ''){
          event_date_err.value = 'Select Date'
      }else if(event_color.value == ''){
        event_color_err.value = 'Choose a color'
    }else if(event_title.value == ''){
        event_title_err.value = 'Input event title'
    }else if(event_content.value == ''){
        event_content_err.value = 'Input event content'
    }else{
        eventloading.value = true
        try {
            const data = {
                 school_id : school_id.value ,
                 term_id : term_id.value,
                 event_title  : event_title.value,
                 event_content : event_content.value,
                 event_date : event_date.value,
                 event_color : event_color.value
            }
            const events = await $axios.post('/api/createEvent', data)
            store.commit('setEvent', events.data)
            store.commit('setSnackBar', {
                content: 'Event saved',
                color: 'success' 
            })
            eventloading.value = false
            eventToggle.value = !eventToggle.value
            eventsnackbar.value = !eventsnackbar.value

        } catch (error) {
            store.commit('setSnackBar', {
                content: 'Event not  saved',
                color: 'error' 
            })
            eventloading.value = false
            eventToggle.value = !eventToggle.value
            eventsnackbar.value = !eventsnackbar.value 
        }
    } 

  }
    return {
        eventToggle,
        event_title,
        event_color,
        event_date,
        event_content,
        event_title_err,
        event_color_err,
        event_date_err,
        event_content_err,
        saveEvent,
        eventloading,
        eventsnackbar
    }
}

export default Eventapi
