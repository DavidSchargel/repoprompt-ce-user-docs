import React, {useEffect, useState} from 'react';

export default function CopyrightYear() {
  const [year, setYear] = useState(null);

  useEffect(() => {
    let timer;
    const update = () => {
      clearTimeout(timer);
      const now = new Date();
      setYear(now.getFullYear());
      const nextYear = new Date(now.getFullYear() + 1, 0, 1);
      timer = setTimeout(update, Math.min(nextYear - now, 86400000));
    };

    update();
    window.addEventListener('focus', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('focus', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return <span suppressHydrationWarning>{year ?? new Date().getFullYear()}</span>;
}
