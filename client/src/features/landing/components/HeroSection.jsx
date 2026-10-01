const HeroSection = () => (
  <section
    className="relative h-[500px] bg-cover"
    style={{ backgroundImage: "url('/images/hero.jpg')", backgroundPosition: '80% 20%' }}
  >
    <div className="absolute inset-0 bg-black opacity-40"></div>
    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6 md:px-12">
      <h1 className="font-script text-4xl md:text-6xl font-bold mb-6">
        Sağlıklı Yaşam İçin Sende Öneri Al
      </h1>
      <p className="text-lg md:text-2xl font-light">
        Topluluğumuza katılarak sağlıklı yaşama adım atın!
      </p>
    </div>
  </section>
);

export default HeroSection;
