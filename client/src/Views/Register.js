import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(props) {
  const classes = useStyles();
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [password, setPassword] = useState("");
  const [healthCardNumber, setHealthCardNumber] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(fn && ln && password && healthCardNumber && bloodType && email) {
      document.getElementById("register-form").reset();
      let body = {
        fn,
        ln, 
        password,
        healthCardNumber,
        bloodType,
        email
      }
      axios.post('http://localhost:8080/api/register', body).then(() => {
        props.history.push('/login');
      })
    }
  }

  return (
    <Container style={{ marginBottom: '100px', fontSize: 'calc(10px + 2vmin)' }} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1 style={{ color: 'black' }}>
          Register
        </h1>
        <form id="register-form" onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => setFn(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={e => setLn(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Health Card ID"
                name="healthcardId"
                autoComplete="healthcardId"
                onChange={e => setHealthCardNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="blood_type"
                label="Blood Type"
                type="blood_type"
                id="blood_type"
                onChange={e => setBloodType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            primary = {true}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // component={Link}
            // to="/login"
            // value="Submit"
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button style={{ color: 'black' }} component={Link} to="/login" variant="body2">
                {"Already have an account? Login"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
