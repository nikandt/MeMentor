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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import MenuItem from '@material-ui/core/MenuItem';

import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

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
  helptext: {
    margin: theme.spacing.unit
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

const suggestions = [
  { label: 'Gardening' },
  { label: 'Swimming' },
  { label: 'Skiing' }
];

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

class Settings extends React.Component {
  constructor(props) {
    super(props);

    // Leikisti autentikoitiin ja saatiin tää user id

    this.state = {
      email: '',
      password: '',
      name: '',
      coords: [],
      interests: [],
      skills: [],
      showPassword: false,
      imageurl:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAMFBMVEXd3N3////8/Pzg3+D5+fn29vbn5+fz8/Pv7+/i4eLs7Ozk5OTq6erv7u/h4eHp6OnBybNdAAAEVElEQVR4nO2d3ZKqQAyEFRBFFN//bZc5SIHKrpDppHOofDfe0pXpJPPr4RAEQRAEQRAEQRAEQRAEQRAEQRAEQWBI19U9bVeyP0RM2dzup6LnmOh/q8u9/e/klI9zdVygOF0b9retp6zPxZKKJ9W9Y3/hKrr7XyoGzi37K7/Snr+qGMJyc22X8r5ORuLkOCq374PqZYA5DUpz2iSjp3iwv3mJels4nkFhf/UHW9wxp/LmlJXJ6pPCVVFpFsv4Sm7sr59oc3Qcj1f29480Eps7VFLmxSPhIw2LfT7hwvEAHb0SfnN/Q+joOy92u9LmGn3kwtUBMPqToqYKuaJ09M0Kc3BlV5A5d6IQSMYaKXghqZE6mD395pnUF1gtPTggvJBAHZIguaRD62BVRWANGakoQmBFfQajvLcKOih2VxhZvd0JQjRGFqOUlCo6CNP3h46Qk7kQeDUcsK+J6D5rxHwZQsfr9m5vlHSYT6/UhFi3W/AWfsS6tu9GyEVLiHWTEkJCiBLCvU9/QnaTtXYjJFoUb0J20/3uZz6iVEjsZ4hKact+YWs3qyhKJiHst6usNDJWsWE77HMo+woalYSy+bab/ZESP7ZIB7fgcxLGpkICvtVD22gHl5KCdnQWnIGJJ52gLiGeRcGeDqKeNQUdBEzY71XNKWF+5zl9ADa46IeYQZuiDu5fQDIX9UDjCGD2XvHPLx8QhmcbfST78C/3yO+MrHswx8LRTZic0eVlXD0RO96Hz2dcZZXx5E2HsKcn31FYptx8YMjdJcSRelP2Ki4eyvkvbLh2fPbnjol6w+g6uymD73TXjXWxunq47PbO2qcF3sLize6N+IijK6vIouEuKs2fj4esoPARFWFv8iqFPmM/tKBlFPabHBfYCl3BbLvyJlTv8Bp6hDvmkJxSKpx9YLSRuMXSOfa3wVU2p4/2M3jRszTrlJg2xVrx+KfEMCYbX23aqsRsnUvlFMocozSsrsNIiaY/Rix8opevXpSo5y4bHfpKOiMd2q/w6PQly6h2K4Y6VDfeDRLvHLUkbJF452glYYUTc9+U6NhE6ZrxX6gcIwCen1mPQv9oP7ASCoPLNPNOwHMwZWAl0INL6wLPV8BnmgkZawSauaBnFzcCffmQGBBoSNRuT64DNzWhOX0A5ndyQHAhIdXCCVBVpAcEFRKyQxIQl6g8CLYVxBSLWkNGALWEWdQnAOXdeMHhN/IXIlwEBHCPzIXVE7l2d2H1RKbdfVg9kWl32gz3k7w5L73NmshquDhrQMtkrQw5Gll5Y8tNzkpk5C1PIytrbLmphgPymqj2GpgM+Rk7R8k3IU7AviySYRIHk/VXpFN3ZxaRm8RVFUlIK4kzi4hnV0rvNeUgc7s7r0vd7mTZYY5sCcKd16Vud7BU+o5o6RT3z044RA8R+Fl3mBCtQDjr4QcknbzD7CvLv67m6yOSebva08Q5SJ5sdVhGZIVkN0KczXMHfp/t/gDySEhntCfiZwAAAABJRU5ErkJggg=='
    };

    this.getUser(this.props.userId);
  }

  getUser(userid) {
    return fetch('http://localhost:5000/getuser/' + userid).then(response => {
      return response.json().then(obj => {
        this.setState({
          email: obj.email,
          name: obj.name,
          password: obj.password,
          coords: obj.coords,
          interests: obj.interests,
          skills: obj.skills,
          imageurl: obj.imageURL,
          addedskill: '',
          addedinterest: '',
          addedphoto: '',
          password: 'jSg9aa33-dies@rjjsf'
        });
      });
    });
  }

  addSkill(skillname) {
    console.log('You are adding this skill:', skillname);

    typedskill.value = '';

    var _skills = this.state.skills;
    _skills.push(skillname);

    const data = { skills: _skills };

    console.log(data);
    var URL = 'http://localhost:5000/updateuser/' + this.props.userId;
    console.log(URL);

    fetch(URL, {
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
      .then(response => console.log('Success:', response))
      .then(this.setState({ skills: _skills }));
  }

  deleteSkill(skillname) {
    console.log('You deleted ', skillname);
    var skillset = this.state.skills.filter(e => e !== skillname);
    const data = { skills: skillset };

    fetch('http://localhost:5000/updateuser/' + this.props.userId, {
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
      .then(response => console.log('Success:', response))
      .then(this.setState({ skills: skillset }));
  }

  addInterest(interestname) {
    console.log('You are adding this interest:', interestname);

    typedinterest.value = '';

    var _i = this.state.interests;
    _i.push(interestname);

    const data = { interests: _i };

    console.log(data);
    var URL = 'http://localhost:5000/updateuser/' + this.props.userId;
    console.log(URL);

    fetch(URL, {
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
      .then(response => console.log('Success:', response))
      .then(this.setState({ interests: _i }));
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
    console.log('Show password');
  }

  handleChange() {
    console.log('Changes are not yet handled');
  }

  handleMouseDownPassword() {
    event.preventDefault();
  }

  renderTopbar() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  handlePhotoChange(event) {
    if (event.target.value) {
      this.setState({ addedphoto: event.target.value });
      console.log('New photo url:', event.target.value);

      this.setState({ imageurl: event.target.value });

      // TODO: files on backend?
      /* const data = { imageURL: event.target.value };

      console.log(data);
      var URL = 'http://localhost:5000/updateuser/' + this.props.userId;
      console.log(URL);

      fetch(URL, {
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
        .then(response => console.log('Success:', response))
        .then(this.setState({ imageurl: event.target.value }));*/
    }
  }

  handleNameChange() {
    namefield.value = '';
  }

  handleEmailChange() {
    emailfield.value = '';
  }

  handlePasswordChange() {
    password.value = '';
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
            <Avatar alt={this.state.name} src={this.state.imageurl} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <input
              accept="image/*"
              className={classes.input}
              id="button-file"
              multiple
              type="file"
              onChange={event => this.handlePhotoChange(event)}
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
                label="Name"
                id="namefield"
                defaultValue={this.state.name}
                className="container"
                value={this.state.name}
                onClick={() => this.handleNameChange()}
              />
              <TextField
                label="E-mail"
                id="emailfield"
                defaultValue={this.state.email}
                className="container"
                value={this.state.email}
                onClick={() => this.handleEmailChange()}
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
                // onChange={this.handleChange('password')}
                onClick={() => this.handlePasswordChange()}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword.bind(this)}
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

  deleteInterest(interestname) {
    console.log('You deleted ', interestname);
    var interestset = this.state.interests.filter(e => e !== interestname);
    const data = { interests: interestset };

    fetch('http://localhost:5000/updateuser/' + this.props.userId, {
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
      .then(response => console.log('Success:', response))
      .then(this.setState({ interests: interestset }));
  }

  renderSkill(skill) {
    const { classes } = this.props;
    return (
      <Chip
        label={skill}
        onClick={handleClick}
        onDelete={() => this.deleteSkill(skill)}
        className={classes.chip}
      />
    );
  }

  renderInterest(interest) {
    const { classes } = this.props;
    return (
      <Chip
        label={interest}
        onClick={handleClick}
        onDelete={() => this.deleteInterest(interest)}
        className={classes.chip}
      />
    );
  }

  renderUserSkills() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="title" gutterBottom>
          Skills
        </Typography>

        {this.state.skills.map(this.renderSkill.bind(this))}
        <br />

        <Input
          id="typedskill"
          placeholder="Add skill"
          className={classes.helptext}
          inputProps={{
            'aria-label': 'Description'
          }}
          onChange={event => this.setState({ addedskill: event.target.value })}
        />

        <Tooltip id="tooltip-fab" title="Add">
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={() => this.addSkill(this.state.addedskill)}
          >
            <AddIcon />
          </Button>
        </Tooltip>
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
        {this.state.interests.map(this.renderInterest.bind(this))}
        <br />
        <Input
          id="typedinterest"
          placeholder="Add interest"
          className={classes.helptext}
          inputProps={{
            'aria-label': 'Description'
          }}
          onChange={event =>
            this.setState({ addedinterest: event.target.value })
          }
        />

        <Tooltip id="tooltip-fab" title="Add">
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={() => this.addInterest(this.state.addedinterest)}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </Paper>
    );
  }

  renderApplicationPreferences() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography variant="title" gutterBottom>
          App settings [Coming soon]
        </Typography>
      </Paper>
    );
  }

  render() {
    return (
      <div>
        {this.renderTopbar()}

        <div id="settingscontainer">
          {this.renderUserSkills()}

          {this.renderUserInterests()}

          {this.renderUserSettings()}
          {this.renderApplicationPreferences()}
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
