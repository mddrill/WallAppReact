import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  form: formReducer
});

export default rootReducer;
