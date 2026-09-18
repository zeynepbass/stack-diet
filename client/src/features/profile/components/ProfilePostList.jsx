import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../shared/lib/http';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';
import useAppStore from '../../../app/store';
import { useFilteredPosts } from '../../posts/hooks/useFilteredPosts';

const ProfilePostList = () => {
  const { id } = useParams();
  const userEmail = useCurrentUser();
  const { fetchPost } = useAppStore();
  const filteredData = useFilteredPosts();
  const [editingId, setEditingId] = useState(null);
  const [editBaslik, setEditBaslik] = useState('');
  const [editAcikla, setEditAcikla] = useState('');

  const handleSave = async (postId) => {
    try {
      await http.put(`/updated/${postId}`, {
        title: editBaslik,
        content: editAcikla,
      });
      setEditingId(null);
      fetchPost();
    } catch (err) {
    }
  };
  const [data, setData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [comments, setComments] = useState([]);
  const handleDelete = async (postId) => {
    if (window.confirm('Bu gönderiyi silmek istediğinize emin misiniz?')) {
      try {
        await http.delete(`/panel/${postId}`);
        fetchPost();
      } catch (err) {
      }
    }
  };
  const fetchData = async (postUserId) => {
    try {
      const response = await http.get(`/detay/${postUserId}`);
      setData(response.data);
    } catch (error) {
    }
  };

  const Likes = filteredTitles.length > 0
    ? filteredTitles.sort((a, b) => b.likeCount - a.likeCount)[0]
    : null;
  useEffect(() => {
    if (id) {
      fetchData(id);
      fetchPost();
    }
  }, [id]);

  useEffect(() => {
    if (filteredData.length > 0 && Object.keys(data).length > 0 && data.firstName) {
      const titles = filteredData.filter(
        (item) => item.nickName || item.kullanici === data.firstName
      );
      setFilteredTitles(titles);
    }
  }, [filteredData, data]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-green-500 via-green-500 to-green-500 p-8 text-white rounded shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center">
          {data.selectedFile && (
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl border-4 border-white">
              <img
                src={data.selectedFile || 'default-image-url'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="ml-6">
            <h1 className="text-4xl font-semibold">{data.firstName} {data.lastName}</h1>
            <p className="text-md">@{data.firstName}{data.lastName}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 bg-white rounded-lg shadow-lg mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-1 sm:mr-6">
            <h2 className="text-xl font-semibold text-gray-900">Son Gönderi</h2>
            <p className="text-gray-700 mt-2">
              {Likes ? Likes.content : 'Henüz gönderi bulunmuyor.'}
            </p>
          </div>
          <div className="mt-6 sm:mt-0 sm:flex-shrink-0">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">{Likes ? Likes.likeCount : 0}</p>
                <p className="text-sm text-gray-500">Beğeni</p>
              </div>
              <div className="text-center">
                <p
                  className="text-lg font-semibold text-gray-900 cursor-pointer"
                  onClick={() => setIsDialogOpen(true)}
                >
                  {Likes ? Likes.comments.length : 0}
                </p>
                <p className="text-sm text-gray-500">Yorum Yapanlar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gönderiler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredTitles.map((item) => {
            const isEditing = editingId === item._id;

            return (
              <div key={item._id} className="bg-white p-6 rounded-lg shadow-lg relative">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img
                      src={data.selectedFile || 'default-image-url'}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">@{data.firstName} {data.lastName}</h3>
                    <p className="text-sm text-gray-500">@{data.firstName} {data.lastName}</p>
                  </div>
                </div>

                {isEditing ? (
                  <>
                    <input
                      value={editBaslik}
                      onChange={(e) => setEditBaslik(e.target.value)}
                      className="mt-4 w-full border rounded px-3 py-2 outline-green-100"
                    />
                    <textarea
                      value={editAcikla}
                      onChange={(e) => setEditAcikla(e.target.value)}
                      className="mt-2 w-full border rounded px-3 py-2 outline-green-100"
                    />
                    <div className="flex space-x-2 mt-2 justify-center">
                      <button
                        className="bg-green-500 text-white px-4 py-1 rounded"
                        onClick={() => handleSave(item._id)}
                      >
                        Kaydet
                      </button>
                      <button
                        className="bg-gray-400 text-white px-4 py-1 rounded"
                        onClick={() => setEditingId(null)}
                      >
                        İptal
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h6 className="mt-4 text-xl text-gray-800">{item.title}</h6>
                    <p className="mt-4 text-gray-700">{item.content}</p>
                  </>
                )}

                <div className="flex items-center mt-4 space-x-6">
                  <span className="text-sm text-gray-500">
                    {item.likeCount > 0 ? `${item.likeCount} Beğeni` : 'Beğeni Yok'}
                  </span>
                  <span
                    className="text-sm text-gray-500 cursor-pointer"
                    onClick={() => {
                      setIsDialogOpen(true);
                      setComments(item.comments || []);
                    }}
                  >
                    {item.comments.length > 0 ? `${item.comments.length} Yorum` : 'Yorum Yok'}
                  </span>
                </div>

                {userEmail?.result?.firstName === item.kullanici && (
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Sil"
                    >
                      🗑️
                    </button>

                    <button
                      onClick={() => {
                        setEditingId(item._id);
                        setEditBaslik(item.title);
                        setEditAcikla(item.content);
                      }}
                      className="text-gray-600 hover:text-gray-800 transition"
                      title="Düzenle"
                    >
                      ⋮
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 sm:mx-auto my-10 p-6 sm:p-8 relative">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-2xl font-bold text-green-800">Yorumlar</h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                ✖
              </button>
            </div>

            <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                  <li
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                  >
                    <p className="text-gray-700 text-base mb-1">{comment.text}</p>
                    <p className="text-sm text-gray-500 italic">– {comment.author}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-center">Hiç yorum yapılmamış.</p>
              )}
            </ul>

            <div className="mt-6 text-right">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md shadow transition"
                onClick={() => setIsDialogOpen(false)}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePostList;
