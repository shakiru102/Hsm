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
   const result = ref(1)
   const fcs = ref(20)
   const scs = ref(20)
   const es = ref(60)
   const student_fcs = ref(0)
   const student_scs = ref(0)
   const student_es = ref(0)
   const studentResults = ref([])
   const subjectTitle = ref('')
   
   const tscore = ref(100)
   const totalScore = computed(() => {
     const sumtotal = parseInt(student_fcs.value) + parseInt(student_scs.value) + parseInt(student_es.value)
    return sumtotal 
  })
   onMounted(() => {
       const result = store.state.currentTerm.students_level.find(item => item.level == level.value)
        expected_amount.value = result.amount
       console.log(expected_amount)

       studentResults.value = JSON.parse(localStorage.getItem('results')) || []
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
   const starter_pack = ref('Awaiting')
   const student_age = ref(0)
   const dialog = ref(false)
   const studentsnackbar = ref(false)
   const payment_status = computed(() => {
       if(amount_paid.value <= 0) return 'Void'
       if(amount_paid.value > 0 && amount_paid.value < expected_amount.value) return 'Uncomplete'
       return 'Completed'
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
        starter_pack: starter_pack.value,

     }
     loading.value = true;
       try {
           const res = await $axios.post('/api/createStudent', data)
           store.commit('setAllLevelDetails', res.data)
           store.commit('setSnackBar', {
            content: 'Student Created',
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

 const tableHeader = ref([
  { sortable: false, text: 'Names', value: 'name'},
   { text: 'Age', value: 'student_age'},
   { text: 'Gender', value: 'gender'},
   { text: 'PD (amount)', value: 'amount_paid'},
   { text: 'EXP (amount)', value: 'expected_amount'},
   { text: 'PM (status)', value: 'payment_status_abbr'},
   { text: 'ST (pack)', value: 'starter_pack_abbr'},
   { text: 'Actions', value: 'actions', sortable: false}
 ])
 
  const levelDetails = computed(() => {
  const students =  store.state.allLevelDetails.filter( item => item.level == level.value)
  return students.map(student => {
    return {
        school_id: student.school_id,
        term_id: student.term_id,
        level: student.level,
        expected_amount: '₦' + student.expected_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        amount_paid: '₦' + student.amount_paid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        amount_paid_num: student.amount_paid,
        name: student.name,
        address: student.address,
        kin_name: student.kin_name,
        kin_number: student.kin_number,
        kin_address: student.kin_address,
        student_age: student.student_age,
        student_photo: student.student_photo,
        payment_status: student.payment_status,
        payment_status_abbr: student.payment_status[0],
        gender: student.gender[0],
        gender_gender: student.gender,
        starter_pack: student.starter_pack,
        starter_pack_abbr: student.starter_pack[0],
        _id: student._id,
    }
  })
  })
  const singleStudentAmount = ref(0)
  const single_payment_status = computed(() => {
    if(singleStudentAmount.value <= 0) return 'Void'
    if(singleStudentAmount.value > 0 && singleStudentAmount.value < expected_amount.value) return 'Uncomplete'
    return 'Completed'
})
  const bottomSheet = ref(false)
  const studentData = ref(null)
  const  editItem = (data) => {
          bottomSheet.value = !bottomSheet.value
          singleStudentAmount.value = data.amount_paid_num
          studentData.value = data  
          result.value = 1
  }
  const avatarColor = (status) => {
    if(studentData.value != null){
      if(status == "Completed") return "success"
      if(status == "Uncomplete") return "warning"
      if(status == "Void") return "error"
    }
    return ''
  } 
  const updateStudent = async () => {
    if( singleStudentAmount.value > expected_amount.value || singleStudentAmount.value < 0 ) return err_amount.value = 'amount should not excced level amount and should not be less than zero'
    loading.value = true  
    const data = {
        school_id: studentData.value.school_id,
        term_id: studentData.value.term_id,
        level: studentData.value.level,
        expected_amount: studentData.value.expected_amount,
        amount_paid: singleStudentAmount.value,
        name: studentData.value.name,
        address: studentData.value.address,
        kin_name: studentData.value.kin_name,
        kin_number: studentData.value.kin_number,
        kin_address: studentData.value.kin_address,
        student_age: studentData.value.student_age,
        student_photo: studentData.value.student_photo,
        payment_status: single_payment_status.value,
        gender: studentData.value.gender_gender,
        starter_pack: studentData.value.starter_pack,
        _id: studentData.value._id,
      }
      try {
        const res = await $axios.post('/api/updateStudent', data)
        store.commit('setAllLevelDetails', res.data)
        store.commit('setSnackBar', {
         content: 'Student Created',
         color: 'success' 
         })
         err_amount.value = ''
        console.log(res.data)
        loading.value = false  
         bottomSheet.value = !bottomSheet.value
         studentsnackbar.value = true

      } catch (error) {
        console.error(error.response.data)
        store.commit('setSnackBar', {
         content: error.response.data,
         color: 'error' 
         })
         studentsnackbar.value = true
          loading.value = false  

        
      }
  }

  const addSubject = () => {
      const data = {
         subject_title: subjectTitle.value,
         exp_fcs: fcs.value,
         exp_scs: scs.value,
         exp_es: es.value,
         fcs: student_fcs.value,
         scs: student_scs.value,
         es: student_es.value
      }
      studentResults.value = [...studentResults.value, data]
      subjectTitle.value = ''
      student_fcs.value = 0
      student_scs.value = 0
      student_es.value = 0

  }

  const resultsHeaders = ref([
    { text: 'Subject', value: 'subject_title' },
    { text: 'EXP 1st CA score', value: 'exp_fcs' },
    { text: 'EXP 2nd CA score', value: 'exp_scs' },
    { text: 'EXP exam score', value: 'exp_es' },
    { text: 'EXP total score', value: 'exptotal' },
    { text: '1st CA score', value: 'fcs' },
    { text: '2nd CA score', value: 'scs' },
    { text: 'Exam score', value: 'es' },
    { text: 'Total score', value: 'total' },

  ])

  const handleResults = () => {
    localStorage.setItem('results', JSON.stringify(studentResults.value))
  }

  const results = ref([])

 return {
  updateStudent,
  singleStudentAmount,
  single_payment_status,
  avatarColor,
  studentData,
   bottomSheet,
  editItem,
  levelDetails,
   tableHeader,
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
    amount_paid,
    result,
    fcs,
    scs,
    es,
    student_fcs,
    student_scs,
    student_es,
    tscore,
    totalScore,
    addSubject,
    studentResults,
    subjectTitle,
    handleResults,
    resultsHeaders,
    results

 }
  
}

export default student