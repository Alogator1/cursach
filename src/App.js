import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import Login from "./modules/Login";
import Workers from "./modules/Workers";
import Clients from "./modules/Clients";
import Reservations from "./modules/Reservations";
import Materials from './modules/Materials';

class App extends Component {
  state = {  
    users:[],
    clients:[],
    procs:[],
    reservations:[],
    materialtable:[],
    brands:[],
    materials:[],
    typeofmaterials:[]
  }
  componentDidMount() {
    fetch('/employees')
    .then(res => res.json())
    .then(users => this.setState({users}));    

    fetch('/clients')
    .then(res => res.json())
    .then(clients => this.setState({clients}));    

    fetch('/concreteproc')
    .then(res => res.json())
    .then(procs => this.setState({procs}));    

    fetch('/reservations')
    .then(res => res.json())
    .then(reservations => this.setState({reservations}));

    fetch('/materialtable')
    .then(res => res.json())
    .then(materialtable => this.setState({materialtable})); 
    
    fetch('/brands')
    .then(res => res.json())
    .then(brands => this.setState({brands}));

    fetch('/materials')
    .then(res => res.json())
    .then(materials => this.setState({materials}));
    
    fetch('/typeofmaterial')
    .then(res => res.json())
    .then(typeofmaterials => this.setState({typeofmaterials}));
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
          <Route path = "/clients" exact>
            <Clients users = {this.state.clients}>
            </Clients>
          </Route>
          <Route path = "/reservations" exact>
            <Reservations reservations = {this.state.reservations} procs = {this.state.procs}>
            </Reservations>
          </Route>
          <Route path = "/materials" exact>
            <Materials 
            materialtable = {this.state.materialtable}
            materials = {this.state.materials}
            brands = {this.state.brands}
            typematerials={this.state.typeofmaterials} 
            >
            </Materials>
          </Route>
        </Router>
      </div>
    );
  
  }
}
 
export default App;