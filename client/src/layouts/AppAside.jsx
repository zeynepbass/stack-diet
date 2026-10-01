import { useMemo, useState } from 'react';
import { Users } from 'lucide-react';
import { useFilteredPosts } from '../features/posts/hooks/useFilteredPosts';
import UsersDialog from '../features/profile/components/UsersDialog';
import BmiCalculator from '../features/bmi-calculator/components/BmiCalculator';

const DIET_EMOJIS = ['🥗', '🥬', '🥒', '🥑', '🍅', '💪', '🍋', '🌽', '🍓', '🥦'];
const POPULAR_POST_LIMIT = 9;

const AppAside = () => {
  const posts = useFilteredPosts();
  const [usersOpen, setUsersOpen] = useState(false);

  const popularPosts = useMemo(
    () =>
      posts
        .filter((post) => post.likes.length > 0)
        .sort((a, b) => b.likes.length - a.likes.length)
        .slice(0, POPULAR_POST_LIMIT),
    [posts]
  );

  const authorCount = useMemo(() => new Set(posts.map((post) => post.author._id)).size, [posts]);

  return (
    <div className="grid grid-cols-1 gap-6 mt-8">
      <div className="bg-green-50 rounded-xl border-2 border-green-100 p-4">
        <h4 className="font-semibold text-slate-700 border-b pb-1">Popüler Gönderiler</h4>
        {popularPosts.map((post, index) => (
          <p key={post._id} className="m-2 truncate text-sm font-semibold text-gray-800">
            {DIET_EMOJIS[index % DIET_EMOJIS.length]} {post.title}
          </p>
        ))}
      </div>

      <UsersDialog open={usersOpen} onClose={() => setUsersOpen(false)} />

      <div className="w-full rounded-xl border-2 border-gray-50 p-4 bg-white">
        <h4 className="font-semibold text-slate-700 mb-4">Soru Soran Kullanıcılar</h4>
        <div className="flex space-x-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
            <Users className="w-6 h-6" />
          </span>
          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-500">+ {authorCount} kullanıcı</p>
            <button
              onClick={() => setUsersOpen(true)}
              className="text-sm text-green-500 hover:text-green-700 focus:outline-none mt-2"
            >
              Daha Fazla Kullanıcı
            </button>
          </div>
        </div>
      </div>

      <BmiCalculator />
    </div>
  );
};

export default AppAside;
