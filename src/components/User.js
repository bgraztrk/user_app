import React, { Component } from 'react';
import PropTypes from "prop-types";
import UserCunsomer from '../context';
import axios from 'axios';
import { Link } from 'react-router-dom';

class User extends Component {
  state = {
      isVisible : false
  }
  onClickEvent = (e) => {
    this.setState({
        isVisible : !this.state.isVisible
    })
  }
  onDeleteUser = async (dispatch,e) => {
    const {id} = this.props;
    
    //Delete Request
    await axios.delete(`http://localhost:3004/users/${id}`)
    
    //Consumer Dispatch
    dispatch({type : "DELETE_USER",payload : id});
  }
  render() {

      //Destructing
      const{id,name,salary,city} = this.props;
      const{isVisible} = this.state;
      return (
        <UserCunsomer>
          {
            value => {
              const {dispatch} = value;
              
              return (
                 <div className='col-md-8 mb-4' style={{left:"17%"}}> 
                    <div className='card' style={isVisible ? {backgroundColor:'#424242',cursor:'pointer',color:'white'} : {cursor:'pointer'}}>
                       <div className='card-header d-flex justify-content-between' onClick={this.onClickEvent}>
                           <h4 className='d-inline pt-2'>{name}</h4>
                           <i onClick = {this.onDeleteUser.bind(this,dispatch)} className='fa-solid fa-trash-can pt-2' style={{marginRight:'5px',marginTop:'5px'}}></i>
                       </div>
                       {
                       isVisible ? <div className='card-body'>
                           <p className='card-text'>Maas : {salary}</p>
                           <p className='card-text'>Sehir : {city}</p>
                           <Link to={`edit/${id}`} className='btn btn-outline-light btn-block'>Update User</Link>
                       </div> : null 
                       }
                    </div>
                 </div>
               );
            }
          }
        </UserCunsomer>
      )
  }
}
User.propTypes = {
  name : PropTypes.string.isRequired,
  salary : PropTypes.string.isRequired,
  city : PropTypes.string.isRequired,
  id : PropTypes.string.isRequired
}
export default User;