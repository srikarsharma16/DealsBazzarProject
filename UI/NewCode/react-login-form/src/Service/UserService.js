class UserService{
    updateProfile = (data) => {

        //console.log(data)
        return fetch("http://localhost:8080/web/updateProfile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }
    /* getProfile = (userId) => {
        return fetch(`http://localhost:8080/admin/getUserById/${userId}`)
    } */
    getUser = (token) => {
        //console.log("first",token)
        return fetch(`http://localhost:8080/web/getUserById/${token}`)
    }
}

var obj = new UserService()
export default obj;