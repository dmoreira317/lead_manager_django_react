import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      //   alert.error("There is an error!");
      if (error.msg.name) {
        //join() makes the array that's inside the name prop, to beocme a string
        alert.error(`Name: ${error.msg.name.join()}`);
      }
      if (error.msg.email) {
        alert.error(`Email: ${error.msg.email.join()}`);
      }
      if (error.msg.message) {
        alert.error(`Message: ${error.msg.message.join()}`);
      }
      if (error.msg.non_field_errors) {
        alert.error(error.msg.non_field_errors.join());
      }
    }
    if (message !== prevProps.messages) {
      if (message.leadDeleted) alert.success(message.leadDeleted);
      if (message.leadAdded) alert.success(message.leadAdded);
    }
  }
  render() {
    return <Fragment />;
  }
}

//Any errors that are on the state of my errors reducer, now will be passed as a prop
const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
