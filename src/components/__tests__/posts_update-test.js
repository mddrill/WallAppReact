import React from 'react';
import { PostsUpdate, validate } from '../post_update';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';

describe('PostsUpdate component tests', () =>{

  describe('When the page is not loading and not post has not been updated yet', () => {
    let wrapper;
    const mockGetUserSessionFn = jest.fn();
    const mockHandleSubmit = jest.fn();
    const id = 2;
    beforeEach(() => {
      wrapper = shallow(<PostsUpdate isLoading={false} error={null} getUserSession={mockGetUserSessionFn} handleSubmit={mockHandleSubmit} match={{params: {id}}}/>);
    })
    it('should call the getUserSession function', () => {
       expect(mockGetUserSessionFn.mock.calls.length).toBe(1);
    })
    it('should render the update post form', () => {
      const form = wrapper.find('form');
      expect(form.exists()).toBe(true);
      expect(form.find(Field).prop('name')).toBe("text");
      expect(form.contains(<button type="submit" className="btn btn-primary">Submit</button>)).toBe(true);
    })
    it('should show the cancel button', () => {
      expect(wrapper.contains(<Link to={`/posts/${id}`} className="btn btn-danger">Cancel</Link>)).toBe(true);
    })
  })

  describe('When the page is loading', () =>{
    let wrapper;
    const mockGetUserSessionFn = jest.fn();
    const mockHandleSubmit = jest.fn();
    const id = 2;
    beforeEach(() => {
      wrapper = shallow(<PostsUpdate isLoading={true} error={null} getUserSession={mockGetUserSessionFn} handleSubmit={mockHandleSubmit} match={{params: {id}}}/>);
    })
    it('should call the getUserSession function', () => {
       expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should show the loading component', () => {
      expect(wrapper.contains(<div>Loading...</div>)).toBe(true);
    })
  })

  describe('When there is an error', () =>{
    let wrapper;
    const mockGetUserSessionFn = jest.fn();
    const mockHandleSubmit = jest.fn();
    const error = { response: { status: 432 } };
    const id = 2;
    beforeEach(() => {
      wrapper = shallow(<PostsUpdate isLoading={false} error={error} getUserSession={mockGetUserSessionFn} handleSubmit={mockHandleSubmit} match={{params: {id}}}/>);
    })
    it('should call the getUserSession function', () => {
       expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should show the status code', () => {
      expect(wrapper.find('div.error').exists()).toBe(true);
    })
  })

  describe('When the post has been created', () => {
    let wrapper;
    const mockGetUserSessionFn = jest.fn();
    const mockHandleSubmit = jest.fn();
    const post = { id: 2, author: "yato", posted_at: "2018-03-10T21:45:01.212160Z", text: "text1" };
    beforeEach(() => {
      wrapper = shallow(<PostsUpdate isLoading={false} wasUpdated={true} post={post} error={null} getUserSession={mockGetUserSessionFn} handleSubmit={mockHandleSubmit} match={{params: {id: post.id}}}/>);
    })
    it('should call the getUserSession function', () => {
       expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should redirect to the index page', () => {
       expect(wrapper.contains(<Redirect to={`/posts/${post.id}`}/>)).toBe(true);
    })
  })
})

describe('validate function tests', () => {
  it('should show an error if and only if there is no text', () =>{
    expect(!!validate({text: "mytext"}).text).toBe(false);
    expect(!!validate({}).text).toBe(true);
  })
})
