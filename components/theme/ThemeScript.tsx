/**
 * Force dark brand theme before paint (clears any old light preference).
 */
export function ThemeScript() {
  const code = `(function(){try{localStorage.removeItem('xpeng-ghana-theme');}catch(e){}document.documentElement.setAttribute('data-theme','dark');})();`;

  return (
    <script
      id="xpeng-theme-init"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
