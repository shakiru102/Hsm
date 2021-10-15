const { useContext, useRoute } = require("@nuxtjs/composition-api")
const { ref, computed, onMounted } = require("@vue/composition-api")

const student = () => {


    const { store, $axios } = useContext()
    const route = useRoute()
    const step = ref(1)
   const school_id = ref(store.state.hsm.id)
   const term_id = ref(store.state.hsm.current_term)
   const level = ref(route.value.params.level)
   const expected_amount = ref(0)
   onMounted(() => {
       const result = store.state.currentTerm.students_level.find(item => item.level == level.value)
        expected_amount.value = result.amount
       console.log(expected_amount)
   })
    const  err_amount = ref('')
    const  err_gender = ref('')
    const err_name = ref('')
    const err_age = ref('')
   const name = ref('')
   const amount_paid = ref(0)
   const address = ref('')
   const kin_name = ref('')
   const kin_number = ref('')
   const kin_address = ref('')
   const student_age = ref(0)
   const dialog = ref(false)
   const studentsnackbar = ref(false)
   const payment_status = computed(() => {
       if(amount_paid.value <= 0) return 'VOID'
       if(amount_paid.value > 0 && amount_paid.value < expected_amount.value) return 'UNCOMPLETE'
       return 'COMPLETED'
   })
   const currentTitle = computed(() => {
    switch (step.value) {
        case 1: return 'Student Details'
        case 2: return 'Payment Details'
        default: return 'Optional Details'
      }
   })
   const loading = ref(false)
 const gender = ref('')
 const select = ref(['Male', 'Female'])
 const student_photo = ref('')
 const toggleDialog = () => dialog.value = !dialog.value
 const  handleNext = () =>{
    if(step.value == 1){
      if(name.value == '') return err_name.value = 'enter a name'
      if(student_age.value == 0) return err_age.value = 'enter  age'
      if(gender.value == '') return err_gender.value = 'select gender'
     step.value++ 
    }else if(step.value == 2){
       if( amount_paid.value > expected_amount.value || amount_paid.value < 0 ) return err_amount.value = 'amount should not excced level amount and should not be less than zero'
      step.value++ 
    }
    else{
      step.value++
    }
  }
 const saveStudent = async () => {
     const data = { 
        school_id: school_id.value,
        term_id: term_id.value,
        level: level.value,
        expected_amount: expected_amount.value,
        amount_paid: amount_paid.value,
        name: name.value,
        address: address.value,
        kin_name: kin_name.value,
        kin_number: kin_number.value,
        kin_address: kin_address.value,
        student_age: student_age.value,
        student_photo: student_photo.value,
        payment_status: payment_status.value,
        gender: gender.value,
     }
     loading.value = true;
       try {
           const res = await $axios.post('/api/createStudent', data)
           store.commit('setAllLevelDetails', res.data)
           store.commit('setSnackBar', {
            content: 'Event saved',
            color: 'success' 
            })
           loading.value = false;
            name.value = ''
            amount_paid.value = 0
            address.value = ''
            kin_name.value = ''
            kin_number.value = ''
            kin_address.value = ''
            student_age.value = ''
            gender.value = ''
            student_photo.value = ''
            studentsnackbar.value = true
            err_amount.value = ''
            err_gender.value = ''
           err_name.value = ''
           err_age.value = ''
           step.value = 1

       } catch (error) {
           console.error(error.response.data)
           store.commit('setSnackBar', {
            content: error.response.data,
            color: 'error' 
            })
            loading.value = false;
            name.value = ''
            amount_paid.value = 0
            address.value = ''
            kin_name.value = ''
            kin_number.value = ''
            kin_address.value = ''
            student_age.value = ''
            gender.value = ''
            student_photo.value = ''
            studentsnackbar.value = true
            err_amount.value = ''
            err_gender.value = ''
           err_name.value = ''
           err_age.value = ''


       }
 }

 return {
     handleNext,
     err_amount,
        err_gender,
       err_name,
       err_age,
    studentsnackbar,
    saveStudent,
    loading,
     select,
     dialog,
    toggleDialog,
     currentTitle,
     step,
     level,
     name,
     expected_amount,
     address,
     student_age,
     payment_status,
     gender,
     kin_name,
     kin_address,
     kin_number,
    amount_paid

 }
  
}

export default student