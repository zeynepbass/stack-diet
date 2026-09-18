import http from '../../../shared/lib/http';

export const createPostsSlice = (set) => ({
  data: [],
  search: '',

  setSearch: (newSearch) => set({ search: newSearch }),

  fetchPost: async () => {
    try {
      const response = await http.get('/panel');
      const fetchedData = response.data ? response.data.reverse() : [];
      set({ data: fetchedData });
    } catch (error) {
    }
  },

  fetchLike: async (postId, incrementValue) => {
    try {
      await http.put(`/panel/like/${postId}`);
      set((state) => ({
        data: state.data.map((post) =>
          post._id === postId ? { ...post, likeCount: incrementValue } : post
        ),
      }));
    } catch (error) {
    }
  },

  fetchComment: async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const nickName = user?.result?.firstName;

      const newPost = {
        ...formData,
        nickName,
      };

      const response = await http.post('/panel', newPost);
      set((state) => ({ data: [...state.data, response.data] }));
    } catch (error) {
    }
  },
});
