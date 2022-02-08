import React from 'react'
import './Product.css'
import { connect } from 'react-redux'
import Store from '../Redux/Store'
import * as actions from '../Redux/Action/ProductAction'
import ProductService from '../Service/ProductService'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import ViewProducts from '../ViewProducts/ViewProducts'
import Navbar from '../components/Navbar'
import ProductBids from '../BidOtherUsersComponent/OtherUsersBids'

var mapStateToProps = state => {
  return {
    token:state.user.token,
    products: state.products,
    categories: state.categories,
    bidOtherUserslist: state.bidOtherUserslist
  }
}

class Product extends React.Component {

  constructor(){
    super()
    this.state={
      displayStatus:false,
      productId:""
    }
  }

  componentDidMount(){
    console.log("bidother: ",this.props.bidOtherUserslist)
  }

  updateBidState=(prodId)=>{
    if(this.state.displayStatus==false){
      this.setState({displayStatus:true})
    }
    this.setState({productId:prodId})
  }

  addProduct = (event) => {
    var ob = {
      productName: this.productName.value,
      productDescription: this.productDescription.value,
      vendorPrice: this.vendorPrice.value,
      productStock: this.productStock.value,
      categoryId: this.productCategory.value,
      vendorId: this.props.token
    }

    ProductService.addProduct(ob)
      .then(response => response.json())
      .then(data => {
        if (data.statusCode == 200) {
          Store.dispatch({
            ...actions.ACTION_ADD_PRODUCTS, payload: {
              product: data.data
            }
          })
        }
      })

    event.preventDefault();
  }

  render() {
    return <>
    <Navbar />
    {this.props.token!=""?<>
      <form onSubmit={this.addProduct}>
        <div className="form-group">
          <label >Product Name</label>
          <input type="text" className="form-control" ref={c => this.productName = c} id="exampleInputEmail1" placeholder="Enter Product Name" required/>

        </div>
        <div className="form-group">
          <label >Product Description</label>
          <input type="text" className="form-control" ref={c => this.productDescription = c} id="exampleInputPassword1" placeholder="Enter Product Description" required/>
        </div>
        <div className="form-group">
          <label >Product Price</label>
          <input type="number" className="form-control" ref={c => this.vendorPrice = c} id="exampleInputPassword1" placeholder="Enter Product Price" required/>
        </div>
        <div className="form-group">
          <label >Product Quantity</label>
          <input type="number" className="form-control" ref={c => this.productStock = c} min="1" id="exampleInputPassword1" placeholder="Enter Product Quantity" required/>
        </div>
        <div className="form-group">
          <label >Product Category</label>
          <select className="producttypedropdown" name="cars" id="cars" ref={c=>this.productCategory=c} required>
            {this.props.categories.map((cat) => {
            return  <option className="producttypedropdown" value={cat.categoryId}>{cat.productCategory}</option>
          })}
          </select>
          
        </div>
        &nbsp;&nbsp;&nbsp;<button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <table className="table table-dark table-striped" >
        <thead>
          <tr>
            <th scope="col">SL.NO</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Description</th>
            <th scope="col">Product Price</th>
            <th scope="col">Measurement Type</th>
            <th scope="col">Product Quantity</th>
            <th scope="col">Images</th>
            <th scope="col">Status</th>
            <th scope="col">View Bids</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.filter(p => p.vendorId==this.props.token).map((product, index) => {
            return <tr key={index}>

              <th scope="row">{index + 1}</th>

              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>{product.vendorPrice}</td>
              {this.props.categories.map((category)=>{return category.categoryId==product.categoryId?
                <td>{category.productMeasurement}</td>
                :
                ""
              })}
              <td>{product.productStock}</td>

              <td><ViewProducts key={index} data={{ image: product.productImages, id: product.productId }} /></td>
              <td>{product.productStatus ? <>
                <button className="btn btn-success">Active</button>
              </> : <>
                <button className="btn btn-warning">De-Active</button>
              </>}
              </td>
              <td><button className="btn btn-secondary" onClick={()=>{this.updateBidState(product.productId)}}>view Bids</button></td>
            </tr>


          })}
        </tbody>
      </table>
      
      {this.state.displayStatus!=false?<ProductBids data={{bidOtherUserslist:this.props.bidOtherUserslist,productId:this.state.productId}}/>:""}
    </>
    
    :<h1>Please Login</h1>}
    </>
  }

}

export default connect(mapStateToProps)(Product);