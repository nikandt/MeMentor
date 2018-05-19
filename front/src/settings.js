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
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',

    color: theme.palette.text.secondary
  }
});

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function handleDelete(userid) {
  console.log('You deleted the Chip.'); // eslint-disable-line no-alert

  const data = { skills: ['jebubu'] };

  fetch('http://localhost:5000/updateuser/5affcc26afdada4e1c475ee9', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}

function getUser() {
  console.log('Getting user...');
}

class Settings extends React.Component {
  constructor() {
    super();

    getUser();

    this.state = {
      email: '',
      password: 'asdsadasdsad',
      username: 'johndoe',
      interests: '',
      skills: '',
      imageurl:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAMFBMVEXd3N3////8/Pzg3+D5+fn29vbn5+fz8/Pv7+/i4eLs7Ozk5OTq6erv7u/h4eHp6OnBybNdAAAEVElEQVR4nO2d3ZKqQAyEFRBFFN//bZc5SIHKrpDppHOofDfe0pXpJPPr4RAEQRAEQRAEQRAEQRAEQRAEQRAEQWBI19U9bVeyP0RM2dzup6LnmOh/q8u9/e/klI9zdVygOF0b9retp6zPxZKKJ9W9Y3/hKrr7XyoGzi37K7/Snr+qGMJyc22X8r5ORuLkOCq374PqZYA5DUpz2iSjp3iwv3mJels4nkFhf/UHW9wxp/LmlJXJ6pPCVVFpFsv4Sm7sr59oc3Qcj1f29480Eps7VFLmxSPhIw2LfT7hwvEAHb0SfnN/Q+joOy92u9LmGn3kwtUBMPqToqYKuaJ09M0Kc3BlV5A5d6IQSMYaKXghqZE6mD395pnUF1gtPTggvJBAHZIguaRD62BVRWANGakoQmBFfQajvLcKOih2VxhZvd0JQjRGFqOUlCo6CNP3h46Qk7kQeDUcsK+J6D5rxHwZQsfr9m5vlHSYT6/UhFi3W/AWfsS6tu9GyEVLiHWTEkJCiBLCvU9/QnaTtXYjJFoUb0J20/3uZz6iVEjsZ4hKact+YWs3qyhKJiHst6usNDJWsWE77HMo+woalYSy+bab/ZESP7ZIB7fgcxLGpkICvtVD22gHl5KCdnQWnIGJJ52gLiGeRcGeDqKeNQUdBEzY71XNKWF+5zl9ADa46IeYQZuiDu5fQDIX9UDjCGD2XvHPLx8QhmcbfST78C/3yO+MrHswx8LRTZic0eVlXD0RO96Hz2dcZZXx5E2HsKcn31FYptx8YMjdJcSRelP2Ki4eyvkvbLh2fPbnjol6w+g6uymD73TXjXWxunq47PbO2qcF3sLize6N+IijK6vIouEuKs2fj4esoPARFWFv8iqFPmM/tKBlFPabHBfYCl3BbLvyJlTv8Bp6hDvmkJxSKpx9YLSRuMXSOfa3wVU2p4/2M3jRszTrlJg2xVrx+KfEMCYbX23aqsRsnUvlFMocozSsrsNIiaY/Rix8opevXpSo5y4bHfpKOiMd2q/w6PQly6h2K4Y6VDfeDRLvHLUkbJF452glYYUTc9+U6NhE6ZrxX6gcIwCen1mPQv9oP7ASCoPLNPNOwHMwZWAl0INL6wLPV8BnmgkZawSauaBnFzcCffmQGBBoSNRuT64DNzWhOX0A5ndyQHAhIdXCCVBVpAcEFRKyQxIQl6g8CLYVxBSLWkNGALWEWdQnAOXdeMHhN/IXIlwEBHCPzIXVE7l2d2H1RKbdfVg9kWl32gz3k7w5L73NmshquDhrQMtkrQw5Gll5Y8tNzkpk5C1PIytrbLmphgPymqj2GpgM+Rk7R8k3IU7AviySYRIHk/VXpFN3ZxaRm8RVFUlIK4kzi4hnV0rvNeUgc7s7r0vd7mTZYY5sCcKd16Vud7BU+o5o6RT3z044RA8R+Fl3mBCtQDjr4QcknbzD7CvLv67m6yOSebva08Q5SJ5sdVhGZIVkN0KczXMHfp/t/gDySEhntCfiZwAAAABJRU5ErkJggg==',
      showPassword: false
    };
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleChange() {
    // this.setState({ showPassword: !this.state.showPassword });
    console.log('lol');
  }

  handleMouseDownPassword() {
    event.preventDefault();
  }

  renderTopbar() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  renderUserSettings() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="title" gutterBottom>
          User settings
        </Typography>

        <Grid container spacing={24}>
          <Grid
            container
            item
            xs={12}
            sm={12}
            justify="center"
            alignItems="center"
          >
            <Avatar alt={this.state.username} src={this.state.imageurl} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <input
              accept="image/*"
              className={classes.input}
              id="button-file"
              multiple
              type="file"
            />
            <label htmlFor="button-file">
              <Button variant="raised" component="span" className="photos">
                Change photo
              </Button>
            </label>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl
              className={classNames(classes.margin, classes.textField)}
            >
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
            </FormControl>
            <FormControl
              className={classNames(classes.margin, classes.textField)}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  renderUserSkills() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="title" gutterBottom>
          Skills you know
        </Typography>
        <Chip
          label="Gardening"
          onClick={handleClick}
          onDelete={handleDelete}
          className={classes.chip}
        />
        <br />
        <InputLabel htmlFor="input-with-icon-adornment">Add skill</InputLabel>
        <Input id="input-with-icon-adornment2" />
      </Paper>
    );
  }

  renderUserInterests() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="title" gutterBottom>
          Interests
        </Typography>
        <Chip
          label="Scala"
          onClick={handleClick}
          onDelete={handleDelete}
          className={classes.chip}
        />
        <Chip
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
      </Paper>
    );
  }

  renderApplicationPreferences() {
    // TODO: implement
  }

  render() {
    return (
      <div>
        {this.renderTopbar()}

        <div id="settingscontainer">
          {this.renderUserSettings()}

          {this.renderUserSkills()}

          {this.renderUserInterests()}
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
