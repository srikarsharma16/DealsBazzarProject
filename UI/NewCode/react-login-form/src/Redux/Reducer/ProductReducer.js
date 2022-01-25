import * as actiontype from '../Action/Action'

export default function ProductReducer(state=[],action){
    switch(action.type){
        case actiontype.ADD_PRODUCTS:return [...state,action.payload.product]
        case actiontype.LOAD_PRODUCTS:return action.payload.products
        case actiontype.UPDATE_PRODUCTS:return state.map(prod=>{
           if(prod.productId==action.payload.pid){
                prod.productImages=action.payload.images
                prod.productStatus=action.payload.status
                return prod
            }
            else
            {
                return prod
            }
        })
        case actiontype.UPDATE_PRODUCT_QUANTITY:return state.map(prod=>{
            if(prod.productId==action.payload.pid){
                if(prod.productStatus==false){
                    prod.productStock=prod.productStock+action.payload.stock
                    prod.productStatus=true 
                }
                else if(action.payload.stock==0){
                    prod.productStock=prod.productStock+action.payload.stock
                    prod.productStatus=false
                }
                else
                {
                    prod.productStock=action.payload.stock
                }
                 return prod
             }
             else
             {
                 return prod
             }
         })
        case actiontype.LOGOUT: return action.payload.reset
        default: return state
    }
}