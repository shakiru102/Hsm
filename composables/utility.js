import { useContext, useRouter } from "@nuxtjs/composition-api";
import { ref } from "@vue/composition-api";

const utils = () => {

//data
   
    const nav = ref(true)
    const hiddenNav = ref(false)
    const toggle = ref(false)
    const { store, $axios } = useContext()
    const router = useRouter()
    const date = ref((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
    const menu =  ref([
        {name:'Dashboard', link:'/Dashboard', icon: 'mdi-view-dashboard-outline'},
        {name:'Students', link:'/Category', icon: 'mdi-school-outline'},
        {name:'Staffs', link:'/Staffs', icon: 'mdi-account-cog-outline'},
        {name:'Search', link:'/Search', icon: 'mdi-magnify'}

    ])

//functions
    const changeTheme = () => store.commit('setTheme')
    const logOption = ref(false)
    const handleSignout = async () => {
        const res = await $axios.get('/api/signout')
        if(res) router.push('/HSM')
    }


    return {
        handleSignout,
        nav,
        hiddenNav,
        changeTheme,
        date,
        menu,
        logOption,
        toggle,
    }

}

export default utils;