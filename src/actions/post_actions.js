export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'creat_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';
export const UPDATE_POST = 'update_post';

export function fetchPosts(page) {
  return {
    type: FETCH_POSTS,
    page
  };
}

export function createPost(params) {
  return {
    type: CREATE_POST,
    params
  };
}

export function fetchPost(id){
  return {
      type: FETCH_POST,
      id
  };
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  };
}

export function updatePost(id, params) {
  return {
    type: UPDATE_POST,
    id,
    params
  };
}
