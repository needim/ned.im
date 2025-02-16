'use client';

export function ThemeScript() {
  // 将主题初始化逻辑移到 useEffect 中
  const themeScript = `
    try {
      var theme = localStorage.getItem("ned.im.theme");
      var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      if (theme) {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else if (systemDark) {
        document.documentElement.classList.add("dark");
      }
      
      document.documentElement.style.colorScheme = theme || (systemDark ? "dark" : "light");
    } catch (error) {
      console.log("Theme initialization failed:", error);
    }
  `;

  return (
    <script
      id="theme-script"
      type="text/javascript"
    >
      {themeScript}
    </script>
  );
} 