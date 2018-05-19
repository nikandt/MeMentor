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

export const MYID = '5affcc26afdada4e1c475ee9';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      conversations: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/getallconversations')
      .then(response => {
        return response.json();
      })
      .then(obj => {
        this.setState({
          loading: false,
          conversations: obj
        });
      });
  }

  renderConversation(conv) {
    const otherUser = conv.userB === MYID ? conv.userA : conv.userB;
    return (
      <ListItem
        key={otherUser}
        button
        onClick={() => this.props.onOpenChat(otherUser)}
      >
        <Avatar
          alt={otherUser}
          src={otherUser /*.imageURL*/ || 'http://zumba.com'}
        />
        <ListItemText primary={otherUser} secondary={conv.messages[0]} />
      </ListItem>
    );
  }

  renderConversations() {
    if (this.state.loading) {
      return (
        <Fade
          in={true}
          style={{
            transitionDelay: '800ms',
            position: 'relative'
          }}
          unmountOnExit
        >
          <CircularProgress style={{ marginLeft: '50%', left: -20, top: 10 }} />
        </Fade>
      );
    } else if (this.state.conversations.length > 0) {
      return (
        <List>
          {this.state.conversations.map(this.renderConversation.bind(this))}
        </List>
      );
    } else {
      return (
        <Typography variant="body1" color="inherit">
          No conversations. Find someone!
        </Typography>
      );
    }
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Messages
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {this.renderConversations()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Message;
