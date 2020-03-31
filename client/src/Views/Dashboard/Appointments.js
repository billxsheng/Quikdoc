import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Components/Title';
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

export default function Appointments() {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState([]);
  const [formURL, setFormURL] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (formURL) {
      document.getElementById("form-form").reset();
      let body = {
        fid: formData.clinic_id + "-" + formData.health_card_no,
        formURL,
        hcn: formData.health_card_no,
        clinic: formData.clinic_id
      }
      axios.post('http://localhost:8080/api/forms/add', body).then(() => {
        console.log('successful')
      })
    }
  }

  React.useEffect(() => {
    axios.get(`http://localhost:8080/api/appointments`).then((clinics) => {
      setAppointments(clinics.data);
    })
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <React.Fragment>
                  <Title>Appointments</Title>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Clinic</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointments.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.clinic_name}</TableCell>
                          <TableCell>{row.appointment_date}</TableCell>
                          <TableCell>{row.appointment_time}</TableCell>
                          <TableCell>
                            <form id="form-form" noValidate onSubmit={handleSubmit}>
                              <TextField
                                autoComplete="fname"
                                name="formURL"
                                label="Form URL"
                                autoFocus
                                onChange={(e) => {
                                  console.log(row)
                                  setFormURL(e.target.value)
                                  setFormData(row)
                                }}
                              />
                              <Button type="submit">Add Form</Button>
                            </form></TableCell>
                          <TableCell><Button component={Link} to="/main/records/1">Cancel Appointment</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </React.Fragment>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}