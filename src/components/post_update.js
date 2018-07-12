import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { updatePost } from '../actions/post_actions';
import { getUserSession } from '../actions/auth_actions';

export class PostsUpdate extends Component {

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
          placeholder="text"
          key='textinput'
          {...field.input}
        />
        <div className="text-help">
          {touched ? error: ''}
        </div>
      </div>
    );
  }

  onSubmit(values){
    const { id } = this.props.match.params;
    this.props.updatePost(id, {'text': values.text}, this.props.userSession.token);
  }

  render(){
    const { handleSubmit, post, wasUpdated, error, isLoading } = this.props;
    const { id } = this.props.match.params;

    if (isLoading) {
      return <div>Loading...</div>;
    } else if (wasUpdated) {
      return <Redirect to={`/posts/${post.id}`}/>;
    } else if (error) {
      return (
        <div className="error">
          <h3>Error updating post</h3>
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
        <Link to={`/posts/${id}`} className="btn btn-danger">Cancel</Link>
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
  return { ...state.posts, initialValues: { text: ownProps.location.state.text}, post: ownProps.location.state , ...state.auth };
}


export default connect(mapStateToProps, { getUserSession, updatePost })(reduxForm({
  validate,
  form: 'PostsUpdateForm'
})(PostsUpdate));
