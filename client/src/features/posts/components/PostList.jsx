import { useEffect } from 'react';
import useAppStore from '../../../app/store';
import PostForm from './PostForm';
import PostCard from './PostCard';
import { useFilteredPosts } from '../hooks/useFilteredPosts';

const PostList = () => {
  const fetchPosts = useAppStore((state) => state.fetchPosts);
  const loading = useAppStore((state) => state.postsLoading);
  const error = useAppStore((state) => state.postsError);
  const posts = useFilteredPosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="pt-4 px-6">
      <h4 className="font-semibold text-slate-800 text-2xl mb-4">
        Sağlıklı Yaşam İçin Diyet Önerileri
      </h4>
      <PostForm />

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
      {loading && posts.length === 0 && (
        <p className="mt-6 text-sm text-gray-500">Gönderiler yükleniyor...</p>
      )}
      {!loading && !error && posts.length === 0 && (
        <p className="mt-6 text-sm text-gray-500">Henüz gönderi yok.</p>
      )}

      <div className="grid gap-8 pt-4 mt-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
