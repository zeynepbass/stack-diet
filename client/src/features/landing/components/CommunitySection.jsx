const HIGHLIGHTS = [
  {
    title: 'Kişiye Özel Gönderiler',
    desc: 'Bireysel ihtiyaçlara göre kullanıcılara öneriler sunuyoruz.',
  },
  {
    title: 'Sürekli Destek ve Takip',
    desc: 'Birlikte takip ediyor, birlikte başarıyoruz.',
  },
  {
    title: 'Online Erişim',
    desc: 'Her zaman, her yerden erişilebilir destek.',
  },
];

const CommunitySection = () => (
  <section id="toplulugumuz" className="py-16 bg-green-50 text-center">
    <h2 className="text-4xl font-bold text-green-800 mb-12" style={{ fontFamily: "'Dancing Script', cursive" }}>
      Topluluğumuz
    </h2>
    <div className="flex flex-col items-center space-y-10 px-4 md:px-10">
      {HIGHLIGHTS.map((item, idx) => (
        <div
          key={item.title}
          className={`w-full md:max-w-xl flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`bg-white p-6 rounded-2xl shadow-lg relative max-w-md text-left border-l-4
            ${idx % 2 === 0 ? 'border-green-400' : 'border-yellow-400'}`}
          >
            <div className="text-xl font-semibold text-green-700">{item.title}</div>
            <p className="mt-2 text-gray-600 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default CommunitySection;
