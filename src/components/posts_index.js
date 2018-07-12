import React, { Component } from 'react';
import { fetchPosts } from '../actions/post_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserSession, logout } from '../actions/auth_actions';
import _ from 'lodash';

export class PostsIndex extends Component {

  componentDidMount() {
    this.props.fetchPosts();
    this.props.getUserSession();
  }

  onListScroll() {
    if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight - 20 && !this.props.isLoading){
      if (Object.keys(this.props.posts).length < this.props.count){
        const page = Math.floor(Object.keys(this.props.posts).length / 10) + 1;
        this.props.fetchPosts(page);
      }
    }
  }

  renderPosts() {
    return _.map(this.props.posts, (post) => {
      return(
        <li className="list-group-item" key={post.id}>
        <Link to={`/posts/${post.id}`}>
          {post.text}
        </Link>
      </li>
      )
    })
  }

  render() {
    console.log(this.props)
    const { isLoading, error, count, userSession } = this.props;
    if (error) {
      return (
        <div>
          <h3>Error getting posts</h3>
          <h2>Status code {error.response.status}</h2>
        </div>
      )
    } else {
      return (
        <div>
          {userSession ?
            <div>
              <h2>Hello {userSession.username}</h2>
              <button className="btn btn-danger pull-xs-right" onClick={this.props.logout}>
                Log out
              </button>
            </div>
            :
            <div className="text-xs-right">
              <Link className="btn btn-primary" to="/login">
                Log in
              </Link>
              <Link className="btn btn-danger" to="/register">
                Register
              </Link>
            </div>
          }
          { isLoading ? <p className="loading"> loading items..</p> :
            <div>
              <div className="text-xs-right">
                <Link className="btn btn-primary" to="/posts/new">
                  Add a Post
                </Link>
              </div>
              <h3>Posts</h3>
              <div ref="iScroll" onScroll={this.onListScroll.bind(this)} style={{ height: "400px", overflow: "auto" }}>
                <ul className="list-group">
                  {this.renderPosts()}
                </ul>
              </div>
            </div>
          }
        </div>
      );
    }
  }
}

function mapStateToProps({ posts, auth }){
  return { ...posts, ...auth }
}

export default connect(mapStateToProps, { logout, getUserSession, fetchPosts })(PostsIndex);
