import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import classNames from 'classnames';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  input: {
    display: 'none'
  }
});

class Settings extends React.Component {
  constructor() {
    super();
  }

  /*state = {
    username: '',
    password: '',
    email: ''
  };*/

  /*handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };*/

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Settings
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="container">
          <br />
          <Typography variant="title" gutterBottom>
            User settings
          </Typography>
          <input
            accept="image/*"
            className="input"
            id="button-file"
            multiple
            type="file"
          />
          <label htmlFor="button-file">
            <Button variant="raised" component="span" className="photos">
              Upload
            </Button>
          </label>
          <p>
            <TextField
              label="Username"
              id="margin-none"
              defaultValue="John"
              className="container"
              /* onChange={this.handleNameChange('username')}*/
            />

            <TextField
              label="E-mail"
              id="margin-none"
              defaultValue="john@doe.com"
              className="container"
            />
          </p>
        </div>
      </div>
    );
  }
}

/*

          <Typography variant="title" gutterBottom>
            App preferences
          </Typography>
          <p>Set location on</p>
*/

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
