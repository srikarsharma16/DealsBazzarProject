import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import * as bidUserAction from '../Redux/Action/BidUserAction'
import * as orderUseraction from '../Redux/Action/OrderAction'
import * as productAction from '../Redux/Action/ProductAction'
import paymentService from '../Service/PaymentService'
import Store from '../Redux/Store'
import './Pay.css'

var mapStateToProps = state => {
    return {
        product: state.product,
        bid: state.bid,
        payment: state.payment.paymenttype
    }
}

class Pay extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false
        }
    }
    pay = (event) => {
        
        var formData=new FormData();
        formData.append('paymentTypeId',this.paymentType.value)
        formData.append('bidderPrice',this.props.bid.bidPrice)
        formData.append('bidId',this.props.bid.bidId)
        var bidId="";
        if (window.confirm("confirming payment") == true) {
            //payment transation start
            paymentService.addPayment(formData)
                .then(response => response.json())
                .then(data => {
                    bidId=data.data.bidId
                    console.log("paymenttype: ", data)
                    if (data.statusCode == 200) {
                        Store.dispatch({
                            ...bidUserAction.ACTION_DELETE_USER_BID, payload: {
                                bidId: bidId
                            }
                        })
                        Store.dispatch({
                            ...orderUseraction.ACTION_ADD_ORDER, payload: {
                                order: data.data
                            }
                        })
                        var pid=data.data.productId
                        var stock=data.data.stock
                        Store.dispatch({
                            ...productAction.ACTION_UPDATE_PRODUCT_QUANTITY, payload: {
                                pid: pid,
                                stock:stock
                            }
                        })
                    }
                })
            //payment transation end
            this.setState({ redirect: true })
        } else {

        }
        event.preventDefault();
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/dashboard"></Navigate>
        }
        return <div>
            &ensp;&ensp;&ensp;&ensp;
            <form onSubmit={this.pay}>
                <div className="form-group">
                    <label >Payment Type</label>
                    <select className="paymenttypedropdown" ref={c => this.paymentType = c}>
                        {this.props.payment.map((paymenttp) => {
                            return <option className="paymenttypedropdown" value={paymenttp.paymentTypeId}>{paymenttp.paymentType}</option>
                        })}
                    </select>&ensp;&ensp;&ensp;
                    <div className="form-group">&ensp;
                        <label >Amount to Pay</label>
                        <input type="text" className="form-control" value={this.props.bid.bidPrice} readOnly />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Send Amount</button>
            </form>
        </div>
    }
}

export default connect(mapStateToProps)(Pay)