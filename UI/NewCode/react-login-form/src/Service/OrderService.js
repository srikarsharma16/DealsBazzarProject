class OrderService{

    fetchUserOrders=()=>{
        return fetch("http://localhost:8080/order/getUserOrders")
    }
    
    fetchOrders=()=>{
        return fetch("http://localhost:8080/order/getorders")
        
    }
    
    cancelOrder=(order)=>{
        return fetch("http://localhost:8080/order/cancelorder", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            })
    }
    markdelivered=(order)=>{
        return fetch("http://localhost:8080/order/markdelivered", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            })
    }
    
    }
    
    var obj = new OrderService()
    export default obj;