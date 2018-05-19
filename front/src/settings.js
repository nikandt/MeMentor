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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';

import classNames from 'classnames';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center'
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
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  input: {
    display: 'none'
  },
  chip: {
    margin: theme.spacing.unit
  }
});

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function handleDelete() {
  alert('You deleted the Chip.'); // eslint-disable-line no-alert
}

class Settings extends React.Component {
  constructor() {
    super();
  }

  /*state = {
    username: '',
    password: '',
    email: '',
    showPassword: false
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
            className={classes.input}
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
              /* onChange={handleChange('username')}*/
            />

            <TextField
              label="E-mail"
              id="margin-none"
              defaultValue="john@doe.com"
              className="container"
            />
          </p>
          <br />
          <Typography variant="title" gutterBottom>
            Learning interests
          </Typography>
          <Chip
            avatar={
              <Avatar>
                <DoneIcon />
              </Avatar>
            }
            label="Gardening"
            onClick={handleClick}
            onDelete={handleDelete}
            className={classes.chip}
          />
          <br />
          <InputLabel htmlFor="input-with-icon-adornment">
            Add interest
          </InputLabel>
          <Input id="input-with-icon-adornment2" />
          <br />
          <br />
          <Typography variant="title" gutterBottom>
            Teaching interests
          </Typography>
          <Chip
            avatar={
              <Avatar>
                <DoneIcon />
              </Avatar>
            }
            label="Scala"
            onClick={handleClick}
            onDelete={handleDelete}
            className={classes.chip}
          />
          <Chip
            avatar={
              <Avatar>
                <DoneIcon />
              </Avatar>
            }
            label="Python"
            onClick={handleClick}
            onDelete={handleDelete}
            className={classes.chip}
          />
          <br />
          <InputLabel htmlFor="input-with-icon-adornment">
            Add interest
          </InputLabel>
          <Input id="input-with-icon-adornment" />
        </div>
      </div>
    );
  }
}

// TODO: round image container for this page as well
/*
          <FormControl
            className={classNames(classes.margin, classes.textField)}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={this.showPassword ? 'text' : 'password'}
              value={this.password}
              onChange={this.handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
*/

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
