import { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import useAppStore from '../../../app/store';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';
import http from '../../../shared/lib/http';
import PostForm from './PostForm';
import PostCard from './PostCard';
import { useFilteredPosts } from '../hooks/useFilteredPosts';

const PostList = () => {
  const { fetchPost, fetchLike } = useAppStore();
  const filteredData = useFilteredPosts();
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [commentVisible, setCommentVisible] = useState({});
  const [text, setText] = useState({});

  useEffect(() => {
    if (user) {
      fetchPost();
    }
  }, []);

  const commentHandler = async (postId) => {
    const currentText = text[postId];
    if (!currentText?.trim()) return;

    try {
      const newComment = {
        text: currentText,
        author: user?.result?.firstName,
      };
      await http.post(`/detay/${postId}`, newComment);
      await fetchPost();
      setText((prev) => ({ ...prev, [postId]: '' }));
    } catch (error) {
    }
  };

  const handleCommentClick = (id) => {
    setCommentVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleLike = (postId, currentLikeCount) => {
    fetchLike(postId, currentLikeCount + 1);
  };

  return (
    <div className="pt-4 px-6">
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex w-full">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">Kullanıcılar</DialogTitle>
                    <ul>
                      <li>Kullanıcı A</li>
                      <li>Kullanıcı B</li>
                      <li>Kullanıcı C</li>
                    </ul>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <h4 className="font-semibold text-slate-800 text-2xl mb-4">Sağlıklı Yaşam İçin Diyet Önerileri</h4>
      {user ? <PostForm /> : null}

      <br /><br /><br />
      <div className="grid gap-8 pt-4 mt-10">
        {filteredData.map((item, index) => (
          <PostCard
            key={item._id || index}
            post={item}
            isCommentVisible={!!commentVisible[item._id]}
            onToggleComments={handleCommentClick}
            onLike={handleLike}
            commentDraft={text[item._id] || ''}
            onCommentDraftChange={(value) => setText((prev) => ({ ...prev, [item._id]: value }))}
            onSubmitComment={commentHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
