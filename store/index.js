export const state = () => ({
    theme: true,
    signOption: false,
    hsm: null,
    snackBarvisibility: false,
    snackBarProps: {
       content: '',
       color: '',
    }
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
    },
    setSnackBar(state, payload) {
        if(payload)  state.snackBarProps = payload
    },
    // setSnackActive(state){
    //     state.snackBarvisibility = !state.snackBarVisibility
    // }
}