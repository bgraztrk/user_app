import React, { Component } from 'react';
import User from './User';
import UserCunsomer from '../context';

class Users extends Component {
  render() {

    return (
      <UserCunsomer>
        {
          value => {
            const {users} = value;
            return (
              <div> 
                {
                  users.map(user =>{
                    return(
                      <User
                        key = {user.id}
                        id = {user.id}
                        name = {user.name}
                        salary = {user.salary}
                        city = {user.city}
                      />
                    )
                  })
                }
              </div>
            );
          }
        }
      </UserCunsomer>
    )
  }
}
export default Users ; 