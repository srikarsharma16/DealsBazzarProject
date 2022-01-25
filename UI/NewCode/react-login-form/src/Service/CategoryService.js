class CategoryService{

    getCategories = () => {
            return fetch("http://localhost:8080/dealbazzar/fetchCategory")
        }
    }
    
var obj = new CategoryService()
export default obj;