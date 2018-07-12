import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { createPost } from '../actions/post_actions';
import { getUserSession } from '../actions/auth_actions';

export class PostsNew extends Component {
  componentDidMount() {
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
    this.props.createPost(values, this.props.userSession.token);
  }

  render(){
    const { handleSubmit, post, isLoading, wasCreated, error } = this.props;
    if (isLoading) {
      return <div>Loading...</div>;
    } else if (wasCreated) {
      return <Redirect to={`/posts/${post.id}`}/>;
    } else if (error) {
      return (
        <div className="error">
          <h3>Error getting posts</h3>
          <h2>Status code {error.response.status}</h2>
        </div>
      )
    } else {
      return (
        <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Post Content"
            name="text"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </div>
      );
    }
  }
}

export function validate(values) {
  const errors = {};

  if(!values.text) {
    errors.text = 'Enter some text'
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  return { ...state.posts, ...state.auth };
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(mapStateToProps, { getUserSession, createPost })(PostsNew)
);
