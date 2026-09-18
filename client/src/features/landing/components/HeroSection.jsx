const HeroSection = () => (
  <section
    className="relative bg-cover bg-center h-[500px] bg-blur-sm"
    style={{
      backgroundImage: "url('/images/concept-healthy-food-sports-lifestyle-vegetarian-lunch-healthy-breakfast-proper-nutrition-top-view-flat-lay.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: '80% 20%',
    }}
  >
    <div className="absolute inset-0 bg-black opacity-40"></div>
    <div className="absolute flex flex-col justify-center items-center text-white text-center px-6 md:px-12 h-full">
      <h1
        className="text-4xl md:text-6xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        Sağlıklı Yaşam İçin Sende Öneri Al
      </h1>
      <p className="text-lg md:text-2xl font-light animate__animated animate__fadeIn animate__delay-2s">
        Topluluğumuza katılarak sağlıklı yaşama adım atın!
      </p>
    </div>
  </section>
);

export default HeroSection;
