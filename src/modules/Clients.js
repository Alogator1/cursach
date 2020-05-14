import React, {useState, Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {withRouter, Redirect} from 'react-router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Navbar from './components/Navbar'



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHead:{
      fontWeight: 'bold',
      backgroundColor:'#3f51b5',
      color:'white'
  },
  container: {
      width: '90%',
      marginLeft: '5%',
      marginBottom: '40px',
      marginTop:'40px',
  },
  addWorker:{
      width:'60%',
      marginTop:'15px'
  },
  hed:{
      fontFamily:'Courier New',
      fontSize:'50px',
      textAlign:'center',
      marginTop: 0
  },
  root:{
    width:'60%',
    padding: '15px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  field:{
      width:"50%",
      marginTop:'15px'
  },
  fieldId:{
    width:"20%",
    marginTop:'15px'
  },
  forms:{
    display:'flex',
    flexDirection: 'row'
  },
  editButtons:{
    display:'flex',
    flexDirection: 'row',
  },
  editButt:{
    width:'60%',
    marginTop:'15px',
    marginRight:'15px'
  },
  buttonsForms:{
    width:'30%',
  },
  goForm:{
    width:'60%',
    display:'flex',
    flexDirection:'column',
    paddingLeft:'20px',
  },
  goButtons:{
    marginTop: '20px'
  }
});

export default function Cliets({users}) {
  
  const classes = useStyles();

  const [fields, setFields] = useState({PIB: '', Email: '', ClientAddress:'', PhoneNumber:'',Discount:''})

  const [id, setId] = useState('');

  function handleChange(evt) {
    const value = evt.target.value;
    setFields({
      ...fields,
      [evt.target.name]: value
    });
  }

  function handleClick(){
    fetch('/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })
    .then(()=>{
      setFields({PIB: '', Email: '', ClientAddress:'', PhoneNumber:'',Discount:''})
    })
  }
  function handleDelete(){
    fetch('/clients', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ID: id})
    })
    .then(()=>{
      setId('');
    })
  }
  function handleUpdate(){

    let tmpObj = {};
    tmpObj['ID'] = id;
    for(let propName in fields){
      if(fields[propName] != '')
      {
        tmpObj[propName] = fields[propName];
      }
    }
    fetch('/clients', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tmpObj)
    })
    .then(()=>{
      setId('');
      setFields({PIB: '', Email: '', ClientAddress:'', PhoneNumber:'',Discount:''});
    })
  }

  function createData() {
    let tmpData = [];
    for(let i = 0; i < users.length; i++){
        tmpData.push({
            ID: users[i].ID,
            PIB: users[i].PIB ,
            Email: users[i].Email,
            ClientAddress: users[i].ClientAddress,
            PhoneNumber: users[i].PhoneNumber,
            Discount: users[i].Discount,
         })
      }
    return tmpData;
  }
  
  const rows = createData();
  
  return (
    <div>
      <Navbar></Navbar>
    <h1 className={classes.hed}>
        Clients
    </h1>
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>ID</TableCell>
            <TableCell align="right" className={classes.tableHead}>PIB</TableCell>
            <TableCell align="right" className={classes.tableHead}>Email</TableCell>
            <TableCell align="right" className={classes.tableHead}>ClientAddress</TableCell>
            <TableCell align="right" className={classes.tableHead}>PhoneNumber</TableCell>
            <TableCell align="right" className={classes.tableHead}>Discount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.PIB}</TableCell>
              <TableCell align="right">{row.Email}</TableCell>
              <TableCell align="right">{row.ClientAddress}</TableCell>
              <TableCell align="right">{row.PhoneNumber}</TableCell>
              <TableCell align="right">{row.Discount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className={classes.forms}>
    <form className={classes.root} noValidate autoComplete="off">
    <TextField id="standard-basic" label="Name" className={classes.field} 
    value={fields.PIB}
    onChange={handleChange}
    name="PIB"
    />
    <TextField id="standard-basic" label="Email" className={classes.field}
    value={fields.Email}
    onChange={handleChange}
    name="Email"
    type="email"
    />
    <TextField id="standard-basic" label="ClientAddress" className={classes.field}
    value={fields.ClientAddress}
    onChange={handleChange}
    name="ClientAddress"
    />
    <TextField id="standard-basic" label="PhoneNumber" className={classes.field}
    value={fields.PhoneNumber}
    onChange={handleChange}
    name="PhoneNumber"
    type="number"
    />
    <TextField id="standard-basic" label="Discount" className={classes.field}
    value={fields.Discount}
    onChange={handleChange}
    name="Discount"
    type="number"
    />   
            
    <Button            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.addWorker}
            onClick={handleClick}
          >
            Add client
    </Button>
    </form>
    <div className={classes.buttonsForms}>
    <form className={classes.root} noValidate autoComplete="off">
    <TextField id="standard-basic" label="ID" className={classes.fieldId}
    type="number"
    value={id}
    onChange={(e) => setId(e.target.value)}
    name="ID"
    />
      <div className={classes.editButtons}>
    <Button            
            variant="contained"
            className={classes.editButt}
            onClick={handleUpdate}
          >
            Update
    </Button>
    <Button            
            variant="contained"
            color="secondary"
            className={classes.addWorker}
            onClick={handleDelete}
          >
            Delete
    </Button>
    </div>
    </form>
    </div>
    </div>
    </div>
  );
}
