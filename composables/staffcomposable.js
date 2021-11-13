import { ref, computed } from "@vue/composition-api"

const roomTeacher = () => {
  

    const tableTitle = [
        {text: "Name", value: "name"},
        {text: "Gender", value: "gender_gender"},
        {text: "Category", value: "staff_category"},
        {text: "Task", value: "staff_task"}
    ]
    const dialog = ref(false)
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
    
    const currentTitle = computed(() => {
        if(rooms.value == 1 || rooms.value == 2 ) return 'Required'
        return 'Optional'
    })

    return {
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