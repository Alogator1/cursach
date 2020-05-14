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

export default function Workers({users}) {
  
  const classes = useStyles();

  const [fields, setFields] = useState({WorkerName: '', PhoneNumber: '', CityID:'', Adress:'',Login:'', Password:'', SalonID:''})

  const [id, setId] = useState('');

  function handleChange(evt) {
    const value = evt.target.value;
    setFields({
      ...fields,
      [evt.target.name]: value
    });
  }

  function handleClick(){
    fetch('/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })
    .then(()=>{
      setFields({WorkerName: '', PhoneNumber: '', CityID:'', Adress:'',Login:'', Password:'', SalonID:''})
    })
  }
  function handleDelete(){
    fetch('/employees', {
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
    fetch('/employees', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tmpObj)
    })
    .then(()=>{
      setId('');
      setFields({WorkerName: '', PhoneNumber: '', CityID:'', Adress:'',Login:'', Password:'', SalonID:''});
    })
  }

  function createData() {
    let tmpData = [];
    for(let i = 0; i < users.length; i++){
        tmpData.push({
            ID: users[i].ID,
            CityID: users[i].CityID ,
            Adress: users[i].Adress,
            PhoneNumber: users[i].PhoneNumber,
            SalonID: users[i].SalonID,
            WorkerName: users[i].WorkerName,
         })
      }
    return tmpData;
  }
  
  const rows = createData();
  
  return (
    <div>
      <Navbar></Navbar>
    <h1 className={classes.hed}>
        Workers
    </h1>
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>ID</TableCell>
            <TableCell align="right" className={classes.tableHead}>Name</TableCell>
            <TableCell align="right" className={classes.tableHead}>CityID</TableCell>
            <TableCell align="right" className={classes.tableHead}>Adress</TableCell>
            <TableCell align="right" className={classes.tableHead}>SalonID</TableCell>
            <TableCell align="right" className={classes.tableHead}>PhoneNumber</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.WorkerName}</TableCell>
              <TableCell align="right">{row.CityID}</TableCell>
              <TableCell align="right">{row.Adress}</TableCell>
              <TableCell align="right">{row.SalonID}</TableCell>
              <TableCell align="right">{row.PhoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className={classes.forms}>
    <form className={classes.root} noValidate autoComplete="off">
    <TextField id="standard-basic" label="Name" className={classes.field} 
    value={fields.WorkerName}
    onChange={handleChange}
    name="WorkerName"
    />
    <TextField id="standard-basic" label="Phone" className={classes.field}
    value={fields.PhoneNumber}
    onChange={handleChange}
    name="PhoneNumber"
    type="number"
    />
    <TextField id="standard-basic" label="CityID" className={classes.field}
    value={fields.CityID}
    onChange={handleChange}
    name="CityID"
    type="number"
    />
    <TextField id="standard-basic" label="Adress" className={classes.field}
    value={fields.Adress}
    onChange={handleChange}
    name="Adress"
    />
    <TextField id="standard-basic" label="Login" className={classes.field}
    value={fields.Login}
    onChange={handleChange}
    name="Login"
    />
    <TextField id="standard-basic" label="Password" className={classes.field}
    value={fields.Password}
    onChange={handleChange}
    name="Password"
    type="password"
    />
    <TextField id="standard-basic" label="SalonID" className={classes.field}
    value={fields.SalonID}
    onChange={handleChange}
    name="SalonID"
    type="number"
    />     
            
    <Button            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.addWorker}
            onClick={handleClick}
          >
            Add worker
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
