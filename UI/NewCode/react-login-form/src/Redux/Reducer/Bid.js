import * as actiontype from '../Action/Action'


export default function Bid(state = {}, action) {
    switch (action.type) {
        case actiontype.BID: return action.payload.bid
        case actiontype.LOGOUT: return action.payload.reset
        default:return state
    }
}