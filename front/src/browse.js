import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
        {this.state.users.map(user => <div>{user.name}</div>)}
      </div>
    );
  }
}

export default Browse;
