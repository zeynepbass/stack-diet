import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import toast from 'react-hot-toast';
import useAppStore from '../../../app/store';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';
import Avatar from '../../../shared/ui/atoms/Avatar';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_FILE_SIZE = 1024 * 1024;

const AvatarDialog = ({ open, onClose }) => {
  const user = useCurrentUser();
  const updateAvatar = useAppStore((state) => state.updateAvatar);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Yalnızca PNG, JPEG veya WebP görsel yükleyebilirsiniz.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Görsel 1 MB'tan büyük olamaz.");
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    const saved = await updateAvatar(preview);
    setSaving(false);

    if (saved) {
      toast.success('Profil fotoğrafı güncellendi!');
      setPreview('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-green-900/95" />

      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-green-50 p-6 shadow-xl">
          <DialogTitle as="h3" className="text-base font-semibold text-gray-900 border-b pb-2">
            Profil Fotoğrafını Güncelle
          </DialogTitle>

          <div className="mt-4 flex flex-col items-center space-y-4">
            <Avatar
              src={preview || user.avatar}
              name={user.firstName}
              className="w-40 h-40 text-5xl border-2 border-green-500"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="w-full flex items-center justify-between gap-4">
              <input
                type="file"
                aria-label="Profil fotoğrafı"
                accept={ACCEPTED_TYPES.join(',')}
                onChange={handleFileChange}
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <button
                onClick={handleSave}
                disabled={!preview || saving}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AvatarDialog;
