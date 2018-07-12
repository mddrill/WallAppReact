import { call, put, takeEvery } from 'redux-saga/effects'
import { fetch, get, create, update, destroy  } from '../api';
import { LOGIN, REGISTER, GET_USER_SESSION, LOGOUT } from '../actions/auth_actions';
import { AUTH_REQUEST_PENDING, AUTH_REQUEST_FAILED } from './index';
import { getCurrentUserSession, isLoggedIn , startNewUserSession, closeUserSession } from '../auth/user_session';

export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';
export const REGISTER_COMPLETED = 'REGISTER_COMPLETED';
export const USER_SESSION_RETRIEVED = 'USER_SESSION_RETRIEVED';
export const NOT_LOGGED_IN = 'NOT_LOGGED_IN';
export const LOGOUT_COMPLETED = 'LOGOUT_COMPLETED';

export function* login(action) {
  const { values } = action;
  yield put({ type: AUTH_REQUEST_PENDING })
  const { response, error} = yield call(create, 'api-token-auth', values);
  if (response && !error) {
    const userSession = startNewUserSession(response.data.token, values.username);
    yield put({ type: LOGIN_COMPLETED, userSession })
  } else {
    yield put({ type: AUTH_REQUEST_FAILED, error })
  }
}

export function* watchLogin() {
  yield takeEvery(LOGIN, login);
}

export function* register(action) {
  const { values } = action;
  yield put({ type: AUTH_REQUEST_PENDING })
  const { response, error} = yield call(create, 'accounts', values);
  if (response && !error)
    yield put({ type: REGISTER_COMPLETED, response })
  else
    yield put({ type: AUTH_REQUEST_FAILED, error })
}

export function* watchRegister() {
  yield takeEvery(REGISTER, register);
}

export function* getUserSession() {
  if (isLoggedIn()) {
    const userSession = getCurrentUserSession();
    yield put({ type: USER_SESSION_RETRIEVED, userSession })
  } else {
    yield put({ type: NOT_LOGGED_IN })
  }
}

export function* watchGetUserSession() {
  yield takeEvery(GET_USER_SESSION, getUserSession);
}

export function* logout() {
  closeUserSession();
  yield put({ type: LOGOUT_COMPLETED })
}

export function* watchLogout() {
  yield takeEvery(LOGOUT, logout);
}
