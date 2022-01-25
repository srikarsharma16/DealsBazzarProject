import * as actionType from './Action'

export const ACTION_USER_LOGIN = {
    type : actionType.USER_LOGIN,
    payload : {   
        token : undefined,   
        username : undefined
    }
}
export const ACTION_USER_LOGOUT = {
    type : actionType.USER_LOGOUT
}
export const ACTION_USER_UPDATE_TOKEN = {
    type : actionType.USER_UPDATE_TOKEN,
    payload : {        
        token : undefined
    }
}

export const ACTION_LOAD_USER_DATA = {
    type : actionType.LOAD_USERDATA,
    payload : {
        userdetails : undefined
    }
}

export const LOGOUT={
    type:actionType.LOGOUT,
    payload:{
        reset:undefined
    }
}