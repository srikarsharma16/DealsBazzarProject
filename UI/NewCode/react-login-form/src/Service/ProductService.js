class ProductService {
    addProduct = (data) => {

        //console.log(data)
        return fetch("http://localhost:8080/product/addProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }
    getProducts = () => {
        return fetch("http://localhost:8080/product/getproducts")
    }
    uploadImage = (formData) => {
        return fetch("http://localhost:8080/product/addProductImage", {
            method: "POST",
            body: formData
        })   
    }
}
var obj = new ProductService()
export default obj;