import React, { useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Components/Title';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '1250px'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  depositContext: {
    flex: 1,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [appointment, setAppointment] = useState([]);
  const [wClinic, setWClinic] = useState([]);
  const [aClinic, setAClinic] = useState([]);
  const [formURL, setFormURL] = useState("");
  console.log(appointment)
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (formURL) {
      document.getElementById("form-form").reset();
      let body = {
        fid: appointment.clinic_id + "-" + appointment.health_card_no,
        formURL,
        hcn: appointment.health_card_no,
        clinic: appointment.clinic_id
      }
      axios.post('http://localhost:8080/api/forms/add', body).then(() => {
        console.log('successful')
      })
    }
  }

  React.useEffect(() => {
    axios.get(`http://localhost:8080/api/appointments`).then((appointment) => {
      setAppointment(appointment.data[0]);
    })
    axios.get('http://localhost:8080/api/appointment_clinics').then((clinics) => {
      setAClinic(clinics.data.slice(0, 3));
    })
    axios.get('http://localhost:8080/api/walkin_clinics').then((clinics) => {
      setWClinic(clinics.data.slice(0, 3));
    })
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <React.Fragment>
                  <Title>Upcoming Appointment</Title>
                  <Typography component="p" variant="h4" className={classes.depositContext}>
                    {appointment.clinic_name}
                  </Typography>
                  <Typography color="textSecondary">
                    at {appointment.appointment_time} | {appointment.appointment_date}
                  </Typography>
                  <Typography color="textSecondary">
                    {appointment.clinic_address}
                  </Typography>
                  <div className={classes.seeMore}>
                    <form id="form-form" noValidate onSubmit={handleSubmit}>
                      <TextField
                        autoComplete="fname"
                        name="formURL"
                        label="Form URL"
                        autoFocus
                        onChange={e => setFormURL(e.target.value)}
                      />
                      <Button type="submit">Add Form</Button>
                    </form>
                  </div>
                </React.Fragment>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <React.Fragment>
                  <Title>Suggested Clinics</Title>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Rating (/5)</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Wait Time</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Distance (km)</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {wClinic.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell>{row.clinic_name}</TableCell>
                          <TableCell>{row.clinic_rating}</TableCell>
                          <TableCell>Walk-in Clinic</TableCell>
                          <TableCell>{row.avg_wait_time + " Hours"}</TableCell>
                          <TableCell>{row.clinic_address}</TableCell>
                          <TableCell>{Math.floor(Math.random() * 9 + 1)}</TableCell>
                          <TableCell><Button component={Link} to={'/main/clinics/' + row.clinic_id}>More Info</Button></TableCell>
                        </TableRow>
                      ))}
                      {aClinic.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell>{row.clinic_name}</TableCell>
                          <TableCell>{row.clinic_rating}</TableCell>
                          <TableCell>Appointment Clinic</TableCell>
                          <TableCell>{row.avg_wait_days + " Days"}</TableCell>
                          <TableCell>{row.clinic_address}</TableCell>
                          <TableCell>{Math.floor(Math.random() * 9 + 1)}</TableCell>
                          <TableCell><Button component={Link} to={'/main/clinics/' + row.clinic_id}>More Info</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className={classes.seeMore}>
                    <Button component={Link} to="/main/clinics" color="primary" >
                      View more clinics
                    </Button>
                  </div>
                </React.Fragment>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}