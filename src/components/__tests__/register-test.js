import React from 'react';
import { Register, validate } from '../register';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';

describe('Register component tests', () =>{

  describe('When the page is not loading and user is not registered already', () =>{
    let wrapper;
    const mockHandleSubmit = jest.fn();
    beforeEach(() => {
      wrapper = shallow(<Register isLoading={false} error={null} isRegistered={false} handleSubmit={mockHandleSubmit} />);
    })
    it('should render the Register form', () => {
      const form = wrapper.find('form');
      expect(form.exists()).toBe(true);
      const fields = form.find(Field);
      expect(fields.at(0).prop('name')).toBe("username");
      expect(fields.at(1).prop('name')).toBe("password");
      expect(fields.at(2).prop('name')).toBe("repassword");
      expect(fields.at(3).prop('name')).toBe("email");
      expect(form.contains(<button type="submit" className="btn btn-primary">Submit</button>)).toBe(true);
    })
    it('should show the already have an account? and cancel buttons', () => {
      expect(wrapper.contains(<Link to="/" className="btn btn-danger">Cancel</Link>)).toBe(true);
      expect(wrapper.contains(<Link to="/login">Have an account already?</Link>)).toBe(true);
    })
  })

  describe('When the page is loading', () =>{
    let wrapper;
    const mockGetUserSessionFn = jest.fn();
    const mockHandleSubmit = jest.fn();
    beforeEach(() => {
      wrapper = shallow(<Register isLoading={true} error={null} getUserSession={mockGetUserSessionFn} handleSubmit={mockHandleSubmit} />);
    })
    it('should show the loading component', () => {
      expect(wrapper.contains(<div>Loading...</div>)).toBe(true);
    })
  })

  describe('When the page is not loading and user has registered', () =>{
    let wrapper;
    const mockGetUserSessionFn = jest.fn();
    const mockHandleSubmit = jest.fn();
    beforeEach(() => {
      wrapper = shallow(<Register isLoading={false} error={null} isRegistered={true} getUserSession={mockGetUserSessionFn} handleSubmit={mockHandleSubmit}/>);
    })
    it('should redirect to the index page', () => {
       expect(wrapper.contains(<Redirect to='/login'/>)).toBe(true);
    })
  })

  describe('When there is an error', () =>{
    let wrapper;
    const mockGetUserSessionFn = jest.fn();
    const mockHandleSubmit = jest.fn();
    const error = { response: { status: 432 } };
    beforeEach(() => {
      wrapper = shallow(<Register isLoading={false} error={error} getUserSession={mockGetUserSessionFn} handleSubmit={mockHandleSubmit} />);
    })
    it('should show the status code', () => {
      expect(wrapper.find('div.error').exists()).toBe(true);
    })
  })
})

describe('validate function tests', () => {
  it('testing all possible interactions', () =>{
    var values = {};
    for (var username in ['myuser', null]) {
      values.username = username;
      for (var password in ['mypass', null]) {
        values.password = password;
        for (var repassword in ['mypass', 'notmypass', null]) {
          values.repassword = repassword;
          for (var email in ['myemail', null]) {
            values.email = email;
            const errors = validate(values)
            expect(!!errors.username).toBe(!username);
            expect(!!errors.password).toBe(!password || password !== repassword);
            expect(!!errors.repassword).toBe(password && !repassword);
            expect(!!errors.email).toBe(!email);
          }
        }
      }
    }
  })
})
