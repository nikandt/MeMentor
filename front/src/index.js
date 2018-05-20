import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Settings from './settings';
import Message from './message';
import Browse from './browse';
import Chat from './chat';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 'index',
      userId: localStorage.getItem('userId')
    };
  }

  openChat(userId) {
    this.setState({
      page: 'chat',
      chatPartner: userId
    });

    console.log('open chat with ' + userId);
  }

  renderPage() {
    if (this.state.page === 'index') {
      return (
        <Browse
          userId={this.state.userId}
          onOpenChat={userId => this.openChat(userId)}
        />
      );
    } else if (this.state.page === 'message') {
      return (
        <Message
          userId={this.state.userId}
          onOpenChat={userId => this.openChat(userId)}
        />
      );
    } else if (this.state.page === 'chat') {
      return (
        <Chat userId={this.state.userId} partnerId={this.state.chatPartner} />
      );
    } else {
      return <Settings userId={this.state.userId} />;
    }
  }

  switchPage(value) {
    this.setState({ page: value });
  }

  renderLoggedIn() {
    let selectedNav = this.state.page;
    if (selectedNav === 'chat') {
      // lulz hax
      selectedNav = 'message';
    }
    return (
      <div>
        <div style={{ paddingBottom: 56 }}>{this.renderPage()}</div>
        <BottomNavigation
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0
          }}
          value={selectedNav}
          onChange={(event, value) => this.switchPage(value)}
        >
          <BottomNavigationAction value="index" icon={<HomeIcon />} />
          <BottomNavigationAction value="message" icon={<MessageIcon />} />
          <BottomNavigationAction value="settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </div>
    );
  }

  render() {
    if (this.state.userId === null) {
      return (
        <Login
          onLogin={userId => {
            this.setState({ userId });
            localStorage.setItem('userId', userId);
          }}
        />
      );
    } else {
      return this.renderLoggedIn();
    }
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    const url = '/api/getusers';
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
  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Login
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {this.state.users.map(u => (
            <ListItem
              button
              onClick={this.props.onLogin.bind(this, u._id.$oid)}
            >
              <Avatar src={u.imageURL} />
              <ListItemText primary={u.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const app = ReactDOM.render(<App />, document.querySelector('#app'));
window.changeUser = user => {
  app.setState({ userId: user });
  localStorage.setItem('userId', user);
};
