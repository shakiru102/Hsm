export default async function ({ $axios, store }) {
    // return
    try {
      const students = await $axios.get(`/api/getStudents?school_id=${ store.state.hsm.id }`)
       store.commit('setAllLevelDetails', students.data) 
       return      
    } catch (error) {
       return console.log(error.response.data)
    }
 
         
}