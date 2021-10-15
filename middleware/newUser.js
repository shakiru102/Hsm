export default async function ({ store, redirect }) {
       if(store.state.hsm.current_term !== '') return redirect('/Dashboard')
        return
}