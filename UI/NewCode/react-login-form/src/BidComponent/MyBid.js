import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from "react-router-dom"
import './MyBid.css'
import BidService from '../Service/BidService'
import * as actions from '../Redux/Action/BidUserAction'
import Store from '../Redux/Store'
import ViewBidImage from '../viewBidImage/viewBidImage'
import Navbar from '../components/Navbar'

var mapStateToProps = state => {
  return {
    product : state.product,
    token : state.user.token,
    bidUserList : state.bidUserList,
    categories: state.categories
  }
}

class MyBid extends React.Component {

  constructor(){
    super()
    this.state={
      bidStatus : true,
      redirect : false,
      image: 0
    }
  }

  componentDidMount(){
      this.props.bidUserList.map(p=>p.productId==this.props.product.productId?(p.bidStatus==-1)?this.setState({bidStatus:false}):"":"")
  }

  Bid = (event) => {
    var ob = {
      productId : this.props.product.productId,
      bidPrice : this.bidderPrice.value,
      bidStock : this.bidderStock.value,
      userId : this.props.token
    }
    if (!(ob.bidPrice.length == 0 || ob.bidStock.length == 0)) {
        BidService.addBidService(ob)
        .then(response=>response.json())
        .then(data=>{
          if(data.statusCode==200){
            alert("bid placed is successfully")
            this.setState({redirect:true})
            Store.dispatch({
              ...actions.ACTION_ADD_LOGGED_USER_BIDS, payload: {
                bid: data.data
              }
            })
          }else{
            alert("bid not placed")
          }
        })
    }
    else {
      alert("please provide the price and stock for the product")
      console.log("no operations performed")
    }
    event.preventDefault();
  }



  render() {
    if (this.state.redirect) {
      return <Navigate to="/dashboard"></Navigate>
    }
    return <>
    <Navbar />

  

      {this.state.bidStatus != false ? <>
        <table className="table">
          <tr>
        <td><ViewBidImage  data={{ image: this.props.product.productImages[this.state.image] }} />  </td>
        <td>
        <div className="container">
          <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
            <div className="row">
              {this.props.product.productImages.map((image, index) => {
                return <div className="col">
                  <div className="image-border p-3 border bg-light">

                    <img onClick={() => { this.setState({ image: index }) }} className="w-100 h-100" src={`data:image/jpeg;base64,${image}`} />

                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
        </td>
        </tr>
        </table>

      <div className="list-group list-group-flush">
        <h6 className="font-weight-bold">{this.props.product.productName}</h6>
        <h6 ><strong>Description : </strong> {this.props.product.productDescription}</h6>
        <h6 ><strong>Price : &#8377; </strong> {this.props.product.vendorPrice}</h6>
        <h6 ><strong>Measurement : </strong> {this.props.categories.map((category) => { return category.categoryId == this.props.product.categoryId ? <p>{category.productMeasurement}</p> : "" })}</h6>
        <h6 ><strong>Stocks Available : </strong> {this.props.product.productStock}</h6>
      </div>

      <hr /><hr />

      <form onSubmit={this.Bid}>
        <div className="input-group mb-3">
          <div className="form-group">
            <label >Set Price</label>
            <input type="number" className="form-control" ref={c => this.bidderPrice = c} id="exampleInputPassword1" min={this.props.product.vendorPrice+(this.props.product.vendorPrice*(2/100))} placeholder="price" />
          </div>
          &ensp;
          <div className="form-group">
            <label >Number of Stocks</label>
            <input type="number" className="form-control" ref={c => this.bidderStock = c} min="10" id="exampleInputPassword1" max={this.props.product.productStock} placeholder="stock" />
          </div>
          &ensp;
          <button type="submit" className="btn btn-primary">Bid</button>
        </div>
      </form>
      </>
      :<h1>You have placed bid for the product already. Please check in your bid list.</h1>}
    </>
  }
}
export default connect(mapStateToProps)(MyBid);