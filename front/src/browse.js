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

class Browse extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      users: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/getusers')
      .then(response => {
        return response.json();
      })
      .then(obj => {
        this.setState({
          loading: false,
          users: obj
        });
      });
  }

  renderUser(user) {
    return (
      <ListItem key={user.name} dense button>
        <Avatar alt={user.name} src={user.imageURL || 'http://zumba.com'} />
        <ListItemText
          primary={user.name}
          secondary={`Knows ${user.skills.join(', ')}`}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Message">
            <CommentIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  renderUsers() {
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
    } else if (this.state.users.length > 0) {
      return <List>{this.state.users.map(this.renderUser)}</List>;
    } else {
      return (
        <Typography variant="body1" color="inherit">
          You have no matches. Please purchase our premium subscription
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
              Matches
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {this.renderUsers()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Browse;
