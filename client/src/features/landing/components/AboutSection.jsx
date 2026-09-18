import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';

const AboutSection = () => {
  const navigate = useNavigate();
  const user = useCurrentUser();

  return (
    <section id="biz-kimiz" className="py-16 bg-white text-center px-4">
      <h2 className="text-4xl font-bold text-green-800 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>Biz Kimiz?</h2>
      <p className="text-gray-600 max-w-xl mx-auto text-lg">
        Sağlıklı yaşam yolculuğunuzda sizinle birlikte yürüyen bir topluluğuz. Bilgi paylaşır, birbirimize destek olur ve birlikte güçleniriz.
      </p>
      <button
        onClick={() => {
          user ? navigate('/ana-sayfa') : navigate('/giris-yap');
        }}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full mx-auto transition duration-300 text-sm"
      >
        🚀 Soru Sor
      </button>
    </section>
  );
};

export default AboutSection;
