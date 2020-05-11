import React, {useState, Component} from 'react';
import {withRouter, Redirect} from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Login({users}) {

  const [loginValue, setLoginValue] = useState('')  
  const [passValue, setPassValue] = useState('')
  const [isLogged, setLogInfo] = useState('false')

  function checkPass(){
      let logins = [];
      for(let i = 0; i < users.length; i++){
        logins.push({
            pass: users[i].Password,
            login: users[i].Login
        })
      }
      for(let i = 0; i < logins.length; i++){
          if(loginValue == logins[i].login && passValue == logins[i].pass){
            setLogInfo('true');
        }
      }
  }  
  function checkIsLogged(){
    if(isLogged == 'true')
        return <Redirect to="/workers"/>
    else return ;
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete="login"
            autoFocus
            value = {loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={passValue}
            onChange={(e) => setPassValue(e.target.value)}
          />
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick = {()=>{
                checkPass()
            }}
          >
            Sign In
          </Button>
          {checkIsLogged()}
        </form>
      </div>
    </Container>
  );
}