import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Link } from 'react-router-dom';
import useAppStore from '../../../app/store';
import http from '../../../shared/lib/http';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';
import SearchInput from '../../../shared/ui/molecules/SearchInput';

const UsersDialog = ({ open, setOpen, data, setData }) => {
  const [base64Image, setBase64Image] = useState('');
  const { usersData, fetchUsers } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const user = useCurrentUser();
  const userVeri = usersData?.filter((item) => item.email !== user?.result?.email);

  const filteredUsers = useMemo(
    () => userVeri?.filter((u) => u.firstName.toLowerCase().includes(searchQuery.toLowerCase())),
    [userVeri, searchQuery]
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const response = await http.put(`/duzenle/${user.result._id}`, {
        selectedFile: base64Image,
      });

      alert('Profil fotoğrafı güncellendi!');

      const storedProfile = JSON.parse(localStorage.getItem('userProfile'));

      const updatedProfile = {
        ...storedProfile,
        selectedFile: response.data.selectedFile,
      };

      setData((prevData) => ({
        ...prevData,
        ...response.data,
      }));

      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

      window.location.reload();
      setOpen(false);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-green-900/95 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-green-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex w-full">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  {usersData && (
                    <>
                      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                        {data ? 'Profil Fotoğrafını Güncelle' : 'Öneri yapan kullanıcılar'}
                        <hr />
                      </DialogTitle>

                      <div className="mt-2">
                        {data ? (
                          <div className="flex flex-col items-center space-y-4">
                            <img
                              src={base64Image}
                              alt=""
                              className="w-40 h-40 rounded-full border-2 border-green-500 object-cover mx-auto"
                            />

                            <div className="w-full flex justify-start mt-4">
                              <input
                                type="file"
                                onChange={handleFileChange}
                                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />
                              <button
                                onClick={handleSave}
                                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                              >
                                Kaydet
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <SearchInput
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Kullanıcı Ara..."
                              className="w-full p-2 border-2 border-green-100 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-50 focus:border-transparent"
                            />
                            {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                              <ul className="space-y-2">
                                {filteredUsers.map((filteredUser, index) => (
                                  <li key={index} className="text-md text-gray-800 cursor-pointer hover:text-green-500 transition-colors duration-300 ease-in-out">
                                    <Link to={`/profile/${filteredUser._id}`} className="font-cursive text-green-900 hover:text-green-700">
                                      @{filteredUser.firstName} {filteredUser.lastName}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500">Kullanıcı bulunamadı.</p>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"></div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UsersDialog;
