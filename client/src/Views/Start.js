import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Grid, Button, Container } from '@material-ui/core';

export class Start extends Component {
    render() {
        return (
            <Container style={{ marginBottom: '100px', fontSize: 'calc(10px + 2vmin)' }} component="main" maxWidth="m">
                <div style={{ textAlign: 'center', marginTop:'64px', display:'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '30px', color: 'black' }}>
                        <h1>QuikDoc</h1>
                        <p>A smarter way to plan medical visits!</p>
                    </div>
                    <Grid style={{width:'400px'}} container spacing={0}>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" component={Link} to="/register">Register</Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>

        )
    }
}

export default Start
