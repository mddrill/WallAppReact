import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { login, getUserSession } from '../actions/auth_actions'

export class Login extends Component {

  componentWillMount() {
    this.props.getUserSession();
  }

  renderField(field) {
    const { meta: { touched, error} } = field;
    const className=`form-group${touched && error ? ' has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error: ''}
        </div>
      </div>
    );
  }

  onSubmit(values){
    this.props.login(values);
  }

  render(){
    const { handleSubmit, userSession, isLoading, error } = this.props;
    if (userSession) {
      return <Redirect to='/'/>;
    } else if(isLoading) {
      return <div>Loading...</div>;
    } else if (error) {
      return (
        <div className="error">
          <h3>Error logging in</h3>
          <h2>Status code {error.response.status}</h2>
        </div>
      )
    } else {
      return (
        <div>
        <h3 className="login-header">Log In</h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Username"
            name="username"
            component={this.renderField}
          />
          <Field
            label="Password"
            name="password"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link to="/" className="btn btn-danger">Cancel</Link>
        <Link to="/register">Dont have an account?</Link>
        </div>
      );
    }
  }
}

export function validate(values) {
  const errors = {};

  // Validate the inputs from 'values' object
  if(!values.username){
    errors.username = 'Enter a username';
  }
  if(!values.password) {
    errors.password = 'Enter a password'
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  return { ...state.auth };
}

export default reduxForm({
  validate,
  form: 'LoginForm'
})(
  connect(mapStateToProps, { login, getUserSession })(Login)
);
