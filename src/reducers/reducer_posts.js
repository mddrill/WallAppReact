import { POST_REQUEST_PENDING, POST_REQUEST_FAILED} from '../sagas';
import { POSTS_RECEIVED, POST_RECEIVED, POST_CREATED, POST_UPDATED, POST_DELETED } from '../sagas/posts_sagas';
import _ from 'lodash';

export default function(state = {}, action) {
  console.log(action)
  switch(action.type) {
    case POST_REQUEST_PENDING:
      return {
          posts: state.posts,
          post: state.post,
          isLoading: true,
          error: null
      };
    case POST_REQUEST_FAILED:
      return {
          posts: state.posts,
          post: state.post,
          isLoading: false,
          error: action.error
      };
    case POSTS_RECEIVED:
      return {
          posts: {...state.posts, ..._.mapKeys(action.response.data.results, 'id')},
          count: action.response.data.count,
          next: action.response.data.next,
          isLoading: false,
          error: null
      };
    case POST_RECEIVED:
      return {
          post: action.response.data,
          isLoading: false,
          error: null
      };
    case POST_CREATED:
      return {
          post: action.response.data,
          isLoading: false,
          wasCreated: true,
          error: null
      };
    case POST_UPDATED:
      return {
          post: action.response.data,
          isLoading: false,
          wasUpdated: true,
          error: null
      };
    case POST_DELETED:
      return {
          posts: _.omit(state.content, action.id),
          isLoading: false,
          wasDeleted: true,
          error: null
      };
    default:
      return state;
  }
}
