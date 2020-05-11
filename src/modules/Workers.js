import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    marginLeft:'20%',
    padding: '15px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  field:{
      width:"50%",
      marginTop:'15px'
  }
});

export default function Workers({users}) {
  
  const classes = useStyles();

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
    <form className={classes.root} noValidate autoComplete="off">
    <TextField id="standard-basic" label="Name" className={classes.field}/>
    <TextField id="standard-basic" label="Number" className={classes.field}/>
    <TextField id="standard-basic" label="CityID" className={classes.field}/>
    <TextField id="standard-basic" label="Adress" className={classes.field}/>
    <TextField id="standard-basic" label="Login" className={classes.field}/>
    <TextField id="standard-basic" label="Password" className={classes.field}/>
    <TextField id="standard-basic" label="SalonID" className={classes.field}/>     
            
    <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.addWorker}
          >
            Add worker
    </Button>
    </form>

    

    </div>
  );
}
