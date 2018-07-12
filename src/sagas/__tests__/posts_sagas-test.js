import { fetchPosts, fetchPost, createPost, updatePost, deletePost } from '../posts_sagas';

describe('test the posts sagas', () => {
  describe('when the fetchPosts saga gets a response', () => {
    it('should return POSTS_RECEIVED with the response', () => {
      jest.mock('../../api', () => {
        fetch: () => ({ response: {}})
      });
      fetchPosts();
    })
  })
  describe('when the any saga gets an error', () => {
    it('should return POST_REQUEST_FAILED with the error', () => {

    })
  })
})
