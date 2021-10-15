export default async function ({ $axios, store }) {
    // return
    try {
      const event = await $axios.get(`/api/Events?school_id=${ store.state.hsm.id }&&term_id=${ store.state.hsm.current_term}`)
       if(!event) throw Error('Could not get events')
       store.commit('setEvent', event.data) 
       return      
    } catch (error) {
       return console.log(error.response.data)
    }
 
         
}