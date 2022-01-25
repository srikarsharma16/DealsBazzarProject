import * as actiontype from './Action'

export const ACTION_LOAD_LOGGED_USER_BIDS={
    type:actiontype.LOAD_LOGGED_USER_BIDS,
    payload:{
        bidlist:undefined
    }
}
export const ACTION_ADD_LOGGED_USER_BIDS={
    type:actiontype.ADD_LOGEED_USER_BIDS,
    payload:{
        bid:undefined
    }
}
export const ACTION_BID={
    type:actiontype.BID,
    payload:{
        bid:undefined
    }
}
export const LOGOUT={
    type:actiontype.LOGOUT,
    payload:{
        reset:undefined
    }
}
export const ACTION_DELETE_USER_BID={
    type:actiontype.DELETE_USER_BID,
    payload:{
        bidId:undefined
    }
}