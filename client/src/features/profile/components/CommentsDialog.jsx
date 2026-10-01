import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { X } from 'lucide-react';

const CommentsDialog = ({ comments, onClose }) => (
  <Dialog open={comments !== null} onClose={onClose} className="relative z-50">
    <DialogBackdrop className="fixed inset-0 bg-black/50" />

    <div className="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <DialogTitle as="h2" className="text-2xl font-bold text-green-800">
            Yorumlar
          </DialogTitle>
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {comments?.length > 0 ? (
          <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-700 text-base mb-1">{comment.text}</p>
                <p className="text-sm text-gray-500 italic">– {comment.author.firstName}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">Hiç yorum yapılmamış.</p>
        )}

        <div className="mt-6 text-right">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md shadow transition"
            onClick={onClose}
          >
            Kapat
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
);

export default CommentsDialog;
