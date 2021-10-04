
export default async function ({ $axios, store, redirect }) {
    try {
      const user = await $axios.get('/api/userauth')
       if(!user) throw Error('Access Denied')
       store.commit('setHsm', user.data) 
       return      
    } catch (error) {
       return redirect('/HSM') 
    }
 
         
}