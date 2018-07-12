import { watchFetchPosts, watchFetchPost, watchUpdatePost, watchCreatePost, watchDeletePost } from './posts_sagas';
import { watchLogin, watchRegister } from './auth_sagas';

export const AUTH_REQUEST_PENDING = 'AUTH_REQUEST_PENDING';
export const AUTH_REQUEST_FAILED = 'AUTH_REQUEST_FAILED';
export const POST_REQUEST_PENDING = 'POST_REQUEST_PENDING';
export const POST_REQUEST_FAILED = 'POST_REQUEST_FAILED';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    watchFetchPosts(),
    watchFetchPost(),
    watchCreatePost(),
    watchUpdatePost(),
    watchDeletePost(),
    watchLogin(),
    watchRegister(),
    watchLogout(),
    watchGetUserSession()
  ]
}
