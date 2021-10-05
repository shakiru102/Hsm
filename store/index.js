export const state = () => ({
    theme: true,
    signOption: false,
    hsm: null,
    snackBarProps: {
       content: '',
       color: '',
    },
    currentTerm: null

})

export const mutations = {
    setTheme(state) {
         state.theme = !state.theme 
    },
    ChangeOption(state) {
        state.signOption = !state.signOption
    },
    setHsm(state, payload) {
       state.hsm = payload
       console.log(state.hsm.curren_term)
    },
    setSnackBar(state, payload) {
        if(payload)  state.snackBarProps = payload
    },
   
}