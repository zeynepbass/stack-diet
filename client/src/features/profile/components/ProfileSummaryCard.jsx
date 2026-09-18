import { useEffect, useState } from 'react';
import http from '../../../shared/lib/http';
import { useCurrentUser, useCurrentUserProfile } from '../../../shared/hooks/useCurrentUser';
import { useFilteredPosts } from '../../posts/hooks/useFilteredPosts';
import UsersDialog from './UsersDialog';

const ProfileSummaryCard = () => {
  const filteredData = useFilteredPosts();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState('');
  const user = useCurrentUser();
  const userProfile = useCurrentUserProfile();
  const filteredTitles = filteredData.filter((item) => item.nickName || item.kullanici === user?.result?.firstName);
  const lastTitles = filteredTitles.reverse();

  const handleClick = async () => {
    setOpen(true);
  };

  const fetchData = async () => {
    try {
      const response = await http.get(`/detay/${user?.result?._id}`);
      setData(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <UsersDialog open={open} setOpen={setOpen} data={data} setData={setData} />

      <div className="flex items-center space-x-6 pr-3">
        <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
          <img
            src={userProfile?.selectedFile ?? data?.selectedFile}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">@{data.firstName}</h1>
          <p
            className="text-green-300 rounded-md hover:text-green-800 cursor-pointer"
            onClick={() => handleClick(user?.result?._id)}
          >
            Profil Düzenle
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 gap-4" style={{ paddingTop: user ? '10%' : '0' }}>
          <div className="w-full p-4 h-[50vh] overflow-y-auto">
            <h8 className="font-bold">Son gönderilerin</h8>
            <br /> <br />
            {lastTitles && lastTitles.length > 0 ? (
              <ul className="list-none">
                {lastTitles.map((item, index) => (
                  <li key={index} className="bg-white p-1 rounded-lg mb-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h2 className="text-gray-900 text-xl font-semibold ">📌 &nbsp;{item.title}</h2>
                        <p className="text-gray-600 mt-2">{item.content}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Hiç gönderi yayınlamadın.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSummaryCard;
