import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import rootReducer from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import PostsUpdate from './components/post_update';
import Login from './components/login';
import Register from './components/register';
import { isLoggedIn } from './auth/user_session';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" render={() => (isLoggedIn() ? <PostsNew/> : <Redirect to="/login"/>)}/>
          <Route path="/posts/:id/update" render={({ match, location }) => (isLoggedIn() ? <PostsUpdate key='postupdate' location={location} match={match}/> : <Redirect to='/login'/>)}/>
          <Route path="/posts/:id" component={PostsShow}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/" component={PostsIndex}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
