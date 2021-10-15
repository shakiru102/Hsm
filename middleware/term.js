export default async function ({ $axios, store }) {
    // return
    try {
      const term = await $axios.get(`/api/currentTerm?currentTerm=${ store.state.hsm.current_term}`)
       if(!term) throw Error('Could not get events')
       store.commit('setCurrentTerm', term.data) 
       return      
    } catch (error) {
       return console.log(error.response.data)
    }
 
         
}