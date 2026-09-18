const Avatar = ({ src, alt = '', className = 'h-8 w-8 rounded-full' }) => (
  <img alt={alt} src={src} className={`object-cover ${className}`} />
);

export default Avatar;
