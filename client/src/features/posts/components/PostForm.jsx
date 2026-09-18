import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useAppStore from '../../../app/store';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';

const PostForm = () => {
  const { fetchComment } = useAppStore();
  const user = useCurrentUser();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      const dataToSend = {
        content: formData.content,
        title: formData.title,
        kullanici: user?.result?.firstName,
      };
      await fetchComment(dataToSend);
      setFormData({ content: '', title: '' });
    } else {
      Navigate('/ana-sayfa');
    }
  };

  return (
    <form className="w-full flex space-x-4 h-10" onSubmit={handleSubmit}>
      <div className="relative w-full row">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="h-10 block w-full p-4  text-sm text-gray-900 border outline-none  border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
          placeholder="Başlık yaz..."
          required
        />
        <div className="flex">
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="h-20 relative w-full p-4 mt-2 text-sm text-gray-900 border outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm transition duration-300 ease-in-out"
            placeholder="Açıklama yaz..."
            required
          ></textarea>

          <button
            type="submit"
            className="h-20 mt-2 absolute right-0 pl-3 pr-4 bg-green-700 text-white rounded-tr-lg rounded-br-lg hover:bg-green-100 focus:ring-2 focus:ring-blue-300"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
