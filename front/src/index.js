import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import Settings from './settings';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 'index'
    };
  }

  renderPage() {
    if (this.state.page === 'index') {
      return <div>THIS IS MAIN PAGE</div>;
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
        <BottomNavigation onChange={(event, value) => this.switchPage(value)}>
          <BottomNavigationAction
            value="otherpage"
            label="aaaa"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            value="otherpage"
            label="bbbb"
            icon={<MessageIcon />}
          />
          <BottomNavigationAction
            value="otherpage"
            label="cccc"
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
