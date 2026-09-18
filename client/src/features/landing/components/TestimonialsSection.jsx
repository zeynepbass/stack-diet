const TESTIMONIALS = [
  { name: 'Ayşe K.', comment: 'Bu topluluk sayesinde sağlıklı beslenmeye başladım. Gerçekten çok yardımcı!' },
  { name: 'Mehmet T.', comment: 'Tarif önerileri ve tavsiyeler çok faydalı, herkese öneririm!' },
  { name: 'Zeynep B.', comment: 'Harika bir topluluk, sürekli destek var. Teşekkür ederim!' },
];

const TestimonialsSection = () => (
  <section className="py-16 bg-white text-center">
    <h2 className="text-3xl font-bold text-green-800 mb-8" style={{ fontFamily: "'Dancing Script', cursive" }}>Kullanıcı Yorumları</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
      {TESTIMONIALS.map((item) => (
        <div key={item.name} className="bg-gray-50 p-4 rounded-lg shadow">
          <p className="italic text-gray-700">"{item.comment}"</p>
          <p className="mt-2 text-green-800 font-semibold">- {item.name}</p>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
