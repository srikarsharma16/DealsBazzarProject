import * as actiontype from '../Action/Action'

export default function CategoryReducer(state=[],action){
    switch(action.type){
        case actiontype.LOAD_CATEGORIES:return action.payload.categories
        case actiontype.LOGOUT: return action.payload.reset
        default:return state
    }
}