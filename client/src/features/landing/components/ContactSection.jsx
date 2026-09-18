import { useRef, useState } from 'react';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus('Mesajınız başarıyla gönderildi!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="iletisim" className="bg-white py-20">
      <div className="w-full max-w-md mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-6" style={{ fontFamily: "'Dancing Script', cursive" }}>Bize Ulaşın</h2>
        <p className="text-gray-600 mb-4">Formu doldurun, en kısa sürede sizinle iletişime geçelim.</p>
        {status && <p className="text-green-600 mb-4 font-medium">{status}</p>}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="text"
            className="border border-gray-300 focus:ring-2 focus:ring-green-500 p-3 rounded-lg w-full"
            placeholder="Adınız"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="border border-gray-300 focus:ring-2 focus:ring-green-500 p-3 rounded-lg w-full"
            placeholder="E-posta"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            className="border border-gray-300 focus:ring-2 focus:ring-green-500 p-3 rounded-lg w-full"
            placeholder="Mesajınız"
            name="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white py-2 px-6 rounded-full text-sm"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
