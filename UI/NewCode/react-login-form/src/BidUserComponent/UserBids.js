import React from 'react'
import { connect } from 'react-redux'
import Store from '../Redux/Store'
import * as actions from '../Redux/Action/ProductAction'
import ProductService from '../Service/ProductService'
import * as productaction from '../Redux/Action/ProductIdAction'
import * as bidaction from '../Redux/Action/BidUserAction'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

var mapStateToProps = state => {
    return {
        bidUserList: state.bidUserList,
        products: state.products,
        categories: state.categories
    }
}



class UserBids extends React.Component {

    setBidAndProduct=(bid,product)=>{
        Store.dispatch({
            ...productaction.ACTION_SET_PRODUCT_ID, payload: {
              product: product
            }
          })
          Store.dispatch({
            ...bidaction.ACTION_BID, payload: {
              bid:bid
            }
          })
    }


    render() {
        return <>
            <Navbar />
            <table className="table table-success table-striped" >
                <thead>
                    <tr>
                        <th scope="col">Sl.No</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Description</th>
                        <th scope="col">Measurement</th>
                        <th scope="col">Product Quantity</th>
                        <th scope="col">Images</th>
                        <th scope="col">Vendor Price</th>
                        <th scope="col">Bidded Price</th>
                        <th scope="col">Bidded Stock</th>
                        <th scope="col">Bidded Date</th>
                        <th scope="col">Bid Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.bidUserList.map((bid, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            {this.props.products.map((product) => {
                                if (bid.productId == product.productId) {
                                    
                                    return <>
                                        <td ref={this.product=product}>{product.productName}</td>
                                        <td>{product.productDescription}</td>
                                        {this.props.categories.map((category) => { return category.categoryId == product.categoryId ?
                                        <td>{category.productMeasurement}</td>
                                        : "" })}
                                        <td>{product.productStock}</td>

                                        <td>images</td>
                                        <td>{product.vendorPrice}</td>
                                    </>
                                }
                            })}
                            <td>{bid.bidPrice}</td>
                            <td>{bid.bidStock}</td>
                            <td>{bid.bidDate}</td>
                            <td>
                                {bid.bidStatus==1?<>
                                <h6>Congrats!!! Your bid has been accepted you can now proceed for payment</h6>
                                <hr/><hr/>
                                <Link to="/payment"><button className="btn btn-success" onClick={(event)=>{this.setBidAndProduct(bid,this.product)}}>Proceed to pay</button></Link>
                                </>
                                :
                                (bid.bidStatus==0?<button className="btn btn-secondary">Not Accepted</button>
                                :
                                <button className="btn btn-info">Pending</button>)
                                }
                            </td>
                        </tr>


                    })}
                </tbody>
            </table>

        </>

    }

}

export default connect(mapStateToProps)(UserBids);