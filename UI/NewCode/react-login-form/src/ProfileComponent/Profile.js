import React, { useState, useEffect } from 'react'
//import { Form, Button, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router-dom'
import "./Profile.css";
//import ProfileService from '../Service/ProfileService'
//import * as actions from '../Redux/Action/ProfileAction'
//import User from '../Redux/User'
import Navbar from '../components/Navbar'
import store from '../Redux/Store'
import Store from '../Redux/Store'
import UserService from '../Service/UserService'
import {ACTION_USER_UPDATE_TOKEN} from '../Redux/Action/UserAction'
import { ACTION_USER_LOGOUT} from '../Redux/Action/UserAction'
import {ACTION_LOAD_USER_DATA} from '../Redux/Action/UserAction'

var mapStateToProps = state => {
  return {
    user: state.user,
    token: state.user.token,
    userorderList: state.userorderlist,
    orderList: state.orderlist
  }
}

class Profile extends React.Component
{
       constructor() {
        super()
        //console.log(this.props.data)
         this.state={
          editStatus:false,
          name:'',
          phone:'',
          address:'',
          email:''
      }
      
      //user:{name:'',phone:'',address:'',email:''}
  } 

    /* componentDidUpdate() {
        this.name.value=this.state.user.name
        this.phone.value=this.state.user.phone
        this.address.value=this.state.user.address
        
    }
 */
    componentDidMount() {
        this.setState({name:this.props.user.userdetails.name,
          email:this.props.user.userdetails.email,
          phone:this.props.user.userdetails.phone,
          address:this.props.user.userdetails.address})
    }
    componentDidUnmount() {
      this.setState({editStatus:false})
    }

    

    updateProfile = (event) => {
        var ob = {
            userId:this.props.user.token,
            name:this.name.value,
            phone:this.phone.value,
            address:this.address.value,
            email:this.email.value
        }
        this.setState({editStatus:false})
        UserService.updateProfile(ob)
        .then(response => response.json())
        .then(data=> {
            console.log(data)
            if(data.statusCode==200){
                alert("User Updated Successfully");
              Store.dispatch({
                  ...ACTION_LOAD_USER_DATA,
                  payload:{userdetails:data.data}
              })
              
          }
        });
        event.preventDefault()
    }


      render()
      {
          if(this.props.user.loginstatus==false)
          {
              return<Navigate to="/"></Navigate>
          }
          return <>
          <Navbar />
  <div class="container mt-5">
    <div class="row">
        <div class="col-lg-4 pb-5">
        <div class="author-card pb-3">
          
           <div class="author-card-profile">
                    <div class="author-card-avatar"><img src="https://raw.githubusercontent.com/srikarsharma16/THBS/main/images.png"></img>
                    </div>
                    <div class="author-card-details">
                        <h5 class="author-card-name text-lg">{this.state.name}</h5><span class="author-card-position">{this.state.email}</span>
                    </div>
            </div>
          </div>
            <div class="wizard">
                <nav class="list-group list-group-flush">
                
                    <a class="list-group-item active"><Link class="list-group-item" to='/myprofile' className='nav-links'></Link><i class="fe-icon-user text-muted"></i>Profile Settings</a>
                    <a class="list-group-item" ><Link class="list-group-item" to='/orders' className='nav-links'><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {this.props.orderList.length}
                    <span class="visually-hidden">Orders placed</span>
                    </span>
                    </Link><i class="fe-icon-user text-muted"></i>Orders placed</a>
                    <a class="list-group-item" ><Link class="list-group-item" to='/myorders' className='nav-links'><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {this.props.userorderList.length}
                    <span class="visually-hidden">My orders</span>
                  </span>
                </Link><i class="fe-icon-user text-muted"></i>My Orders</a>
                <a class="list-group-item" ><Link class="list-group-item" to='/mybids' className='nav-links'>
                    </Link><i class="fe-icon-user text-muted"></i>My Bids</a>
                </nav>
            </div>
        </div>
      

    <div class="col-lg-8 pb-5">
    <h3 class="panel-title">Profile Settings</h3>
            <form class="row" onSubmit={this.updateProfile}>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account-fn">Name</label>
                        {this.state.editStatus!=false?
                        <input type="text" class="form-control"
                        onChange={(event)=>{
                                  this.setState({name:event.target.value})
                                  }}
                        value={this.state.name} ref={c => this.name = c}></input>
                        :<input type="text" class="form-control"
                                    value={this.state.name} ref={c => this.name = c}></input>}
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                    <label for="account-email">E-mail Address</label>
                    {this.state.editStatus!=false?
                    <input type="text" class="form-control"
                    onChange={(event)=>{
                      this.setState({email:event.target.value})
                    }}
                    value={this.state.email} ref={c => this.email = c} disabled="" ></input>
                    :<input type="text" class="form-control"
                    value={this.state.email} ref={c => this.email = c} disabled="" ></input>}
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account-phone">Phone Number</label>
                        {this.state.editStatus!=false?
                        <input type="text" class="form-control"
                        onChange={(event)=>{
                          this.setState({phone:event.target.value})
                        }}
                        value={this.state.phone} ref={c => this.phone = c}></input>
                        :<input type="text" class="form-control"
                        value={this.state.phone} ref={c => this.phone = c}></input>}
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label for="account-address">Address</label>
                        {this.state.editStatus!=false?
                        <input type="text" class="form-control"
                        onChange={(event)=>{
                          this.setState({address:event.target.value})
                        }}
                        value={this.state.address} ref={c => this.address = c}></input>
                        :<input type="text" class="form-control"
                        value={this.state.address} ref={c => this.address = c}></input>}
                    </div>
                </div>
              
                <div class="col-12">
                    <hr class="mt-2 mb-3"></hr>
                    <div class="d-flex flex-wrap justify-content-between align-items-center">
                    {this.state.editStatus!=false?
                    <div class="form-group">
                      <div class="col-sm-10 col-sm-offset-2">
                        
                        <button type="submit" class="btn btn-style-1 btn btn-primary" data-toast="" data-toast-position="topRight" data-toast-type="success" data-toast-icon="fe-icon-check-circle" data-toast-title="Success!" data-toast-message="Your profile updated successfuly.">UPDATE PROFILE</button>
                      </div>
                    </div>
                    :<h1></h1>}
                    </div>
                </div>
            </form>
            {this.state.editStatus==false?
            <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                      <button type="submit" class="btn btn-style-1 btn btn-primary" 
                      onClick={(event) =>(this.setState({editStatus:true}))} >EDIT PROFILE</button>
                    </div>
            </div>
            :<h1></h1>}
        </div>
        </div>
    </div>
          </>
    
}
}
export default connect(mapStateToProps)(Profile);