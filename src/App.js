import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Paper from '@material-ui/core/Paper';
import StepContent from '@material-ui/core/StepContent';

//Radio
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
//Other
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
  status: {
    danger: 'orange',
  },
});
const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  root: {
    padding: '10%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  box: {
    marginLeft: '20px',
  },
});

function getSteps() {
  return ['Type of Job', 'Payment method', 'Zip Code', 'Pick a date', 'Finalize'];
}

  function getStepContent(step) {
    switch (step) {
      case 0:
        return `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`;
      case 1:
        return 'An ad group contains one or more ads which target a shared set of keywords.';
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return 'Unknown step';
    }
  }
  
  class VerticalLinearStepper extends React.Component {
    state = {
      activeStep: 0,
    };
  
    handleNext = () => {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    };
  
    handleBack = () => {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
      }));
    };
  
    handleReset = () => {
      this.setState({
        activeStep: 0,
      });
    };
  
    render() {
      const { classes } = this.props;
      const steps = getSteps();
      const { activeStep } = this.state;
  
      return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>All steps completed - you&quot;re finished</Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      </MuiThemeProvider>
      );
    }
  }
  
  VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
  };
  
  export default withStyles(styles)(VerticalLinearStepper);