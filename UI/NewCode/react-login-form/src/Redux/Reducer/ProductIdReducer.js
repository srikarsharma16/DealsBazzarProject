import * as actiontype from '../Action/Action'

export default function ProductReducer(state={},action){
    switch(action.type){
        case actiontype.SET_PRODUCT_ID:return action.payload.product
        case actiontype.LOGOUT: return action.payload.reset
        default: return state
    }
}