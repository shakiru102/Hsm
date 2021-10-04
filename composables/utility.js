import { useContext } from "@nuxtjs/composition-api";
import { ref } from "@vue/composition-api";

const utils = () => {

//data
   
    const nav = ref(true)
    const hiddenNav = ref(false)
    const { store } = useContext()
    const date = ref((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
    const menu =  ref([
        {name:'Dashboard', link:'Dashboard', icon: 'mdi-view-dashboard-outline'},
        {name:'Students', link:'Category', icon: 'mdi-school-outline'},
        {name:'Documents', link:'Documents', icon: 'mdi-book-outline'},
        {name:'Settings', link:'Settings', icon: 'mdi-account-cog-outline'}
    ])

//functions
    const changeTheme = () => store.commit('setTheme')
    const logOption = ref(false)


    return {
        nav,
        hiddenNav,
        changeTheme,
        date,
        menu,
        logOption,
    }

}

export default utils;