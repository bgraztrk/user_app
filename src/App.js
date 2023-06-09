import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Users from './components/Users';
import AddUser from './form/AddUser';
import UpdateUser from './form/UpdateUser';
import NotFound from './pages/NotFound';
import Contribute from './pages/Contribute';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <Navbar title="USER APP"/>
        <hr/>
        <Routes>
        <Route path="/" Component={Users} />
        <Route path="/add" element={<AddUser/>} />
        <Route path="/edit/:id" Component={UpdateUser} />
        <Route path="/github" element={<Contribute/>} />
        <Route path="*" element={<NotFound/>}/>
        </Routes>
        </div>
      </Router>
    );
  }
}
export default App;