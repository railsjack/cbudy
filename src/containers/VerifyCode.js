import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { resendCode, verifyCode } from '../actions/member';
import { Actions } from 'react-native-router-flux';

class VerifyCode extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  };

  state = {
    error: null,
    success: null,
    loading: false,
  };

  onFormSubmit = (data) => {

    const { onFormSubmit } = this.props;

    this.setState({ loading: true });

    return onFormSubmit(data)
      .then(() => {
        this.setState({
          loading: false,
          success: 'Success - Verified',
          error: null,
        });
        setTimeout(() => {
          Actions.verifyCode();
        });
      })
      .catch(err => this.setState({
        loading: false,
        success: null,
        error: err,
      }));
  };

  onResendCode = (data) => {

    const { onResendCode } = this.props;

    this.setState({ loading: true });

    return onResendCode(data)
      .then(() => {
        this.setState({
          loading: false,
          success: 'Success - Resent',
          error: null,
        });
      })
      .catch(err => this.setState({
        loading: false,
        success: null,
        error: err,
      }));
  };

  render = () => {
    const { member, Layout } = this.props;
    const { error, loading, success } = this.state;

    return (
      <Layout
        error={error}
        member={member}
        loading={loading}
        success={success}
        onResendCode={this.onResendCode}
        onFormSubmit={this.onFormSubmit}
      />
    );
  };
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  onFormSubmit: verifyCode,
  onResendCode: resendCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCode);
