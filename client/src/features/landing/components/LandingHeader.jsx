import { Apple } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';

const NAV_LINKS = [
  { href: '#biz-kimiz', label: 'Biz Kimiz?' },
  { href: '#toplulugumuz', label: 'Topluluğumuz' },
  { href: '#iletisim', label: 'İletişim' },
];

const LINK_CLASSES = 'font-script text-green-800 text-lg hover:text-green-700';

const LandingHeader = () => {
  const user = useCurrentUser();

  return (
    <header className="fixed w-full bg-green-50 shadow-lg z-10">
      <nav className="flex justify-between items-center py-4 px-8">
        <div className="flex items-center text-green-800">
          <Apple className="mr-2 h-8 w-8" />
          <span className="font-script text-2xl font-semibold">Sağlıklı Yaşam</span>
        </div>
        <ul className="flex space-x-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={LINK_CLASSES}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            {user ? (
              <Link to="/ana-sayfa" className={LINK_CLASSES}>
                Ana Sayfa
              </Link>
            ) : (
              <Link to="/giris-yap" className={LINK_CLASSES}>
                Giriş Yap
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LandingHeader;
