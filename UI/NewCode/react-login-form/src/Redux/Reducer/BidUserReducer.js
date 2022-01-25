import * as actiontype from '../Action/Action'

export default function BidUserReducer(state=[],action){
    switch(action.type){
        case actiontype.LOAD_LOGGED_USER_BIDS:return action.payload.bidlist
        case actiontype.ADD_LOGEED_USER_BIDS:return [...state,action.payload.bid]
        case actiontype.DELETE_USER_BID: return state.map((mapBid) => {
            //4 times
            if (mapBid.bidId != action.payload.bidId) {
                return mapBid
            }
        })
        case actiontype.LOGOUT: return action.payload.reset
        default:return state
    }
}