import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./main.css";
import Navbar from "../Navbar";

class SignUpForm extends Component {
  constructor(){
    super()
     this.state = {
        regmsg : '',
        loginmsg : ''
    }
}
register = (event)=>{
    var ob = {
       
        name : this.name.value,
        email:this.email.value,
        address : this.address.value,
        password: this.password.value,
        phone:this.phone.value*1,
        dob: this.dob.value,
        isActive:false
    }

    fetch(`http://localhost:8080/web/register`,{
      method : 'POST',
      headers:{
          "Content-Type" : "application/json"
      },
      body : JSON.stringify(ob)
  }).then(response=>response.json()).then(data=>{
    if(data.status){
      console.log(data)
      this.setState({regmsg:"Successfully Registered"})
    }
     else{
      this.setState({regmsg:"Already Exists"})
     }
  });;

    console.log(ob)
    event.preventDefault()
} 



  render() {
    return (
      <>
      <Navbar />
      <div className="App">
        <div className="appAside" />
        <div className="appForm">

          <div className="pageSwitcher">
            <Link
              to="/"
              activeClassName="pageSwitcherItem-active"
              className="pageSwitcherItem"
            >
              Sign In
            </Link>
            <Link
              exact
              to="/sign-up"
              activeClassName="pageSwitcherItem-active"
              className="pageSwitcherItem"
            >
              Sign Up
            </Link>
          </div>


          <div className="formCenter">
            <form onSubmit={this.register} className="formFields">
              <div className="formField">
                <label className="formFieldLabel" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  ref={c => this.name = c}
                  id="name"
                  className="formFieldInput"
                  placeholder="Enter your full name"
                  name="name" />
              </div>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="email">
                  E-Mail Address
                </label>
                <input
                  type="email"
                  ref={c => this.email = c}
                  id="email"
                  className="formFieldInput"
                  placeholder="Enter your email"
                  name="email" />
              </div>

              <div className="formField">
                <label className="formFieldLabel" htmlFor="number">
                  Phone Number
                </label>
                <input
                  type="number"
                  ref={c => this.phone = c}
                  id="number"
                  className="formFieldInput"
                  placeholder="Enter your phone number"
                  name="phone" />
              </div>

              <div className="formField">
                <label className="formFieldLabel" htmlFor="address">
                  Address
                </label>
                <input
                  type="address"
                  ref={c => this.address = c}
                  id="address"
                  className="formFieldInput"
                  placeholder="Enter your Address"
                  name="address" />
              </div>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="date">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  ref={c => this.dob = c}
                  id="date"
                  className="formFieldInput"
                  placeholder="Enter your date of birth"
                  name="date" />
              </div>

              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  ref={c => this.password = c}
                  id="password"
                  className="formFieldInput"
                  placeholder="Enter your password"
                  name="password" />
              </div>


              <div className="formField">
                <button type="submit" name="register" class="register" value="Register" className="formFieldButton">Sign Up</button>




              </div>


            </form>

           {/*  <Link to="/sign-in" className="formFieldLink"></Link> */}

            <b style={{ color: "red" }}>{this.state.regmsg}</b>
          </div>
        </div>
      </div></>
      
        
      
    );
  }
}
export default SignUpForm;
