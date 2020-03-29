import React from 'react';
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
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <Container style={{marginBottom: '100px', fontSize: 'calc(10px + 2vmin)'}} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1 style={{color:'black'}}>
            Login
        </h1>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Health Card ID"
            name="healthcardId"
            autoComplete="healthcardId"
            autoFocus
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            component={Link} 
            to="/main/dashboard"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Button style={{color: 'black'}} component={Link} to="/register"  variant="body2">
                {"Don't have an account? Register"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}