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
      textAlign:'center'
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

export default function Reservations({reservations, procs}) {
  
  const classes = useStyles();

  const [fields, setFields] = useState({ClientID: '', AgreementDate: '', AgreementTime:'', Price:'',StatusID:'', SalonID:'', WorkerID:'', ConcreteProcID:'', ConcreteName:''})

  const [id, setId] = useState('');

  function handleChange(evt) {
    const value = evt.target.value;
    setFields({
      ...fields,
      [evt.target.name]: value
    });
  }

  function handleClick(){
    let sendRes = {};
    let sendProc = {};
    
    if(id){
    sendRes.ID = id;
    sendRes.ClientID = fields.ClientID;
    sendRes.AgreementDate = fields.AgreementDate;
    sendRes.AgreementTime = fields.AgreementTime;
    sendRes.Price = fields.Price;
    sendRes.StatusID = fields.StatusID;
    sendRes.SalonID = fields.SalonID;

    sendProc.ReservationID = sendRes.ID;
    sendProc.WorkerID = fields.WorkerID;
    sendProc.ConcreteProcID = fields.ConcreteProcID;

    fetch('/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendRes)
      })
    
    fetch('/procs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendProc)
      })
      .then(()=>{
        setId('');
        setFields({ClientID: '', AgreementDate: '', AgreementTime:'', Price:'',StatusID:'', SalonID:'', WorkerID:'', ConcreteProcID:'', ConcreteName:''});
      })  
    }
  }

  function handleDelete(){
      if(id){
    fetch('/procs', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ID: id})
    })
    fetch('/reservations', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ID: id})
      })
    }
  }
  function handleUpdate(){

    let sendRes = {};
    let sendProc = {};
    
    let isResChanged = false;
    let isProcChanged = false;

    if(id){
    sendRes.ID = id;
    sendRes.ClientID = fields.ClientID;
    sendRes.AgreementDate = fields.AgreementDate;
    sendRes.AgreementTime = fields.AgreementTime;
    sendRes.Price = fields.Price;
    sendRes.StatusID = fields.StatusID;
    sendRes.SalonID = fields.SalonID;

    sendProc.ReservationID = sendRes.ID;
    sendProc.WorkerID = fields.WorkerID;
    sendProc.ConcreteProcID = fields.ConcreteProcID;
    
    for (let [key, value] of Object.entries(sendRes)) {
        if(key != 'ID' && value){
            console.log("not epmty")
        }
      }

    }
  }

  function createData() {
    let tmpData = [];
    for(let i = 0; i < reservations.length; i++){
        tmpData.push({
            ID: reservations[i].ID,
            ClientID: reservations[i].ClientID ,
            AgreementDate: reservations[i].AgreementDate,
            AgreementTime: reservations[i].AgreementTime,
            Price: reservations[i].Price,
            StatusID: reservations[i].StatusID,
            SalonID: reservations[i].SalonID,
            WorkerID: reservations[i].WorkerID,
            ConcreteProcID: reservations[i].ConcreteProcID,
            ConcreteName: reservations[i].ConcreteName
         })
      }
      console.log(procs);
    return tmpData;
    
  }
  
  const rows = createData();
  console.log(rows);
  
  return (
    <div>
    <h1 className={classes.hed}>
        Reservations
    </h1>
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>ID</TableCell>
            <TableCell align="right" className={classes.tableHead}>ClientID</TableCell>
            <TableCell align="right" className={classes.tableHead}>AgreementDate</TableCell>
            <TableCell align="right" className={classes.tableHead}>AgreementTime</TableCell>
            <TableCell align="right" className={classes.tableHead}>Price</TableCell>
            <TableCell align="right" className={classes.tableHead}>StatusID</TableCell>
            <TableCell align="right" className={classes.tableHead}>SalonID</TableCell>
            <TableCell align="right" className={classes.tableHead}>WorkerID</TableCell>
            <TableCell align="right" className={classes.tableHead}>ConcreteProcID</TableCell>
            <TableCell align="right" className={classes.tableHead}>ConcreteName</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.ClientID}</TableCell>
              <TableCell align="right">{row.AgreementDate.split("T").shift()}</TableCell>
              <TableCell align="right">{(row.AgreementTime.split("T").pop()).slice(0,-5)}</TableCell>
              <TableCell align="right">{row.Price}</TableCell>
              <TableCell align="right">{row.StatusID}</TableCell>
              <TableCell align="right">{row.SalonID}</TableCell>
              <TableCell align="right">{row.WorkerID}</TableCell>
              <TableCell align="right">{row.ConcreteProcID}</TableCell>
              <TableCell align="right">{row.ConcreteName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className={classes.forms}>
    <form className={classes.root} noValidate autoComplete="off">
    <TextField id="standard-basic" label="ClientID" className={classes.field} 
    value={fields.ClientID}
    onChange={handleChange}
    name="ClientID"
    type="number"
    />
    <TextField id="standard-basic" label="AgreementDate" className={classes.field}
    value={fields.AgreementDate}
    onChange={handleChange}
    name="AgreementDate"
    />
    <TextField id="standard-basic" label="AgreementTime" className={classes.field}
    value={fields.AgreementTime}
    onChange={handleChange}
    name="AgreementTime"
    />
    <TextField id="standard-basic" label="Price" className={classes.field}
    value={fields.Price}
    onChange={handleChange}
    name="Price"
    type="number"

    />
    <TextField id="standard-basic" label="StatusID" className={classes.field}
    value={fields.StatusID}
    onChange={handleChange}
    name="StatusID"
    type="number"

    />
    <TextField id="standard-basic" label="SalonID" className={classes.field}
    value={fields.SalonID}
    onChange={handleChange}
    name="SalonID"
    type="number"
    />
    <TextField id="standard-basic" label="WorkerID" className={classes.field}
    value={fields.WorkerID}
    onChange={handleChange}
    name="WorkerID"
    type="number"
    />     
    <TextField id="standard-basic" label="ConcreteProcID" className={classes.field}
    value={fields.ConcreteProcID}
    onChange={handleChange}
    name="ConcreteProcID"
    type="number"
    />     
            
    <Button            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.addWorker}
            onClick={handleClick}
          >
            Add reservation
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
    <form className={classes.goForm}>
    <Button            
          
            color="primary"
            className={classes.goButtons}
            href="/clients"
          >
            Go to clients
    </Button>
    <Button            
            color="primary"
            className={classes.goButtons}
            href="/workers"
          >
            Go to workers
    </Button>
    </form>
    </div>
    </div>

    </div>
  );
}
