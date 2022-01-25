import React from 'react'
import './ViewProducts.css'
import Store from '../Redux/Store'
import ProductService from '../Service/ProductService'
import * as actions from '../Redux/Action/ProductAction'

class ViewProducts extends React.Component {

    constructor(props) {
        super(props)
    }

    uploadImage = (event) => {
        var formData=new FormData();
        var pid=""
        var status=false
        var images=[]
        formData.append('productId',this.productId.value)
        formData.append('imageFile',this.filebox1.files[0])

        ProductService.uploadImage(formData)
        .then(response => response.json())
      .then(data => {
          pid=data.data.productId
          status=data.data.productStatus
          images=data.data.productImages
        if (data.statusCode == 200) {
          Store.dispatch({
              ...actions.ACTION_UPDATE_PRODUCT,payload:{
                  pid,status,images
              }
          })
        }
      })
        
        event.preventDefault();
    }
    render() {
        return <>
        {this.props.data.image != null ?
                <>
                {this.props.data.image.map((image)=>{
                   return <img className="image" src={`data:image/jpeg;base64,${image}`} alt="first image"/>
                })}
                    
                    <h6>No of Images: {this.props.data.image.length}</h6>
                    {this.props.data.image.length>=6?"":
                    <form onSubmit={this.uploadImage}>
                        <div className="form-group">
                        <input type="hidden" className="form-control" ref={c => this.productId = c} value={this.props.data.id} aria-describedby="emailHelp" readOnly />
                            <input type="file" className="form-control" ref={c => this.filebox1 = c} aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Image</button>
                    </form>
                    }
                    
                </>
                : <>
                    <form onSubmit={this.uploadImage}>
                        <div className="form-group">
                        <input type="hidden" className="form-control" ref={c => this.productId = c} value={this.props.data.id} aria-describedby="emailHelp" readOnly/>
                            <input type="file" className="form-control" ref={c => this.filebox1 = c} aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Image</button>
                    </form>
                </>}
        </>
    }
}

export default ViewProducts;