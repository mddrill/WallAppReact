import { call, put, takeEvery } from 'redux-saga/effects'
import { fetch, get, create, update, destroy  } from '../api';
import { FETCH_POSTS, FETCH_POST, CREATE_POST, UPDATE_POST, DELETE_POST } from '../actions/post_actions';
import { POST_REQUEST_PENDING, POST_REQUEST_FAILED } from './index';

export const POSTS_RECEIVED = 'POSTS_RECEIVED'
export const POST_RECEIVED = 'POST_RECEIVED';
export const POST_CREATED = 'POST_CREATED';
export const POST_UPDATED = 'POST_UPDATED';
export const POST_DELETED = 'POST_DELETED';

export function* fetchPosts(action) {
  const { page } = action;
  yield put({ type: POST_REQUEST_PENDING })
  const { response, error} = yield call(fetch, 'post', page);
  if (response && !error)
    yield put({ type: POSTS_RECEIVED, response })
  else
    yield put({ type: POST_REQUEST_FAILED, error })
}

export function* watchFetchPosts() {
  yield takeEvery(FETCH_POSTS, fetchPosts);
}

export function* fetchPost(action) {
  const { id } = action;
  yield put({ type: POST_REQUEST_PENDING })
  const { response, error} = yield call(get, 'post', id);
  if (response && !error)
    yield put({ type: POST_RECEIVED, response })
  else
    yield put({ type: POST_REQUEST_FAILED, error })
}

export function* watchFetchPost() {
  yield takeEvery(FETCH_POST, fetchPost);
}

export function* createPost(action) {
  const { params, token } = action;
  yield put({ type: POST_REQUEST_PENDING })
  const { response, error} = yield call(create, 'post', params, token);
  if (response && !error)
    yield put({ type: POST_CREATED, response })
  else
    yield put({ type: POST_REQUEST_FAILED, error })
}

export function* watchCreatePost() {
  yield takeEvery(CREATE_POST, createPost);
}

export function* updatePost(action) {
  const { id, params, token } = action;
  yield put({ type: POST_REQUEST_PENDING })
  const { response, error} = yield call(update, 'post', id, params, token);
  if (response && !error)
    yield put({ type: POST_UPDATED, response })
  else
    yield put({ type: POST_REQUEST_FAILED, error })
}

export function* watchUpdatePost() {
  yield takeEvery(UPDATE_POST, updatePost);
}

export function* deletePost(action) {
  const { id, token } = action;
  yield put({ type: POST_REQUEST_PENDING })
  const { response, error} = yield call(destroy, 'post', id, token);
  if (response && !error)
    yield put({ type: POST_DELETED, id })
  else
    yield put({ type: POST_REQUEST_FAILED, error })
}

export function* watchDeletePost() {
  yield takeEvery(DELETE_POST, deletePost);
}
