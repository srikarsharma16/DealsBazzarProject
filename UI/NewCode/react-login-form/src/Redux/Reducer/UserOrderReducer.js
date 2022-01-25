import * as actiontype from '../Action/Action'


export default function UserOrderReducer(state = [], action) {
    switch (action.type) {
        case actiontype.LOAD_USER_ORDERS: return action.payload.userorderlist
        case actiontype.ADD_ORDER: return [...state, action.payload.order]
        case actiontype.CANCEL_ORDER: return state.map(order=>{
            if(order.orderId==action.payload.orderId){
                 order.orderStatus="cancelled"
                 return order
             }
             else
             {
                 return order
             }
         })
        case actiontype.LOGOUT: return action.payload.reset
        default: return state
    }
}