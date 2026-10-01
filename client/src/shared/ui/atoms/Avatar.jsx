const Avatar = ({ src, name = '', className = 'h-8 w-8' }) =>
  src ? (
    <img alt={name} src={src} className={`rounded-full object-cover ${className}`} />
  ) : (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-green-100 font-semibold text-green-700 ${className}`}
    >
      {name.charAt(0).toLocaleUpperCase('tr-TR')}
    </span>
  );

export default Avatar;
