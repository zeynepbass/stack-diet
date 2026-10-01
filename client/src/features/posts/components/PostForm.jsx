import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import useAppStore from '../../../app/store';

const EMPTY_FORM = { title: '', content: '' };

const PostForm = () => {
  const createPost = useAppStore((state) => state.createPost);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = formData.title.trim();
    const content = formData.content.trim();
    if (!title || !content) {
      setError('Başlık ve açıklama zorunlu.');
      return;
    }

    setSubmitting(true);
    const created = await createPost({ title, content });
    setSubmitting(false);
    if (created) {
      setFormData(EMPTY_FORM);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="title"
        aria-label="Başlık"
        value={formData.title}
        onChange={handleChange}
        maxLength={150}
        className="h-10 block w-full p-4 text-sm text-gray-900 border outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
        placeholder="Başlık yaz..."
      />
      <div className="flex mt-2">
        <textarea
          name="content"
          aria-label="Açıklama"
          value={formData.content}
          onChange={handleChange}
          maxLength={2000}
          className="h-20 w-full p-4 text-sm text-gray-900 border outline-none border-gray-300 rounded-l-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm transition duration-300 ease-in-out"
          placeholder="Açıklama yaz..."
        />
        <button
          type="submit"
          aria-label="Paylaş"
          disabled={submitting}
          className="h-20 px-4 bg-green-700 text-white rounded-r-lg hover:bg-green-600 focus:ring-2 focus:ring-green-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </form>
  );
};

export default PostForm;
