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
    goButtons:{
      marginTop: '20px'
    },
    navig:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        width: '60%',
        marginLeft:'20%',
        marginRight:'20%',
    }
  });

const Navbar = () => {
    const classes = useStyles();
    return ( 
        <nav className = {classes.navig}>
            <Button            
            color="primary"
            className={classes.goButtons}
            href="/reservations"
          >
            Go to reservations
        </Button>
        <Button            
            color="primary"
            className={classes.goButtons}
            href="/workers"
          >
            Go to workers
        </Button>
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
            href="/materials"
          >
            Go to materials 
         </Button>
        </nav>
     );
}
 
export default Navbar;