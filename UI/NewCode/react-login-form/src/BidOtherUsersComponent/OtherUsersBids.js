import React from 'react'
import { connect } from 'react-redux'
import Store from '../Redux/Store'
import * as bidaction from '../Redux/Action/BidOtherUsersAction'
import BidService from '../Service/BidService'

var mapStateToProps = state => {
    return {
        token: state.user.token
    }
}

class OtherUsersBids extends React.Component {
    constructor(props) {
        super(props)   
    }

    componentDidMount() {
        console.log("bidlist: ", this.props.data.bidOtherUserslist)
        console.log("productId: ", this.props.data.productId)
    }
    componentDidUpdate() {
        console.log("bidlist after update: ", this.props.data.bidOtherUserslist)
    }
    updateBidStatus = (bid, status) => {
        var arr = []
        arr=this.props.data.bidOtherUserslist.filter(bids => ((bids.productId == this.props.data.productId) && (bids.bidStatus==-1)))
        arr.map((p)=>p.bidId == bid.bidId?p.bidStatus = 2:p)

        BidService.updateBid(arr)
        .then(response=>response.json())
        .then(data=>{
          if(data.statusCode==200){
            console.log("data recieved  : ",data.data)
            Store.dispatch({
              ...bidaction.ACTION_UPDATE_PRODUCT_BID, payload: {
                bid: data.data
              }
            })
          }else{
            alert("bid status could ne updated, please try again after some time")
          }
        })

    }

    render() {
        return <>
        
            <table className="table table-success table-striped" >
                <thead>
                    <tr>
                        <th scope="col">SL NO</th>
                        <th scope="col">Bidder Name</th>
                        <th scope="col">Bidder Price</th>
                        <th scope="col">Bidder Stock</th>
                        <th scope="col">Bidder Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.bidOtherUserslist.filter(bids => bids.productId == this.props.data.productId).map((bid, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{bid.userId}</td>
                            <td>{bid.bidPrice}</td>
                            <td>{bid.bidStock}</td>
                            <td>
                                {bid.bidStatus == 1 ?
                                    <>
                                        <button className="btn btn-success">Accepted</button>
                                    </>
                                    :
                                    (bid.bidStatus == 0 ?
                                        <button className="btn btn-info">Not Accepted</button>
                                        :
                                        <button className="btn btn-secondary" onClick={() => { this.updateBidStatus(bid, 2) }} >Accept</button>)
                                }
                            </td>
                        </tr>


                    })}
                </tbody>
            </table>

        </>

    }

}

export default connect(mapStateToProps)(OtherUsersBids);