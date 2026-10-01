import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import useAppStore from '../../../app/store';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';
import Avatar from '../../../shared/ui/atoms/Avatar';

const ProfilePostCard = ({ post, author, onShowComments }) => {
  const updatePost = useAppStore((state) => state.updatePost);
  const deletePost = useAppStore((state) => state.deletePost);
  const user = useCurrentUser();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ title: '', content: '' });
  const [saving, setSaving] = useState(false);

  const isOwner = post.author._id === user._id;
  const canSave = draft.title.trim() && draft.content.trim() && !saving;

  const startEditing = () => {
    setDraft({ title: post.title, content: post.content });
    setEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const saved = await updatePost(post._id, {
      title: draft.title.trim(),
      content: draft.content.trim(),
    });
    setSaving(false);
    if (saved) {
      setEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Bu gönderiyi silmek istediğinize emin misiniz?')) {
      deletePost(post._id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg relative">
      <div className="flex items-center space-x-4">
        <Avatar src={author.avatar} name={author.firstName} className="w-14 h-14 text-xl" />
        <h3 className="text-lg font-semibold">
          @{author.firstName} {author.lastName}
        </h3>
      </div>

      {editing ? (
        <>
          <input
            aria-label="Başlık"
            value={draft.title}
            maxLength={150}
            onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
            className="mt-4 w-full border rounded px-3 py-2 outline-green-100"
          />
          <textarea
            aria-label="Açıklama"
            value={draft.content}
            maxLength={2000}
            onChange={(event) => setDraft((prev) => ({ ...prev, content: event.target.value }))}
            className="mt-2 w-full border rounded px-3 py-2 outline-green-100"
          />
          <div className="flex space-x-2 mt-2 justify-center">
            <button
              className="bg-green-500 text-white px-4 py-1 rounded disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!canSave}
              onClick={handleSave}
            >
              Kaydet
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-1 rounded"
              onClick={() => setEditing(false)}
            >
              İptal
            </button>
          </div>
        </>
      ) : (
        <>
          <h6 className="mt-4 text-xl text-gray-800">{post.title}</h6>
          <p className="mt-4 text-gray-700">{post.content}</p>
        </>
      )}

      <div className="flex items-center mt-4 space-x-6 text-sm text-gray-500">
        <span>{post.likes.length > 0 ? `${post.likes.length} Beğeni` : 'Beğeni Yok'}</span>
        <button onClick={() => onShowComments(post.comments)}>
          {post.comments.length > 0 ? `${post.comments.length} Yorum` : 'Yorum Yok'}
        </button>
      </div>

      {isOwner && (
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition"
            aria-label="Sil"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={startEditing}
            className="text-gray-600 hover:text-gray-800 transition"
            aria-label="Düzenle"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePostCard;
