import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CommentIcon from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      messages: ['moi', 'moi', 'miten menee', 'hyvin', 'ok'],
      chatText: ''
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/getconversation/', {
      method: 'POST',
      body: JSON.stringify({
        userA: 'aaa',
        userB: this.props.userId
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        return response.json();
      })
      .then(obj => {
        console.log(obj);
      });
  }

  renderMessage(msg) {
    return (
      <ListItem dense>
        {!msg.isMe && <Avatar src={'http://zumba.com'} />}
        <ListItemText
          primary={msg.text}
          style={{
            textAlign: msg.isMe ? 'right' : 'left',
            backgroundColor: msg.isMe ? '#d4ffe9' : '#efeeee'
          }}
        />
        {msg.isMe && <Avatar src={'http://zumba.com'} />}
      </ListItem>
    );
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Chat with {this.props.userId}
            </Typography>
          </Toolbar>
        </AppBar>
        <List style={{ paddingBottom: 32 /* extra 32px because chat */ }}>
          {this.state.messages.map((msg, index) =>
            this.renderMessage({ text: msg, isMe: index % 2 === 1 })
          )}
        </List>
        <TextField
          style={{
            position: 'fixed',
            bottom: 0,
            paddingBottom: 50
          }}
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Type a message"
          fullWidth
          margin="normal"
          onChange={event => this.setState({ chatText: event.target.value })}
          value={this.state.chatText}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              this.setState({
                chatText: '',
                messages: [...this.state.messages, event.target.value]
              });
            }
          }}
        />
      </div>
    );
  }
}

export default Chat;