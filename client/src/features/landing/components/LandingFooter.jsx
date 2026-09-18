const LandingFooter = () => {
  const fullyear = new Date().getFullYear();

  return (
    <footer className="bg-white text-green-800 py-6 text-center text-sm">
      <p className="scroll-text flex justify-center">
        <span className="pt-2">© {fullyear} Sağlıklı Yaşam Topluluğu | Tüm Hakları Saklıdır. | Zeynep Baş tarafından keyifle kodlanmıştır.</span>
        <span><img src="/images/coffee-lover.gif" width="40" height="40" alt="coffee" /></span>
      </p>
    </footer>
  );
};

export default LandingFooter;
