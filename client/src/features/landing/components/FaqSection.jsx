const FAQ_ITEMS = [
  { question: 'Topluluğa katılmak ücretli mi?', answer: 'Hayır, tamamen ücretsizdir.' },
  { question: 'Soru sormak için üye olmam gerekiyor mu?', answer: 'Evet, topluluğumuza katılarak soru sorabilirsiniz.' },
  { question: 'Uzman desteği sağlıyor musunuz?', answer: 'Evet, alanında uzman gönüllü üyelerimiz size yardımcı olabilir.' },
  { question: 'Görselleri ve içerikleri paylaşabilir miyim?', answer: 'Kaynak belirttiğiniz sürece içerikleri paylaşmanızda sakınca yoktur.' },
];

const FaqSection = () => (
  <section className="py-16 bg-white px-4">
    <h2 className="text-3xl font-bold text-green-800 mb-12 text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>
      Sıkça Sorulan Sorular
    </h2>
    <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto space-y-10 md:space-y-0 s">
      <div className="w-full ">
        <img
          src="/images/10350996.png"
          alt="diyet"
          className="rounded-xl object-contain w-full"
          style={{ height: '40vh' }}
        />
      </div>

      <div className="w-full md:w-1/2 space-y-6">
        {FAQ_ITEMS.map((item) => (
          <div key={item.question}>
            <h4 className="font-semibold text-green-700">{item.question}</h4>
            <p className="text-gray-600 text-sm">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
