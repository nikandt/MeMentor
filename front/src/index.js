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
import Browse from './browse';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 'index'
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
      return <Browse onOpenChat={userId => this.openChat(userId)} />;
    } else if (this.state.page === 'message') {
      return <Message onOpenChat={userId => this.openChat(userId)} />;
    } else if (this.state.page === 'chat') {
      return <h1>TODO chat with {this.state.chatPartner}</h1>;
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
          <BottomNavigationAction value="index" icon={<HomeIcon />} />
          <BottomNavigationAction value="message" icon={<MessageIcon />} />
          <BottomNavigationAction value="settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
