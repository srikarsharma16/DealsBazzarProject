import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Payment.css'

var mapStateToProps = state => {
    return {
      product:state.product,
      bid:state.bid
    }
  }
  

class Payment extends Component {

   
    componentDidMount(){

        console.log("bid:",this.props.bid,"product: ",this.props.product )
    }
    render() {
        
        return <div>
            <Navbar />
            &ensp;
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td rowSpan="3" colSpan="2"><img className="image" src={`data:image/jpeg;base64,${this.props.product.productImages[0]}`} alt="first image"/></td>
                        
                    </tr>
                    <tr>
                        <td>Product Name: {this.props.product.productName}</td>
                        <td>Vendor Name: {this.props.product.vendorId}</td>
                        <td>Vendor Price: {this.props.product.vendorPrice}</td>
                    </tr>
                    <tr>
                        <td>Bid Stock: {this.props.bid.bidStock}</td>
                        <td colSpan="2">Bid:Price: {this.props.bid.bidPrice}</td>
                    </tr>
                </tbody>
            </table>&ensp;
            <div className="paybutton">
            <Link to="/pay"><button className="btn btn-success paymentbutton">Pay</button></Link>
            </div>
        </div>
    }
}

export default connect(mapStateToProps)(Payment)