const { ref } = require("@vue/composition-api")
const { useContext, useRouter } = require('@nuxtjs/composition-api')
const api = (changeBar) => {
   
    const passRule = ref( [
        v => !!v || 'Password is required',
        v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
    ])
    const emailRule = ref([
        v => !!v || 'enter email',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
     ])
     const nameRule = ref([
        v => !!v || 'enter name',
        v => /^[a-zA-Z]*$/.test(v) || ' enter a valid name'
    ])
    const numRule = ref([
        v => !!v || 'enter name',
        v => /^\(?([0-9]{3})\)?[-.●\s]?([0-9]{3})[-.●\s]?([0-9]{4})/gm.test(v) || ' enter a valid phonenumber'
    
    ])
    
    const school_name = ref('')
    const school_phonenum = ref('')
    const school_password = ref('')
    const loginschool_password = ref('')
    const school_email = ref('')
    const loginschool_email = ref('')
    const school_address = ref('')
    const { $axios, store } = useContext()
    const loading = ref(false)
    const router =  useRouter()
    const errsnackBar = ref(false)
    const payment_token = ref('')
    const payment_verified = ref(false)
    const current_term = ref('')
    const forgot_email = ref('')
  
    //functions

//signup
    const signup = async () => {
        loading.value = true
        try {
             await $axios.post('/api/userauth/signup', {
                school_name: school_name.value,
                school_phonenum: school_phonenum.value,
                school_password: school_password.value,
                school_email: school_email.value,
                school_address: school_address.value,
                payment_token:  payment_token.value,
                payment_verified:  payment_verified.value,
                current_term:  current_term.value,
                forgot_email:  forgot_email.value
            }) 
            loading.value = false 
            router.push('/')
            
        } catch (error) {
            loading.value = false
          await  store.commit('setSnackBar', {
                content: error.response.data.error,
                color: 'error' 
            })
            changeBar()
            
        }
   
    }

    //login
    const login  = async () => {
        loading.value = true
        try {
             await $axios.post('/api/userauth/login', {
                school_password: loginschool_password.value,
                school_email: loginschool_email.value,
            }) 
            loading.value = false 
            router.push('/')
            
        } catch (error) {
            loading.value = false
          await  store.commit('setSnackBar', {
                content: error.response.data.error,
                color: 'error' 
            })
            changeBar()
            // console.log(error.response.data)
        }
   
    }
    
    return {
    school_email,
    loginschool_email,
    school_name,
    school_password,
    loginschool_password,
    school_phonenum,
    signup,
    numRule,
    emailRule,
    passRule,
    nameRule,
    loading,
    login,
    errsnackBar
    }
}


export default api