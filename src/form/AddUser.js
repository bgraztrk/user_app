import React, { Component } from 'react';
import UserCunsomer from '../context';
import posed from 'react-pose';
import axios from 'axios';

const Animation = posed.div({
    visible : { 
        opacity : 1,
        applyAtStart : {
            display : "block"
        }
    },
    hidden : { 
        opacity : 0,
        applyAtEnd : {
            display : "none"
        }
    }
});

class AddUser extends Component {

    state = {
        visible : false,
        name : "",
        salary : "",
        city : "",
    }
    changeVisibility = (e) => {
        this.setState({
            visible : !this.state.visible
        })
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value //buradaki name değeri inputlardaki name değeri yani sadece name inputu değil ki o yüzden e.target.value da array olarak tanımladım
        })
    }
    addUser = async (dispatch,e) => {
        e.preventDefault();
        const {name,salary,city} = this.state;

        const newUser = {
            name : name,
            salary : salary,
            city : city
        }
        
        const response = await axios.post("http://localhost:3004/users",newUser)

        dispatch({type:"ADD_USER",payload:response.data})
    }

  render() {
    const {visible,name,salary,city} = this.state;
    return <UserCunsomer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className = 'col-md-8 mb-4' style={{left:"17%"}}>
                       <button onClick={this.changeVisibility} className = "btn btn-dark btn-block mb-2" >{visible ? "HIDE FORM" : "SHOW FORM"}</button>
                       <Animation pose={visible ? "visible" : "hidden"}>
                       <div className='card'>
                           <div className='card-header'>
                               <h4>ADD USER FORM</h4>
                           </div>
                           <div className='card-body'>
                               <form onSubmit={this.addUser.bind(this,dispatch)}>
                                   <div className='form-group'>
                                       <label htmlFor='name'>Name</label>
                                       <input
                                       type='text'
                                       name='name'
                                       id='id'
                                       placeholder='Enter name'
                                       className = 'form-control mt-6'
                                       value={name}
                                       onChange={this.changeInput}
                                       />
                                   </div>
                                   <div className='form-group'>
                                       <label htmlFor='salary'>Salary</label>
                                       <input
                                       type='text'
                                       name='salary'
                                       id='salary'
                                       placeholder='Enter salary'
                                       className = 'form-control'
                                       value={salary}
                                       onChange={this.changeInput}
                                       />
                                   </div>
                                   <div className='form-group'>
                                       <label htmlFor='city'>City</label>
                                       <input
                                       type='text'
                                       name='city'
                                       id='city'
                                       placeholder='Enter city'
                                       className = 'form-control'
                                       value={city}
                                       onChange={this.changeInput}
                                       />
                                   </div>
                                   <button type='submit' className = "btn btn-success btn-block" >ADD USER</button>
                               </form>
                           </div>
                       </div>
                       </Animation>
                    </div>
                  )
            }
        }
    </UserCunsomer>
  }
}
export default AddUser;
