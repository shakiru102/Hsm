import { useContext } from "@nuxtjs/composition-api"
import { ref, computed } from "@vue/composition-api"

const roomTeacher = () => {
  
    const { $axios, store } = useContext()

    const tableTitle = [
        {text: "Name", value: "name"},
        {text: "Gender", value: "gender_gender"},
        {text: "Category", value: "staff_category"},
        {text: "Task", value: "staff_task"}
    ]

    const staffDetails = computed(() => {
       const staffs = store.state.staffs.map( staff => {
            return {
        name: `${ staff.referAs} ${ staff.last_name}`,
        school_id: staff.school_id,
        first_name: staff.first_name,
        last_name: staff.last_name,
        address: staff.address,
        staff_number: staff.staff_number,
        staff_category: staff.staff_category,
        staff_task: staff.staff_task,
        staff_certificate: staff.staff_certificate,
        gender: staff.gender,
        gender_gender: staff.gender[0],
        referAs: staff.referAs,
        dob: staff.dob,
        _id: staff._id
    }
            
        })
        return staffs
    })

    const dialog = ref(false)
    const loading = ref(false)
    const snackbar = ref(false)
    const rooms = ref(1)
    const lastname = ref('')
    const err_lastname = ref('')
    const firstname = ref('')
    const err_firstname = ref('')
    const address = ref('')
    const number = ref('')
    const certificate = ref('')
    const err_certificate = ref('')
    const category = ref('')
    const err_category = ref('')
    const task = ref('')
    const err_task = ref('')
    const gender = ref('')
    const dob = ref('')
    const err_gender = ref('')
    const referAs = computed(() => {
        if(gender.value === '') return ''
        if(gender.value === 'Male') return 'Mr'
        if(gender.value === 'Female') return 'Mrs'
    })
    
    const currentTitle = computed(() => {
        if(rooms.value == 1 || rooms.value == 2 ) return 'Required'
        return 'Optional'
    })
  
    const handleNext = () => {
        if( rooms.value == 1){
            if(lastname.value == '') return err_lastname.value = "Enter lastname"
            if(firstname.value == '') return err_firstname.value = "Enter firstname"
            if(gender.value == '') return err_gender.value = "Select gender"
            rooms.value++

        }else if (rooms.value == 2) {
            if(certificate.value == '') return err_certificate.value = "Enter staff certificate"
            if(certificate.value == '') return err_category.value = "Select staff category"
            if(task.value == '') return err_task.value = "Enter staff task"
            rooms.value++

        }else{
            rooms.value++
        }
    }
   
    const savestaff = async () => {
       loading.value = true
    const data = {
        school_id: store.state.hsm.id,
        first_name: firstname.value,
        last_name: lastname.value,
        address: address.value,
        staff_number: number.value,
        staff_category: category.value,
        staff_task: task.value,
        staff_certificate: certificate.value,
        gender: gender.value,
        referAs: referAs.value,
        dob: dob.value,
    }

        try {
             const staff = await $axios.post('/api/savestaff', data)
             store.commit('Staffs', staff.data)
             store.commit('setSnackBar', {
                content: 'Staff created successfully',
                color: 'success' 
                })
             lastname.value = ''
             firstname.value = ''
             certificate.value = ''
             category.value = ''
             task.value = ''
             address.value = ''
             number.value = ''
             dob.value = ''
             gender.value = ''
             snackbar.value = true
             loading.value = false
             rooms.value = 1
        } catch (error) {
            store.commit('setSnackBar', {
                content: 'Could not create staff',
                color: 'error' 
                })
                lastname.value = ''
                firstname.value = ''
                certificate.value = ''
                category.value = ''
                task.value = ''
                address.value = ''
                number.value = ''
                dob.value = ''
                gender.value = ''
            loading.value = false
            snackbar.value = true
            rooms.value = 1
        }
    }



    return {
        staffDetails,
        gender,
        err_gender,
        referAs,
        handleNext,
        savestaff,
        snackbar,
        loading,
        tableTitle,
        dialog,
        rooms,
        lastname,
        err_lastname,
        firstname,
        err_firstname,
        address,
        number,
        certificate,
        err_certificate,
        category,
        err_category,
        task,
        err_task,
        currentTitle
    }

}

export default roomTeacher