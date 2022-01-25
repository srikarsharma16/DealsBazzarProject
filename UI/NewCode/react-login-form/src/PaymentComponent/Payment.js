import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

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
            <h2>Payment Component</h2>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td rowSpan="3" colSpan="2"><img className="image" src={`data:image/jpeg;base64,${this.props.product.productImages[0]}`} alt="first image"/></td>
                        <td>some 1</td>
                        <td>some 2</td>
                    </tr>
                    <tr>
                        <td>Product Name:{this.props.product.productName}</td>
                        <td>Vendor Name:{this.props.product.vendorId}</td>
                        <td>Vendor Price:{this.props.product.vendorPrice}</td>
                    </tr>
                    <tr>
                        <td>Bid Stock:{this.props.bid.bidStock}</td>
                        <td>Bid:Price:{this.props.bid.bidPrice}</td>
                    </tr>
                </tbody>
            </table>
            <Link to="/pay"><button className="btn btn-success">Pay</button></Link>
        </div>
    }
}

export default connect(mapStateToProps)(Payment)