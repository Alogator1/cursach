import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import Login from "./modules/Login";
import Workers from "./modules/Workers"
//import history from './history';

class App extends Component {
  state = {  
    users:[]
  }
  componentDidMount() {
    fetch('/employees')
    .then(res => res.json())
    .then(users => this.setState({users}));    
  }  

  getUsers = function(){
    return this.props.users;
  }

  render() {     
    return (  
      <div className = "App">
        <Router>
          <Route path = "/" exact>
            <Login users = {this.state.users}>
            </Login>
          </Route>
          <Route path = "/workers" exact>
            <Workers users = {this.state.users}>
            </Workers>
          </Route>
        </Router>
      </div>
    );
  
  }
}
 
export default App;