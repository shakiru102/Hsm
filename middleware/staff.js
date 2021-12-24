export default async function ({ $axios, store}) {
    try {
        const staffs = await $axios.get(`/api/staffs?school_id=${store.state.hsm.id}`)
       if(staffs) store.commit('Staffs', staffs.data)
        return
    } catch (error) {
        console.log(error)
        return
    }
    
}