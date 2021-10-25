import React, { useState } from 'react';
import useStyles from './styles'
import moment from 'moment'
import { Typography } from '@material-ui/core'
import { Accordion, AccordionSummary, AccordionDetails, TextField, Button, Grid, Container, Snackbar } from '@material-ui/core';
import emailjs from 'emailjs-com'


const Post = ({ post }) => {
    const [messageData, setMessageData] = useState({message:''})
    const classes = useStyles();

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
        console.log("clearing")
        setMessageData('')
        console.log(messageData)
    }


    const handleSubmit = (e) => {
        const email = post.email
        const message = messageData.message
        const params = {
            message: message,
            to_email: email
        }

        emailjs.send("service_vf7zimb", "template_lg414rk", params, "user_HAIoLy9K3v7HbAkbYabMX")
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                setMessage("Your message has been sent!")
                clear()
            }, function (error) {
                console.log('FAILED...', error);
                setMessage("Oops... there was an error")

            });
        e.preventDefault()
        handleClick()
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary>
                    <Typography variant="h6">{post.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container>
                        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} md={6} sm={6}>
                                {post.message}
                            </Grid>
                            <Grid item xs={12} md={6} sm={6}>
                                <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                                    <TextField multiline rows={10} type="text" name="messageData" variant="outlined" label="Write a response!" fullWidth value={messageData.message} onChange={(e) => setMessageData({ ...messageData, message: e.target.value })} />
                                    <Button type="submit" variant="contained" color="primary" fullWidth> Send </Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Container>
                </AccordionDetails>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    message={message}
                />
            </Accordion>
        </div>
    )
}

export default Post