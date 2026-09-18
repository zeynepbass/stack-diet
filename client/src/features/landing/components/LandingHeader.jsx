import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { useCurrentUser } from '../../../shared/hooks/useCurrentUser';

const NAV_LINKS = [
  { href: '#biz-kimiz', label: 'Biz Kimiz?' },
  { href: '#toplulugumuz', label: 'Topluluğumuz' },
  { href: '#iletisim', label: 'İletişim' },
];

const LandingHeader = () => {
  const user = useCurrentUser();

  return (
    <header className="fixed w-full bg-green-50 shadow-lg z-10 backgorund-i">
      <nav className="flex justify-between items-center py-4 px-8">
        <div className="flex items-center text-green-800">
          <FontAwesomeIcon icon={faApple} size="2x" className="mr-2" />
          <span className="text-2xl font-semibold" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Sağlıklı Yaşam
          </span>
        </div>
        <ul className="flex space-x-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-green-800 text-lg hover:text-green-700" style={{ fontFamily: "'Dancing Script', cursive" }}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={user ? '/ana-sayfa' : '/giris-yap'} className="text-green-800 text-lg hover:text-green-700" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Giriş Yap
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LandingHeader;
