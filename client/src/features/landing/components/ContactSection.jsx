import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const {
  VITE_EMAILJS_SERVICE_ID: SERVICE_ID,
  VITE_EMAILJS_TEMPLATE_ID: TEMPLATE_ID,
  VITE_EMAILJS_PUBLIC_KEY: PUBLIC_KEY,
} = import.meta.env;

const INPUT_CLASSES =
  'border border-gray-300 focus:ring-2 focus:ring-green-500 p-3 rounded-lg w-full';

const ContactSection = () => {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      formRef.current.reset();
      setStatus({ ok: true, text: 'Mesajınız başarıyla gönderildi!' });
    } catch {
      setStatus({ ok: false, text: 'Mesajınız gönderilemedi, lütfen daha sonra tekrar deneyin.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="iletisim" className="bg-white py-20">
      <div className="w-full max-w-md mx-auto text-center">
        <h2 className="font-script text-3xl font-bold text-green-800 mb-6">Bize Ulaşın</h2>
        <p className="text-gray-600 mb-4">
          Formu doldurun, en kısa sürede sizinle iletişime geçelim.
        </p>
        {status && (
          <p className={`mb-4 font-medium ${status.ok ? 'text-green-600' : 'text-red-600'}`}>
            {status.text}
          </p>
        )}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 text-left">
          <input type="text" className={INPUT_CLASSES} placeholder="Adınız" name="name" required />
          <input
            type="email"
            className={INPUT_CLASSES}
            placeholder="E-posta"
            name="email"
            required
          />
          <textarea
            className={INPUT_CLASSES}
            placeholder="Mesajınız"
            name="message"
            rows="4"
            required
          />
          <div className="text-center">
            <button
              type="submit"
              disabled={sending}
              className="bg-green-700 hover:bg-green-800 text-white py-2 px-6 rounded-full text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
