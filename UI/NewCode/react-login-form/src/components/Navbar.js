import React from 'react';
import { Button } from './Button';
import { Link, Navigate } from 'react-router-dom';
import './Navbar.css';
import {connect} from 'react-redux'
import store from '../Redux/Store';
import { ACTION_USER_LOGOUT } from ".././Redux/Action/UserAction";
import * as logout from '.././Redux/Action/BidOtherUsersAction'
import * as logout1 from '.././Redux/Action/BidUserAction'
import * as logout2 from '.././Redux/Action/CategoryAction'
import * as logout3 from '.././Redux/Action/OrderAction'
import * as logout4 from '.././Redux/Action/PaymentType'
import * as logout5 from '.././Redux/Action/ProductAction'
import * as logout6 from '.././Redux/Action/ProductIdAction'
import * as logout7 from '.././Redux/Action/UserAction'

var mapStateToProps = state => {
  return {
     user: state.user,
  }
}

class Navbar extends React.Component
{
  constructor(){
    super()
    this.state = {
       
        loginstatus:false
       
    }       
}

componentDidMount()
{
   
    
    console.log(this.props.user)
 
    
}

logout = (event)=>{
  this.setState({loginstatus:true}) 
  store.dispatch({...ACTION_USER_LOGOUT})
  store.dispatch({...logout.LOGOUT,payload: {reset: []}})
  store.dispatch({...logout1.LOGOUT,payload: {reset: []}})
  store.dispatch({...logout2.LOGOUT,payload: {reset: []}})
  store.dispatch({...logout3.LOGOUT,payload: {reset: []}})
  store.dispatch({...logout4.LOGOUT,payload: {reset: []}})
  store.dispatch({...logout5.LOGOUT,payload: {reset: []}})
  store.dispatch({...logout6.LOGOUT,payload: {reset: {}}})
  store.dispatch({...logout7.LOGOUT,payload: {reset: {}}})
} 
render(){
  if(this.state.loginstatus){
    return(
    <Navigate to={"/"}/> )
}

   return(

    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' >
           DealsBazaar
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' >
            <i className={'fas fa-times', 'fas fa-bars'} />
          </div>
          <ul className={ 'nav-menu active' , 'nav-menu'}>
            <li className='nav-item'>
           {this.props.user.loginstatus==true?  <> <Link to='/dashboard' className='nav-links' >
                Home
              </Link></>:
              <Link to='/' className='nav-links' >
              Home
            </Link>}
            </li>
            <li className='nav-item'>
           {this.props.user.loginstatus==true?  <> <Link to="/mybids" className='nav-links'>My Bids</Link></>:
              <Link to='/' className='nav-links' >
           My Bids
            </Link>}
            </li>
        
            <li className='nav-item'>
            {this.props.user.loginstatus==true?       <Link
                to='/myproducts' className='nav-links'>
               Product
              </Link>:
               <Link
               to='/' className='nav-links'>
              Product
             </Link>}
            </li>

            <li className='nav-item'>
            {this.props.user.loginstatus==true?       <Link
                to='/myprofile' className='nav-links'>
               Profile
              </Link>:
               <Link
               to='/contact' className='nav-links'>
             Contact
             </Link>}
            </li>
       

      
            
          </ul>
       {this.props.user.loginstatus==false?  <Button buttonStyle='btn--outline'>SIGN UP</Button>:
       <Button buttonStyle='btn--outline' onClick={this.logout}>Logout</Button>}
        </div>
      </nav>
    </>
  
  );
}
}


export default connect(mapStateToProps,null)(Navbar)