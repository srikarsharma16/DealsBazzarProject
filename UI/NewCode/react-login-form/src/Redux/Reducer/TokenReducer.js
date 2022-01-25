import * as actiontype from '../Action/Action'

export default function TokenReducer(state="",action){
    switch (action.type){
        case actiontype.STORE_TOKEN: return action.payload.token
        default:return state
        
        
      /*   case actiontype.USER_LOGOUT: return {
            ...state, loginstatus:false,
            token : undefined,
            userid: undefined
        } */

        case actiontype.USER_LOGOUT: return {
            ...state, loginstatus:false,
            token : undefined,
            username : undefined
        }
        case actiontype.LOGOUT: return action.payload.reset
    }
}