import * as actiontype from '../Action/Action'


export default function BidOtherUsersReducer(state = [], action) {
    switch (action.type) {
        case actiontype.LOAD_USER_PRODUCTS_BIDS: return action.payload.bidlist
        case actiontype.UPDATE_PRODUCT_BIDS: return state.map((mapBid) => {
            //4 times
            if (mapBid.bidId == action.payload.bid.bidId) {
                mapBid.bidStatus = action.payload.bid.bidStatus
                return mapBid
            }
            else if (mapBid.productId == action.payload.bid.productId) {
                if (mapBid.productStatus == -1) {
                    mapBid.bidStatus = 0
                    return mapBid
                }
                else {
                    return mapBid
                }

            } else {
                return mapBid
            }
        })
        case actiontype.LOGOUT: return action.payload.reset
        default: return state
    }
}