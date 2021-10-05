import { useContext, useRouter } from "@nuxtjs/composition-api"
import { ref } from "@vue/composition-api"

const term = () => {
 
    const level_name = ref('')
    const level_amount = ref('')
    const from = ref('')
    const to = ref('')
    const term_name = ref('')
    const level = ref([ ])
    const err_termname = ref('')
    const err_termfrom = ref('')
    const err_termto = ref('')
    const err_termlevel = ref('')
    const err_termamount = ref('')
    const disabled = ref(false)
    const { store, $axios } =  useContext()
    const router = useRouter()
    const snackbar = ref(false)

    const addLevel = () => {
        const data = { level: level_name.value, amount: level_amount.value}
        level.value.push(data)
        console.log(level.value)
    }
    const deleteLevel = (id) => {
        const newlevel = level.value.filter((item, index) => index != id)
        level.value = newlevel
    }
    
    const  createterm = async (changeToggle) => {
      if( 
          !level.value.length 
          ){
           err_termlevel.value ="Input level name"
           err_termamount.value ="Input level amount"
         } else if (
             term_name.value == ''
         ){
            err_termname.value ="Input term name"
         }else if(
             from.value == ''
         ) {
            err_termfrom.value ="Input start date"
         } else if(
             to.value ==''
         ){
            err_termto.value ="Input to date"  
         }else {
            disabled.value = true
            const data = {
               school_id: store.state.hsm.id,
               from: from.value,
               to: to.value,
               students_level: level.value,
               term_name: term_name.value,
            }
            try {
            const res = await $axios.post('/api/createterm', data)
            if(res.status == 200){
                 await store.commit('setHsm', res.data) 
                 await  store.commit('setSnackBar', {
                    content: 'Term is successfully created',
                    color: 'success' 
                })
                }          
             level.value = []
             term_name.value = ''
             from.value = ''
             to.value = ''
             level_amount.value = ''
             level_amount.value = ''
             disabled.value = false
             router.push('Dashboard')
             snackbar.value = !snackbar.value
             changeToggle()
             

            } catch (error) {
                console.log(error.message)
             disabled.value = false
             await  store.commit('setSnackBar', {
                content: 'Could not create term',
                color: 'error' 
            })
            snackbar.value = !snackbar.value
            changeToggle()
            }
         }
    
    }


    return {
     level,
     level_amount,
     level_name,
     addLevel,
     from,
     to,
     term_name,
     err_termname,
     err_termamount,
     err_termfrom,
     err_termto,
     err_termlevel,
     createterm,
     disabled,
     deleteLevel,
     snackbar
    }
}


export default term