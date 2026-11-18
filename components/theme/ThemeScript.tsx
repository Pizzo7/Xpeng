/**
 * Inline theme boot script (App Router safe).
 * Default remains dark; avoids flash before React hydrates.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('xpeng-ghana-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

  return (
    <script
      id="xpeng-theme-init"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
