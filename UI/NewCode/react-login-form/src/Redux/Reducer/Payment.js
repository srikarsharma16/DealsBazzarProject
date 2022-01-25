import * as actiontype from '../Action/Action'


export default function Payment(state = {}, action) {
    switch (action.type) {
        case actiontype.LOAD_PAYMENTTYPE: return {...state,paymenttype: action.payload.paymenttype}
        case actiontype.PAY: return action.payload.pay
        case actiontype.LOGOUT: return action.payload.reset
        default:return state
    }
}