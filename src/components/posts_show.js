import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/post_actions';
import { getUserSession } from '../actions/auth_actions';
import { Link, Redirect } from 'react-router-dom';

export class PostsShow extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
    this.props.getUserSession();
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id);
  }

  render() {
    const { post, isLoading, wasDeleted, error, userSession } = this.props;
    if (wasDeleted) {
      return <Redirect to='/'/>;
    } else if (error) {
      return (
        <div className="error">
          <h3>Error getting post</h3>
          <h2>Status code {error.response.status}</h2>
        </div>
      )
    } else if(!post || isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        <Link to="/">Back to index</Link>
        <p>{post.text}</p>
        <p>{post.author}</p>
        {userSession && userSession.username === post.author ? <div><button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <Link to={{ pathname: `/posts/${post.id}/update`, state: post}}>Update Post</Link> </div>: ""
        }
        </div>
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  return { ...state.posts, ...state.auth };
}

export default connect(mapStateToProps, { getUserSession, fetchPost, deletePost })(PostsShow);
