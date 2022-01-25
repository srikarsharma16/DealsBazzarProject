import {combineReducers, createStore} from 'redux'
import ProductReducer from './Reducer/ProductReducer'
import ProductIdReducer from './Reducer/ProductIdReducer'
import UserReducer from './Reducer/UserReducer'
import CategoryReducer from './Reducer/CategoryReducer'
import BidOtherUsersReducer from './Reducer/BidOtherUsersReducer'
import BidUserReducer from './Reducer/BidUserReducer'
import OrderReducer from './Reducer/OrderReducer'
import UserOrderReducer from './Reducer/UserOrderReducer'
import Bid from './Reducer/Bid'
import Payment from './Reducer/Payment'

var store=createStore(combineReducers({
    products : ProductReducer,
    product : ProductIdReducer,
    categories : CategoryReducer,
    user : UserReducer,
    bidUserList : BidUserReducer,
    bidOtherUserslist : BidOtherUsersReducer,
    orderlist : OrderReducer,
    userorderlist : UserOrderReducer ,
    bid : Bid,
    payment : Payment,
}),{
    products:[],
    product:{},
    categories:[],
    user : { loginstatus : false, token : undefined , username : undefined, userdetails : undefined },
    bidUserList:[],
    bidOtherUserslist:[],
    orderlist : [],
    userorderlist : [],
    bid : {},
    payment : {paymenttype: undefined, pay: undefined}

})

export default store;