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
      messages: [],
      chatText: ''
    };
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  componentDidMount() {
    this.tick();
    this.updateTimer = setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    fetch('/api/getconversation', {
      method: 'POST',
      body: JSON.stringify({
        userA: this.props.userId,
        userB: this.props.partnerId
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        return response.json();
      })
      .then(obj => {
        const me =
          this.props.userId === obj.userA._id.$oid ? obj.userA : obj.userB;
        const other =
          this.props.userId === obj.userA._id.$oid ? obj.userB : obj.userA;
        this.setState({
          loading: true,
          messages: obj.messages,
          me: me,
          other: other
        });
      });
  }

  renderMessage(msg) {
    const isMe = msg.sender === this.state.me._id.$oid;
    return (
      <ListItem dense>
        {!isMe && <Avatar src={this.state.other.imageURL} />}
        <ListItemText
          primary={msg.text}
          style={{
            height: 25,
            textAlign: isMe ? 'right' : 'left',
            backgroundColor: isMe ? '#d4ffe9' : '#efeeee'
          }}
        />
        {isMe && <Avatar src={this.state.me.imageURL} />}
      </ListItem>
    );
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Chat with {this.state.other && this.state.other.name}
              {this.state.loading && (
                <CircularProgress
                  size={20}
                  style={{ display: 'inline-block' }}
                />
              )}
            </Typography>
          </Toolbar>
        </AppBar>
        <List style={{ paddingBottom: 32 /* extra 32px because chat */ }}>
          {this.state.messages.map(this.renderMessage.bind(this))}
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
              fetch('/api/addmessage', {
                method: 'POST',
                body: JSON.stringify({
                  userA: this.props.userId,
                  userB: this.props.partnerId,
                  time: 420,
                  text: event.target.value
                }),
                headers: new Headers({
                  'Content-Type': 'application/json'
                })
              });
              this.setState({
                chatText: ''
              });
            }
          }}
        />
      </div>
    );
  }
}

export default Chat;
