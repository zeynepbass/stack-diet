import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const formatTimestamp = (updatedAt) => {
  if (!updatedAt) return null;
  const date = new Date(updatedAt);
  return `${date.toLocaleDateString('tr-TR')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const PostCard = ({
  post,
  isCommentVisible,
  onToggleComments,
  onLike,
  commentDraft,
  onCommentDraftChange,
  onSubmitComment,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg">
    <div className="flex justify-between w-full">
      <h4 className="text-green-700 font-semibold text-md mb-1">
        {post.kullanici || 'Anonim Kullanıcı'}
      </h4>
      <h6 className="text-green-900 ">
        <p className="text-green-900 text-xs">{formatTimestamp(post.updatedAt)}</p>
      </h6>
    </div>

    <p className="text-lg font-bold text-gray-800">{post.title}</p>

    <p className="text-sm text-gray-600 mt-2 font-bold">
      {post.content.includes('#') ? post.content.split('#')[0].trim() : post.content}
    </p>
    <p className="text-sm text-gray-600 mt-2 font-bold">
      {post.content.includes('#')
        ? post.content.match(/#[\wğüşöçıİĞÜŞÖÇ]+/g)?.join(', ')
        : post.content}
    </p>

    <div className="flex items-center justify-start mt-4 gap-4 text-sm text-gray-500 ">
      <button
        onClick={() => onLike(post._id, post.likeCount)}
        className="flex items-center gap-1 text-red-500 hover:text-red-600"
      >
        <FontAwesomeIcon icon={faHeart} className="text-xl" />
        {post.likeCount || 0}
      </button>
      <button onClick={() => onToggleComments(post._id)} className="text-gray-600 hover:text-gray-800">
        Yorum Yap
      </button>
    </div>

    <ul className="mt-3 space-y-2 pl-2">
      {post?.comments?.map((comment, idx) => (
        <li key={idx} className="flex justify-between items-start text-sm text-gray-700">
          <span>
            <strong>@{comment.author.toLowerCase()}:</strong> {comment.text}
          </span>
        </li>
      ))}
    </ul>

    {isCommentVisible && (
      <div className="mt-4 pl-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <textarea
            className="w-full rounded-lg p-2 border border-gray-300 outline-none"
            rows="2"
            value={commentDraft}
            onChange={(e) => onCommentDraftChange(e.target.value)}
            placeholder="Yorumunuzu yazın..."
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={() => onSubmitComment(post._id)}
          >
            Gönder
          </button>
        </div>
      </div>
    )}
  </div>
);

export default PostCard;
