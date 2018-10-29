const initialState = {
    updates: [],
    update: {}
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_UPDATES' :
        return {
            ...state,
            updates: action.updates
        }     
        // case 'VIEW_ARTICLE':
        // return {
        //     ...state,
        //     article: action.article
        // }
        default:
            return state
    }
}