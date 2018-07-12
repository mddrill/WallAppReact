import React from 'react';
import { PostsIndex } from '../posts_index'
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

describe('Posts Index Component', () => {

  describe('When the posts index page has posts, is not loading, has no errors, and the user is logged in', () => {
    let wrapper;
    const mockFetchPostsFn = jest.fn();
    const mockGetUserSessionFn = jest.fn();
    const mockLogout = jest.fn();
    const userSession = { username: "myuser", token: "mytoken"};
    const posts = {
            2: { id: 2, author: "yato", posted_at: "2018-03-10T21:45:01.212160Z", text: "text1" },
            4: { id: 4, author: "trunks", posted_at: "2018-03-10T21:45:01.214224Z", text: "text3" },
            5: { id: 5, author: "light", posted_at: "2018-03-10T21:45:01.215239Z", text: "text4" }
          }
    beforeEach(() => {
      wrapper = shallow(<PostsIndex isLoading={false} error={null} posts={posts} userSession={userSession}
                                    getUserSession={mockGetUserSessionFn} fetchPosts={mockFetchPostsFn} logout={mockLogout}/>);
    })
    it('should call the mock fetchPosts and getUserSession functions', () => {
      expect(mockFetchPostsFn.mock.calls.length).toBe(1)
      expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should render the posts', () => {
      let postsActual = wrapper.find('ul.list-group').find(Link);
      let postKeys = Object.keys(posts);
      expect(postsActual.length).toBe(postKeys.length);
      for (var i = 0; i < postKeys.length; i++){
        expect(postsActual.at(i).prop('to')).toBe(`/posts/${postKeys[i]}`);
        expect(shallow(<div>{postsActual.at(i).prop('children')}</div>).text()).toBe(posts[postKeys[i]].text);
      }
    })
    it('should say hello to the user and show the log out button', () => {
      expect(wrapper.find('h2').text()).toBe(`Hello ${userSession.username}`);
      expect(wrapper.contains(
        <button className="btn btn-danger pull-xs-right" onClick={mockLogout}>
          Log out
        </button>)).toBe(true);
    })
    it('should show the add a post button', () => {
      expect(wrapper.contains(
        <Link className="btn btn-primary" to="/posts/new">
          Add a Post
        </Link>)).toBe(true);
    })
  })

  describe('When the posts index page has posts, is not loading, has no errors, and the user is not logged in', () => {
    let wrapper;
    const mockFetchPostsFn = jest.fn();
    const mockGetUserSessionFn = jest.fn();
    const mockLogout = jest.fn();
    const posts = {
            2: { id: 2, author: "yato", posted_at: "2018-03-10T21:45:01.212160Z", text: "text1" },
            4: { id: 4, author: "trunks", posted_at: "2018-03-10T21:45:01.214224Z", text: "text3" },
            5: { id: 5, author: "light", posted_at: "2018-03-10T21:45:01.215239Z", text: "text4" }
          }
    beforeEach(() => {
      wrapper = shallow(<PostsIndex isLoading={false} error={null} posts={posts}
                                    getUserSession={mockGetUserSessionFn} fetchPosts={mockFetchPostsFn} logout={mockLogout}/>);
    })
    it('should call the mock fetchPosts and getUserSession functions', () => {
      expect(mockFetchPostsFn.mock.calls.length).toBe(1)
      expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should render the posts', () => {
      let postsActual = wrapper.find('ul.list-group').find(Link);
      let postKeys = Object.keys(posts);
      expect(postsActual.length).toBe(postKeys.length);
      for (var i = 0; i < postKeys.length; i++){
        expect(postsActual.at(i).prop('to')).toBe(`/posts/${postKeys[i]}`);
        expect(shallow(<div>{postsActual.at(i).prop('children')}</div>).text()).toBe(posts[postKeys[i]].text);
      }
    })
    it('should show the login and register buttons', () => {
      expect(wrapper.contains(
        <Link className="btn btn-primary" to="/login">
          Log in
        </Link>)).toBe(true);
      expect(wrapper.contains(
        <Link className="btn btn-danger" to="/register">
          Register
        </Link>)).toBe(true);
    })
    it('should show the add a post button', () => {
      expect(wrapper.contains(
        <Link className="btn btn-primary" to="/posts/new">
          Add a Post
        </Link>)).toBe(true);
    })
  })

  describe('When the posts index page is loading and the user is logged in', () => {
    let wrapper;
    const mockFetchPostsFn = jest.fn();
    const mockGetUserSessionFn = jest.fn();
    const mockLogout = jest.fn();
    const userSession = { username: "myuser", token: "mytoken"};
    beforeEach(() => {
      wrapper = shallow(<PostsIndex isLoading={true} error={null} userSession={userSession}
                                    getUserSession={mockGetUserSessionFn} fetchPosts={mockFetchPostsFn} logout={mockLogout}/>);
    })
    it('should call the mock fetchPosts and getUserSession functions', () => {
      expect(mockFetchPostsFn.mock.calls.length).toBe(1)
      expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should show loading component', () => {
      expect(wrapper.exists('p.loading')).toBe(true);
    })
    it('should say hello to the user and show the log out button', () => {
      expect(wrapper.find('h2').text()).toBe(`Hello ${userSession.username}`);
      expect(wrapper.contains(
        <button className="btn btn-danger pull-xs-right" onClick={mockLogout}>
          Log out
        </button>)).toBe(true);
    })
    it('should not show the add a post button', () => {
      expect(wrapper.contains(
        <Link className="btn btn-primary" to="/posts/new">
          Add a Post
        </Link>)).toBe(false);
    })
  })

  describe('When the posts index page is loading and the user is not logged in', () => {
    let wrapper;
    const mockFetchPostsFn = jest.fn();
    const mockGetUserSessionFn = jest.fn();
    const mockLogout = jest.fn();
    beforeEach(() => {
      wrapper = shallow(<PostsIndex isLoading={true} error={null} 
                                    getUserSession={mockGetUserSessionFn} fetchPosts={mockFetchPostsFn} logout={mockLogout}/>);
    })
    it('should call the mock fetchPosts and getUserSession functions', () => {
      expect(mockFetchPostsFn.mock.calls.length).toBe(1)
      expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should show loading component', () => {
      expect(wrapper.exists('p.loading')).toBe(true);
    })
    it('should show the login and register buttons', () => {
      expect(wrapper.contains(
        <Link className="btn btn-primary" to="/login">
          Log in
        </Link>)).toBe(true);
      expect(wrapper.contains(
        <Link className="btn btn-danger" to="/register">
          Register
        </Link>)).toBe(true);
    })
    it('should not show the add a post button', () => {
      expect(wrapper.contains(
        <Link className="btn btn-primary" to="/posts/new">
          Add a Post
        </Link>)).toBe(false);
    })
  })
  describe('When there is an error getting the posts', () => {
    let wrapper;
    const mockFetchPostsFn = jest.fn();
    const mockGetUserSessionFn = jest.fn();
    const mockLogout = jest.fn();
    const error = { response: { status: 432 } };
    beforeEach(() => {
      wrapper = shallow(<PostsIndex isLoading={false} error={error} getUserSession={mockGetUserSessionFn} fetchPosts={mockFetchPostsFn} logout={mockLogout}/>);
    })
    it('should call the mock fetchPosts and getUserSession functions', () => {
      expect(mockFetchPostsFn.mock.calls.length).toBe(1)
      expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should show the status code', () => {
      expect(wrapper.contains(
        <div>
          <h3>Error getting posts</h3>
          <h2>Status code {error.response.status}</h2>
        </div>)).toBe(true);
    })
  })
})
