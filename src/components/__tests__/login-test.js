import React from 'react';
import { Login, validate } from '../login';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';

describe('Login component tests', () =>{

  describe('When the page is not loading and user is not logged in already', () =>{
    let wrapper;
    const mockGetUserSessionFn = jest.fn();
    const mockHandleSubmit = jest.fn();
    beforeEach(() => {
      wrapper = shallow(<Login isLoading={false} error={null} getUserSession={mockGetUserSessionFn} handleSubmit={mockHandleSubmit} />);
    })
    it('should call the getUserSession function', () => {
       expect(mockGetUserSessionFn.mock.calls.length).toBe(1);
    })
    it('should render the login form', () => {
      const form = wrapper.find('form');
      expect(form.exists()).toBe(true);
      const fields = form.find(Field);
      expect(fields.at(0).prop('name')).toBe("username");
      expect(fields.at(1).prop('name')).toBe("password");
      expect(form.contains(<button type="submit" className="btn btn-primary">Submit</button>)).toBe(true);
    })
    it('should show the already have an account? and cancel buttons', () => {
      expect(wrapper.contains(<Link to="/" className="btn btn-danger">Cancel</Link>)).toBe(true);
      expect(wrapper.contains(<Link to="/register">Dont have an account?</Link>)).toBe(true);
    })
  })

  describe('When the page is loading', () =>{
    let wrapper;
    const mockGetUserSessionFn = jest.fn();
    const mockHandleSubmit = jest.fn();
    beforeEach(() => {
      wrapper = shallow(<Login isLoading={true} error={null} getUserSession={mockGetUserSessionFn} handleSubmit={mockHandleSubmit} />);
    })
    it('should call the getUserSession function', () => {
       expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should show the loading component', () => {
      expect(wrapper.contains(<div>Loading...</div>)).toBe(true);
    })
  })

  describe('When the page is not loading and user is already logged in', () =>{
    let wrapper;
    const mockGetUserSessionFn = jest.fn();
    const mockHandleSubmit = jest.fn();
    const userSession = { username: "myuser", token: "mytoken"};
    beforeEach(() => {
      wrapper = shallow(<Login isLoading={false} error={null} userSession={userSession} getUserSession={mockGetUserSessionFn} handleSubmit={mockHandleSubmit} />);
    })
    it('should call the getUserSession function', () => {
       expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should redirect to the index page', () => {
       expect(wrapper.contains(<Redirect to='/'/>)).toBe(true);
    })
  })

  describe('When there is an error', () =>{
    let wrapper;
    const mockGetUserSessionFn = jest.fn();
    const mockHandleSubmit = jest.fn();
    const error = { response: { status: 432 } };
    beforeEach(() => {
      wrapper = shallow(<Login isLoading={false} error={error} getUserSession={mockGetUserSessionFn} handleSubmit={mockHandleSubmit} />);
    })
    it('should call the getUserSession function', () => {
       expect(mockGetUserSessionFn.mock.calls.length).toBe(1)
    })
    it('should show the status code', () => {
      expect(wrapper.find('div.error').exists()).toBe(true);
    })
  })
})

describe('validate function tests', () => {
  describe('when the user has entered a username, but no password', () => {
    const values = { username: "myuser" };
    it('should return a password error', () =>{
      expect(!!validate(values).username).toBe(false);
      expect(!!validate(values).password).toBe(true);
    })
  })
  describe('when the user has entered a password, but no username', () => {
    const values = { password: "mypass" };
    it('should return a usernam error', () =>{
       expect(!!validate(values).username).toBe(true);
       expect(!!validate(values).password).toBe(false);
    })
  })
  describe('when the user has not entered username or password', () => {
    const values = {};
    it('should return a password error and a username error', () =>{
      expect(!!validate(values).username).toBe(true);
      expect(!!validate(values).password).toBe(true);
    })
  })
  describe('when the user has entered both a username and password', () => {
    const values = { username: "myuser", password: "mypass" };
    it('should return no errors', () =>{
      expect(!!validate(values).username).toBe(false);
      expect(!!validate(values).password).toBe(false);
    })
  })
})
