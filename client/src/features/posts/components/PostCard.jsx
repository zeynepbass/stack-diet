import { memo, useState } from 'react';
import { Heart } from 'lucide-react';
import useAppStore from '../../../app/store';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';

const HASHTAG_PATTERN = /#[\wğüşöçıİĞÜŞÖÇ]+/g;

const formatTimestamp = (value) =>
  new Date(value).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' });

const PostCard = ({ post }) => {
  const toggleLike = useAppStore((state) => state.toggleLike);
  const addComment = useAppStore((state) => state.addComment);
  const user = useCurrentUser();
  const [commenting, setCommenting] = useState(false);
  const [draft, setDraft] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const liked = post.likes.includes(user._id);
  const hashtags = post.content.match(HASHTAG_PATTERN);
  const text = post.content.split('#')[0].trim();

  const handleSubmitComment = async () => {
    setSubmitting(true);
    const added = await addComment(post._id, draft.trim());
    setSubmitting(false);
    if (added) {
      setDraft('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg">
      <div className="flex justify-between w-full">
        <h4 className="text-green-700 font-semibold text-md mb-1">{post.author.firstName}</h4>
        <p className="text-green-900 text-xs">{formatTimestamp(post.createdAt)}</p>
      </div>

      <p className="text-lg font-bold text-gray-800">{post.title}</p>

      {text && <p className="text-sm text-gray-600 mt-2 font-bold">{text}</p>}
      {hashtags && <p className="text-sm text-gray-600 mt-2 font-bold">{hashtags.join(', ')}</p>}

      <div className="flex items-center justify-start mt-4 gap-4 text-sm text-gray-500">
        <button
          onClick={() => toggleLike(post._id)}
          aria-pressed={liked}
          aria-label="Beğen"
          className="flex items-center gap-1 text-red-500 hover:text-red-600"
        >
          <Heart className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} />
          {post.likes.length}
        </button>
        <button
          onClick={() => setCommenting((open) => !open)}
          className="text-gray-600 hover:text-gray-800"
        >
          Yorum Yap
        </button>
      </div>

      <ul className="mt-3 space-y-2 pl-2">
        {post.comments.map((comment) => (
          <li key={comment._id} className="text-sm text-gray-700">
            <strong>@{comment.author.firstName.toLocaleLowerCase('tr-TR')}:</strong> {comment.text}
          </li>
        ))}
      </ul>

      {commenting && (
        <div className="mt-4 pl-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <textarea
              className="w-full rounded-lg p-2 border border-gray-300 outline-none"
              rows="2"
              maxLength={500}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Yorumunuzu yazın..."
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={submitting || !draft.trim()}
              onClick={handleSubmitComment}
            >
              Gönder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(PostCard);
