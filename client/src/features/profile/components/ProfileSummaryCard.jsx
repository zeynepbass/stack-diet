import { useState } from 'react';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';
import Avatar from '../../../shared/ui/atoms/Avatar';
import { useFilteredPosts } from '../../posts/hooks/useFilteredPosts';
import AvatarDialog from './AvatarDialog';

const ProfileSummaryCard = () => {
  const user = useCurrentUser();
  const posts = useFilteredPosts();
  const [editing, setEditing] = useState(false);

  const ownPosts = posts.filter((post) => post.author._id === user._id);

  return (
    <>
      <AvatarDialog open={editing} onClose={() => setEditing(false)} />

      <div className="flex items-center space-x-4 pr-3">
        <Avatar src={user.avatar} name={user.firstName} className="w-20 h-20 shrink-0 text-3xl" />
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold text-gray-800">@{user.firstName}</h1>
          <button
            className="text-green-300 rounded-md hover:text-green-800"
            onClick={() => setEditing(true)}
          >
            Profil Düzenle
          </button>
        </div>
      </div>

      <div className="mt-10 w-full p-4 h-[50vh] overflow-y-auto">
        <h5 className="font-bold mb-6">Son gönderilerin</h5>
        {ownPosts.length > 0 ? (
          <ul className="list-none">
            {ownPosts.map((post) => (
              <li key={post._id} className="bg-white p-1 rounded-lg mb-1">
                <h2 className="text-gray-900 text-xl font-semibold">📌 &nbsp;{post.title}</h2>
                <p className="text-gray-600 mt-2">{post.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Hiç gönderi yayınlamadın.</p>
        )}
      </div>
    </>
  );
};

export default ProfileSummaryCard;
