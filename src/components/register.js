import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../actions/auth_actions'

export class Register extends Component {
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
    this.props.register(values);
  }

  render(){
    const { handleSubmit, isRegistered, isLoading, error } = this.props;

    if (isRegistered) {
      return <Redirect to='/login'/>;
    } else if(isLoading) {
      return <div>Loading...</div>;
    } else if (error) {
      return (
        <div className="error">
          <h3>Error registering</h3>
          <h2>Status code {error.response.status}</h2>
        </div>
      )
    } else {
      return (
        <div>
        <h3>Register New User</h3>
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
          <Field
            label="Verify Password"
            name="repassword"
            component={this.renderField}
          />
          <Field
            label="Email"
            name="email"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link to="/" className="btn btn-danger">Cancel</Link>
        <Link to="/login">Have an account already?</Link>
        </div>
      );
    }
  }
}

export function validate(values) {
  const errors = {};

  if(!values.username){
    errors.username = 'Enter a username';
  }
  if(!values.password) {
    errors.password = 'Enter a password'
  } else if(!values.repassword) {
    errors.repassword = 'Enter password again'
  } else if(values.password !== values.repassword) {
    errors.password = 'Passwords do not match'
  }
  if(!values.email) {
    errors.email = 'Enter an email'
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  return { ...state.auth};
}

export default reduxForm({
  validate,
  form: 'RegisterForm'
})(
  connect(mapStateToProps, { register })(Register)
);
