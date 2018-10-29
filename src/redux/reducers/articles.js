const initialState = {
    articles: [],
    updates: [],
    article: {}
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_ARTICLES' :
        return {
            ...state,
            articles: action.articles
        }
        // case 'SEARCH_ARTICLES' :
        // return {
        //     ...state,
        //     articles: action.articles
        // }
        case 'LOAD_UPDATES' :
        console.log(state.updates)
        return {
            ...state,
            updates: action.updates
        }
        console.log(state)
        // case 'SEARCH_ARTICLES' :
        // return {
        //     ...state,
        //     articles: action.articles
        // }                
        case 'VIEW_ARTICLE':
        return {
            ...state,
            article: action.article
        }
        case 'CLAP_ARTICLE':
        let article = Object.assign({}, state.article)
        article.claps++
        console.log(article)
        return {
            ...state,
            article: article
        }
        default:
            return state
    }
}