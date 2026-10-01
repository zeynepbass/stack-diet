import { Link } from 'react-router-dom';

const AboutSection = () => (
  <section id="biz-kimiz" className="py-16 bg-white text-center px-4">
    <h2 className="font-script text-4xl font-bold text-green-800 mb-4">Biz Kimiz?</h2>
    <p className="text-gray-600 max-w-xl mx-auto text-lg">
      Sağlıklı yaşam yolculuğunuzda sizinle birlikte yürüyen bir topluluğuz. Bilgi paylaşır,
      birbirimize destek olur ve birlikte güçleniriz.
    </p>
    <Link
      to="/ana-sayfa"
      className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full transition duration-300 text-sm"
    >
      🚀 Soru Sor
    </Link>
  </section>
);

export default AboutSection;
