import * as actionType from './Action'

export const ACTION_LOAD_PAYMENTTYPE = {
    type : actionType.LOAD_PAYMENTTYPE,
    payload : {
        paymenttype : undefined
    }
}

export const PAY={
    type : actionType.PAY,
    payload : {
        pay : undefined
    }
}
export const LOGOUT={
    type:actionType.LOGOUT,
    payload:{
        reset:undefined
    }
}