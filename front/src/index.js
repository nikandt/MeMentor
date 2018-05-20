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
import Settings from './settings';
import Message from './message';
import Browse from './browse';
import Chat from './chat';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 'index',
      userId: '5affcc26afdada4e1c475ee9'
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

  render() {
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
}

const app = ReactDOM.render(<App />, document.querySelector('#app'));
window.changeUser = user => {
  app.setState({ userId: user });
};
