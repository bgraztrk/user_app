import React, { Component } from 'react';
import UserCunsomer from '../context';
import axios from 'axios';

class UpdateUser extends Component {

    state = {
        name : "",
        salary : "",
        city : "",
        error : false
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value //buradaki name değeri inputlardaki name değeri yani sadece name inputu değil ki o yüzden e.target.value da array olarak tanımladım
        })
    }
    componentDidMount = async () => {
        const {id} = this.props.match.params;

        const response = await axios.get(`http://localhost:3004/users/${id}`);

        const {name,salary,city} = response.data;

        this.setState({
            name,
            salary,
            city
        })
    }
    validateForm = () => {
        const {name,salary,city} = this.state;
        if (name === "" || salary === "" || city === "") {
            return false;
        }
        return true;
        
    }
    updateUser = async (dispatch,e) => {
        e.preventDefault();
        
        // Update User
      const {name,salary,city} = this.state;
      const {id} = this.props.match.params;
      const updatedUser = {
        name,
        salary,
        city
      };
      if (!this.validateForm()) {
        this.setState({
            error :true
        })
        return;
        }
      const response = await axios.put(`http://localhost:3004/users/${id}`,updatedUser);

      dispatch({type: "UPDATE_USER",payload : response.data});

      // Redirect
      this.props.history.push("/");
    }

  render() {
    const {name,salary,city,error} = this.state;
    return <UserCunsomer>
        {
            value => {
                const {dispatch} = value;
                return (
                    <div className = 'col-md-8 mb-4' style={{left:"17%"}}>
                       <div className='card'>
                           <div className='card-header'>
                               <h4>UPDATE USER FORM</h4>
                           </div>
                           <div className='card-body'>
                            {
                            error ? 
                            <div className = "alert alert-danger">
                               Lütfen bilgilerinizi kontrol edin.
                            </div>
                            :null
                            }
                               <form onSubmit={this.updateUser.bind(this,dispatch)}>
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
                    </div>
                  )
            }
        }
    </UserCunsomer>
  }
}
export default UpdateUser;
