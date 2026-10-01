import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAppStore from '../../../app/store';
import Avatar from '../../../shared/ui/atoms/Avatar';
import { useFilteredPosts } from '../../posts/hooks/useFilteredPosts';
import CommentsDialog from './CommentsDialog';
import ProfilePostCard from './ProfilePostCard';

const ProfilePostList = () => {
  const { id } = useParams();
  const profile = useAppStore((state) => state.profile);
  const profileError = useAppStore((state) => state.profileError);
  const fetchProfile = useAppStore((state) => state.fetchProfile);
  const fetchPosts = useAppStore((state) => state.fetchPosts);
  const posts = useFilteredPosts();
  const [openComments, setOpenComments] = useState(null);

  useEffect(() => {
    fetchProfile(id);
    fetchPosts();
  }, [id, fetchProfile, fetchPosts]);

  const profilePosts = useMemo(() => posts.filter((post) => post.author._id === id), [posts, id]);

  const topPost = useMemo(
    () =>
      profilePosts.reduce(
        (top, post) => (!top || post.likes.length > top.likes.length ? post : top),
        null
      ),
    [profilePosts]
  );

  if (profileError) {
    return <p className="text-red-600">{profileError}</p>;
  }

  if (!profile) {
    return <p className="text-gray-500">Profil yükleniyor...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-green-500 p-8 text-white rounded shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center">
          <Avatar
            src={profile.avatar}
            name={profile.firstName}
            className="w-24 h-24 text-3xl shadow-xl border-4 border-white"
          />
          <div className="ml-6">
            <h1 className="text-4xl font-semibold">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-md">
              @{profile.firstName}
              {profile.lastName}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 bg-white rounded-lg shadow-lg mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-1 sm:mr-6">
            <h2 className="text-xl font-semibold text-gray-900">Öne Çıkan Gönderi</h2>
            <p className="text-gray-700 mt-2">
              {topPost ? topPost.content : 'Henüz gönderi bulunmuyor.'}
            </p>
          </div>
          <div className="mt-6 sm:mt-0 sm:flex-shrink-0">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{topPost?.likes.length ?? 0}</p>
                <p className="text-sm text-gray-500">Beğeni</p>
              </div>
              <button
                className="text-center"
                disabled={!topPost}
                onClick={() => setOpenComments(topPost.comments)}
              >
                <p className="text-lg font-semibold text-gray-900">
                  {topPost?.comments.length ?? 0}
                </p>
                <p className="text-sm text-gray-500">Yorum Yapanlar</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gönderiler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {profilePosts.map((post) => (
            <ProfilePostCard
              key={post._id}
              post={post}
              author={profile}
              onShowComments={setOpenComments}
            />
          ))}
        </div>
      </div>

      <CommentsDialog comments={openComments} onClose={() => setOpenComments(null)} />
    </div>
  );
};

export default ProfilePostList;
