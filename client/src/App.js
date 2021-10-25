import React, {useEffect} from 'react'
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux'
import Background from './images/background.png'
import {getPosts} from './actions/posts'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import useStyles from './styles'

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch])


    return (
        <div>
            <Container maxwidth="lg">
            <AppBar className = {classes.appBar} position="static" color="inherit">
            <Typography className = {classes.heading} variant="h2" align="center"> Secure Thought </Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems = "stretch" spacing={3}>
                        <Grid item xs={12} md ={8} sm = {12}>
                            <Posts/>
                        </Grid>
                            <Grid className = {classes.form} item xs={12} md={4} sm = {12}>
                                <Form/>
                            </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>

        </div>
    )
}
export default App