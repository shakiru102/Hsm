export const state = () => ({
    theme: true,
    signOption: false,
    hsm: null,
    snackBarProps: {
       content: '',
       color: '',
    },
    currentTerm: null,
    events: [],
    allLevelDetails: []

})

export const getters = {
    event(state) {
        const date = []
        state.events.forEach(item => date.push(item.event_date))
        return date
    },
    eventColor(state) {
        const color = []
        state.events.forEach(item => color.push(item.event_color))
        return color
    },
}

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
    setEvent(state, payload) {
        state.events = [ ...payload ]
     },
    setSnackBar(state, payload) {
        if(payload)  state.snackBarProps = payload
    },
    setCurrentTerm(state, payload) {
        state.currentTerm = payload
    },
    setAllLevelDetails(state, payload) {
        state.allLevelDetails = [ ...payload ]
        console.log(state.allLevelDetails)
     },
   
}