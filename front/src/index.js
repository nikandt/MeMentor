import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Settings from './settings';
import Message from './message';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 'index'
    };
  }

  static callJebuliinas() {
    fetch('http://localhost:5000/getUsers').then(function(response) {
      return response.json();
    });
  }

  renderPage() {
    if (this.state.page === 'index') {
      return (
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Matches
              </Typography>
            </Toolbar>
          </AppBar>
          {App.callJebuliinas()}
        </div>
      );
    } else if (this.state.page === 'message') {
      return <Message />;
    } else {
      return <Settings />;
    }
  }

  switchPage(value) {
    this.setState({ page: value });
  }

  render() {
    return (
      <div>
        {this.renderPage()}
        <BottomNavigation
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0
          }}
          value={this.state.page}
          onChange={(event, value) => this.switchPage(value)}
        >
          <BottomNavigationAction
            value="index"
            label="Index"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            value="message"
            label="Messages"
            icon={<MessageIcon />}
          />
          <BottomNavigationAction
            value="settings"
            label="Settings"
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
