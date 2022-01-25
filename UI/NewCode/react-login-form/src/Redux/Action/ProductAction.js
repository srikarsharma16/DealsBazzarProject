import * as actiontype from './Action'

export const ACTION_ADD_PRODUCTS={
    type:actiontype.ADD_PRODUCTS,
    payload:{
        product:undefined
    }
}

export const ACTION_LOAD_PRODUCTS={
    type:actiontype.LOAD_PRODUCTS,
    payload:{
        products:undefined
    }
}
export const ACTION_UPDATE_PRODUCT={
    type:actiontype.UPDATE_PRODUCTS,
    payload:{
        pid:undefined,
        status:undefined,
        images:undefined
    }
}
export const ACTION_UPDATE_PRODUCT_QUANTITY={
    type:actiontype.UPDATE_PRODUCT_QUANTITY,
    payload:{
        pid:undefined,
        stock:undefined
    }
}
export const LOGOUT={
    type:actiontype.LOGOUT,
    payload:{
        reset:undefined
    }
}