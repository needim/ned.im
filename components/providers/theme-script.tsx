'use client';

export function ThemeScript() {
  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{
        __html: `!function(){try{var e=localStorage.getItem("ned.im.theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;e?"dark"===e?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"):t&&document.documentElement.classList.add("dark"),document.documentElement.style.colorScheme=e||t?"dark":"light"}catch(e){console.log("Theme initialization failed:",e)}}();`,
      }}
    />
  );
} 