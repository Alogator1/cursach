import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import Login from "./modules/Login";
import Workers from "./modules/Workers"

let tableHeader;


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
          {/* {console.log(Object.entries(this.state.users))} */}
          <Route path = "/" exact>
            <Login users = {Object.entries(this.state.users)}>
            </Login>
          </Route>
          <Route path = "/workers" exact>
            <Workers>

            </Workers>
          </Route>
        </Router>
      </div>
    );
  
  }
}
 
export default App;