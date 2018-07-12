import { AUTH_REQUEST_PENDING, AUTH_REQUEST_FAILED} from '../sagas';
import { LOGIN_COMPLETED, REGISTER_COMPLETED, USER_SESSION_RETRIEVED, NOT_LOGGED_IN, LOGOUT_COMPLETED } from '../sagas/auth_sagas';

export default function(state = {}, action) {
  console.log(action)
  switch(action.type) {
    case AUTH_REQUEST_PENDING:
      return {
          content: null,
          isLoading: true,
          error: null
      };
    case AUTH_REQUEST_FAILED:
      return {
          content: null,
          isLoading: false,
          error: action.error
      };
    case LOGIN_COMPLETED:
      return {
          userSession: action.userSession,
          isLoading: false,
          error: null
      };
    case REGISTER_COMPLETED:
      return {
          isRegistered: true,
          isLoading: false,
          error: null
      };
    case USER_SESSION_RETRIEVED:
      return {
          userSession: action.userSession,
          isLoading: false,
          error: null
      };
    case NOT_LOGGED_IN:
      return {
          isLoading: false,
          error: null
      };
    case LOGOUT_COMPLETED:
      return {
          isLoading: false,
          error: null
      };
    default:
      return state;
  }
}
