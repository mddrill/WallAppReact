import React from 'react';
import { PostsShow } from '../posts_show'
import { shallow } from 'enzyme';
import { Link, Redirect } from 'react-router-dom';

describe('Posts New Component', () => {

  describe('When the posts show page has posts, is not loading, has no errors, and the user is logged in', () => {
    let wrapper;
    const mockFetchPostFn = jest.fn();
    const mockGetUserSessionFn = jest.fn();
    const userSession = { username: "myuser", token: "mytoken"};
    const post = { id: 4, author: "myuser", posted_at: "2018-03-10T21:45:01.214224Z", text: "text3" };

    beforeEach(() => {
      wrapper = shallow(<PostsShow isLoading={false} error={null} post={post} userSession={userSession}
                                    getUserSession={mockGetUserSessionFn} fetchPost={mockFetchPostFn} match={{params: {id: post.id}}} />);
    })
    it('should call the mock fetchPosts and getUserSession functions', () => {
      expect(mockFetchPostFn.mock.calls.length).toBe(1)
      expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should render the post', () => {
      expect(wrapper.contains(<Link to="/">Back to index</Link>)).toBe(true);
      expect(wrapper.contains(<p>{post.text}</p>)).toBe(true);
      expect(wrapper.contains(<p>{post.author}</p>)).toBe(true);
    })

    describe('if theyre viewing their own post', () => {
      const userSession = { username: "myuser", token: "mytoken"};
      const posts = { id: 4, author: "myuser", posted_at: "2018-03-10T21:45:01.214224Z", text: "text3" };
      const mockDeletePostFn = jest.fn();
      beforeEach(() => {
        wrapper = shallow(<PostsShow isLoading={false} error={null} post={post} userSession={userSession} match={{params: {id: post.id}}}
                                      getUserSession={mockGetUserSessionFn} fetchPost={mockFetchPostFn}  deletePost={mockDeletePostFn}/>);
      })
      it('should show the update and delete buttons', () => {
        const deleteButton = wrapper.find('button');
        expect(deleteButton.exists()).toBe(true);
        deleteButton.simulate('click');
        expect(mockDeletePostFn.mock.calls.length).toBe(1);
        expect(wrapper.contains(<Link to={{ pathname: `/posts/${post.id}/update`, state: post}}>Update Post</Link>)).toBe(true);
      })
    })

    describe('if theyre viewing someone elses post', () => {
      const userSession = { username: "myuser", token: "mytoken"};
      const post = { id: 4, author: "notmyuser", posted_at: "2018-03-10T21:45:01.214224Z", text: "text3" };
      const mockDeletePostFn = jest.fn();
      beforeEach(() => {
        wrapper = shallow(<PostsShow isLoading={false} error={null} post={post} userSession={userSession} deletePost={mockDeletePostFn}
                                      getUserSession={mockGetUserSessionFn} fetchPost={mockFetchPostFn} match={{params: {id: post.id}}}/>);
      })
      it('should not show the update or delete buttons', () => {
        expect(wrapper.find('button').exists()).toBe(false);
        expect(mockDeletePostFn.mock.calls.length).toBe(0);
        expect(wrapper.contains(<Link to={{ pathname: `/posts/${post.id}/update`, state: post}}>Update Post</Link>)).toBe(false);
      })
    })

  })

  describe('When the page is not loading, has no errors, and the user is not logged in', () => {
    let wrapper;
    const mockFetchPostFn = jest.fn();
    const mockGetUserSessionFn = jest.fn();
    const mockDeletePostFn = jest.fn();
    const post = { id: 4, author: "trunks", posted_at: "2018-03-10T21:45:01.214224Z", text: "text3" };
    beforeEach(() => {
      wrapper = shallow(<PostsShow isLoading={false} error={null} post={post} deletePost={mockDeletePostFn}
                                    getUserSession={mockGetUserSessionFn} fetchPost={mockFetchPostFn} match={{params: {id: post.id}}} />);
    })
    it('should call the mock fetchPosts and getUserSession functions', () => {
      expect(mockFetchPostFn.mock.calls.length).toBe(1)
      expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should render the post', () => {
      expect(wrapper.contains(<Link to="/">Back to index</Link>)).toBe(true);
      expect(wrapper.contains(<p>{post.text}</p>)).toBe(true);
      expect(wrapper.contains(<p>{post.author}</p>)).toBe(true);
    })
    it('should not show the update or delete buttons', () => {
      expect(wrapper.find('button.delete-button').exists()).toBe(false);
      expect(mockDeletePostFn.mock.calls.length).toBe(0);
      expect(wrapper.contains(<Link to={{ pathname: `/posts/${post.id}/update`, state: post}}>Update Post</Link>)).toBe(false);
    })
  })

  describe('When the page is loading', () => {
    let wrapper;
    const mockFetchPostFn = jest.fn();
    const mockGetUserSessionFn = jest.fn();
    const mockLogout = jest.fn();
    const userSession = { username: "myuser", token: "mytoken"};
    beforeEach(() => {
      wrapper = shallow(<PostsShow isLoading={true} error={null} userSession={userSession}
                                    getUserSession={mockGetUserSessionFn} fetchPost={mockFetchPostFn} match={{params: {id: 2}}} />);
    })
    it('should call the mock fetchPosts and getUserSession functions', () => {
      expect(mockFetchPostFn.mock.calls.length).toBe(1)
      expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should show the loading component', () => {
      expect(wrapper.contains(<div>Loading...</div>)).toBe(true);
    })
  })

  describe('When there is an error getting the post', () => {
    let wrapper;
    const mockFetchPostFn = jest.fn();
    const mockGetUserSessionFn = jest.fn();
    const mockLogout = jest.fn();
    const error = { response: { status: 432 } };
    beforeEach(() => {
      wrapper = shallow(<PostsShow isLoading={false} error={error} getUserSession={mockGetUserSessionFn} fetchPost={mockFetchPostFn} match={{params: {id: 2}}}/>);
    })
    it('should call the mock fetchPosts and getUserSession functions', () => {
      expect(mockFetchPostFn.mock.calls.length).toBe(1)
      expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should show the status code', () => {
      expect(wrapper.find('div.error').exists()).toBe(true);
    })
  })

  describe('If this post was deleted', () => {
    let wrapper;
    const mockFetchPostFn = jest.fn();
    const mockGetUserSessionFn = jest.fn();
    const mockLogout = jest.fn();
    beforeEach(() => {
      wrapper = shallow(<PostsShow isLoading={false} error={null} wasDeleted={true} getUserSession={mockGetUserSessionFn} fetchPost={mockFetchPostFn} match={{params: {id: 2}}}/>);
    })
    it('should call the mock fetchPosts and getUserSession functions', () => {
      expect(mockFetchPostFn.mock.calls.length).toBe(1);
      expect(mockGetUserSessionFn.mock.calls.length).toBe(1);
    })
    it('should redirect to the index page', () => {
      expect(wrapper.contains(<Redirect to='/'/>)).toBe(true);
    })
  })
})
