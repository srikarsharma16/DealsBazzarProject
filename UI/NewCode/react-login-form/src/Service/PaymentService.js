class PaymentService{

    getPaymentTypes = () => {
            return fetch("http://localhost:8080/dealbazzar/fetchPaymentType")
        }


    addPayment=(payment)=>{
        //console.log("payment: ",payment)
        return fetch(`http://localhost:8080/dealbazzar/payment`,{
            method: "POST",
            body: payment
        })
    }
    
}

var obj = new PaymentService()
export default obj;