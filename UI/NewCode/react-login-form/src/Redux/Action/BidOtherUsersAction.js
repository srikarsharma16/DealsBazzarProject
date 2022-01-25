import * as actiontype from './Action'

export const ACTION_LOAD_USER_PRODUCTS_BIDS={
    type:actiontype.LOAD_USER_PRODUCTS_BIDS,
    payload:{
        bidlist:undefined
    }
}

export const ACTION_UPDATE_PRODUCT_BID={
    type:actiontype.UPDATE_PRODUCT_BIDS,
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