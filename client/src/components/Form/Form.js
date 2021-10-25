import React, { useState } from 'react';
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography, Paper, Snackbar } from '@material-ui/core'
import { createPost } from '../../actions/posts';

const Form = () => {
    const [postData, setPostData] = useState({ title: '', email: '', message: '' })
    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')


    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false)
    }

    const clear = () => {
        setPostData({title: '', email: '', message: ''});
      };
    
    const handleSubmit = (e) => {
        if (postData.title == '' || postData.message == '' || postData.email == '') {
            console.log("fill in al lfields ")
            setMessage("Please fill in all fields")
        }
        else {
            dispatch(createPost(postData))
            setMessage("Your post has been created!")
            clear()
        }
        handleClick()
        e.preventDefault()
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> Confess your sins </Typography>
                <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="email" variant="outlined" label="email" fullWidth value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
                <TextField inputProps={{ maxLength: 500, }} multiline rows={10} name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <Button className={classes.buttonSubmit} type="submit" variant="contained" color="primary" fullWidth> Submit </Button>
                <Button className={classes.buttonSubmit} onClick={clear} variant="contained" color="secondary" fullWidth> Clear </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    message={message}
                />
            </form>
        </Paper>
    )
}

export default Form