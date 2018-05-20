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
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const styles = theme => ({
  avatar: {
    marginTop: 20,
    marginBottom: 5,
    width: '100%',
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      transform: 'translate(-50%,-50%)',
      top: '50%',
      left: '50%',
      width: 300,
      maxHeight: 300,
      maxWidth: 300
    }
  }
});

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: [],
      displayedUserIndex: 10000
    };
  }

  componentDidMount() {
    const fetchAll = location.hash.indexOf('fetch_all') !== -1;
    const url = fetchAll
      ? '/api/getusers'
      : `/api/getmatches/${this.props.userId}`;
    fetch(url)
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
    const { classes } = this.props;
    return (
      <div style={{ height: 'calc(100vh - 70px)' }}>
        <Avatar
          alt={user.name}
          src={user.imageURL || 'http://zumba.com'}
          className={classes.avatar}
        />
        <br />
        <Typography
          variant="display1"
          color="inherit"
          style={{ fontSize: '1.8em' }}
        >
          knows{' '}
          <Typography
            variant="inherit"
            color="primary"
            style={{ display: 'inline' }}
          >
            {user.skills[0]}
          </Typography>
        </Typography>
        <Typography variant="subheading" color="inherit">
          and wants to learn{' '}
          <span style={{ color: '#3fb580' }}>{user.interests[0]}</span>
        </Typography>
        <Typography variant="title" color="textSecondary">
          {user.name}

          <IconButton aria-label="Message">
            <CommentIcon onClick={() => this.props.onOpenChat(user._id.$oid)} />
          </IconButton>
        </Typography>
      </div>
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
      const user = this.state.users[
        this.state.displayedUserIndex % this.state.users.length
      ];
      return (
        <Grid container>
          <Grid container xs={2} alignItems="center">
            <IconButton
              onClick={() =>
                this.setState(prevState => ({
                  displayedUserIndex: prevState.displayedUserIndex - 1
                }))
              }
            >
              <KeyboardArrowLeft />
            </IconButton>
          </Grid>
          <Grid xs={8}>{this.renderUser(user)}</Grid>
          <Grid container xs={2} alignItems="center">
            <IconButton
              onClick={() =>
                this.setState(prevState => ({
                  displayedUserIndex: prevState.displayedUserIndex + 1
                }))
              }
            >
              <KeyboardArrowRight />
            </IconButton>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Typography variant="body1" color="inherit">
          You have no matches. Add more interests!
        </Typography>
      );
    }
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Matches
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {this.renderUsers()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

Browse.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Browse);
