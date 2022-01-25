class BidService{
    
    addBidService=(data)=>{
        //console.log("service: ",data)
        return fetch("http://localhost:8080/bid/addBid", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    updateBid=(data)=>{
        //console.log("update data:",data)
        return fetch("http://localhost:8080/bid/updateBid", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        
    }

    fetchUserBid=()=>{
        return fetch("http://localhost:8080/bid/getUserBids")
    }

    fetchOtherUsersBids=()=>{
        return fetch("http://localhost:8080/bid/getOtherUsersBids")
    }

}

var obj = new BidService()
export default obj;