import { ref } from "@vue/composition-api"

const roomTeacher = () => {
  

    const tableTitle = [
        {text: "Name", value: "name"},
        {text: "Gender", value: "gender_gender"},
        {text: "Room", value: "room"},
    ]
    const dialog = ref(false)
    const rooms = ref(1)

    return {
        tableTitle,
        dialog,
        rooms
    }

}

export default roomTeacher