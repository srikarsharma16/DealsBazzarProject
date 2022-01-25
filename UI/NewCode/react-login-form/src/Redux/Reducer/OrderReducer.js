import * as actiontype from '../Action/Action'


export default function OrderReducer(state = [], action) {
    switch (action.type) {
        case actiontype.LOAD_ORDERS: return action.payload.orderlist
        case actiontype.LOGOUT: return action.payload.reset
        case actiontype.MARK_ORDER: return state.map(order=>{
            if(order.orderId==action.payload.orderId){
                 order.orderStatus="delivered"
                 return order
             }
             else
             {
                 return order
             }
         })
        default:return state
    }
}