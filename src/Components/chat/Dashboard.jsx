import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { CTX } from './Store'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px',
        padding: theme.spacing(3, 2)
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicsWindow: {
        width: '30%',
        height: '220px',
        borderRight: '1px solid grey'
    },
    chatWindow: {
        width: '70%',
        height: '220px',
        padding: '20px'
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    },
}));

export default function Dashboard() {
    const classes = useStyles()

    // CTX Store
    const { allChats, sendChatAction, user } = useContext(CTX)
    const topics = Object.keys(allChats)

    // Local State
    const [activeTopic, changeActiveTopic] = useState(topics[0])
    const [textValue, changeTextValue] = useState('')

    return (
        <div className={classes.root}>
            <Paper>
                <Typography variant="h3" component="h3">
                    Chat App
                </Typography>
                <Typography variant="h5">
                    {activeTopic}
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic} button>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map((chat, i) => (
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} />
                                    <Typography variant="body1">{chat.msg}</Typography>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField
                        label="Send a Chat"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={(e) => changeTextValue(e.target.value)}
                    />
                    <Button
                        className={classes.button}
                        variant="contained"
                        color='primary'
                        onClick={() => {
                            sendChatAction({ from: user, msg: textValue, topic: activeTopic })
                            changeTextValue('')
                        }}
                    >Send</Button>
                </div>
            </Paper>
        </div>
    );
}
