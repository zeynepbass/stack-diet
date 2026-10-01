import toast from 'react-hot-toast';
import http from '../../../shared/lib/http';
import { getErrorMessage } from '../../../shared/lib/errors';

export const createPostsSlice = (set) => {
  const replacePost = (updated) =>
    set((state) => ({
      posts: state.posts.map((post) => (post._id === updated._id ? updated : post)),
    }));

  const mutate = async (request, apply) => {
    try {
      const { data } = await request();
      apply(data);
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    }
  };

  return {
    posts: [],
    postsLoading: false,
    postsError: null,
    search: '',

    setSearch: (search) => set({ search }),

    fetchPosts: async () => {
      set({ postsLoading: true, postsError: null });
      try {
        const { data } = await http.get('/posts');
        set({ posts: data });
      } catch (error) {
        set({ postsError: getErrorMessage(error) });
      } finally {
        set({ postsLoading: false });
      }
    },

    createPost: (payload) =>
      mutate(
        () => http.post('/posts', payload),
        (created) => set((state) => ({ posts: [created, ...state.posts] }))
      ),

    updatePost: (postId, payload) =>
      mutate(() => http.put(`/posts/${postId}`, payload), replacePost),

    deletePost: (postId) =>
      mutate(
        () => http.delete(`/posts/${postId}`),
        () => set((state) => ({ posts: state.posts.filter((post) => post._id !== postId) }))
      ),

    toggleLike: (postId) => mutate(() => http.post(`/posts/${postId}/like`), replacePost),

    addComment: (postId, text) =>
      mutate(() => http.post(`/posts/${postId}/comments`, { text }), replacePost),
  };
};
