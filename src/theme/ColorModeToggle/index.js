import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import IconLightMode from '@theme/Icon/LightMode';
import IconDarkMode from '@theme/Icon/DarkMode';
import styles from './styles.module.css';

export default function ColorModeToggle({className, buttonClassName, value, onChange}) {
  const isBrowser = useIsBrowser();
  const nextMode = value === 'dark' ? 'light' : 'dark';

  return (
    <div className={[styles.toggle, className].filter(Boolean).join(' ')}>
      <button
        className={['clean-btn', styles.toggleButton, buttonClassName].filter(Boolean).join(' ')}
        type="button"
        disabled={!isBrowser}
        onClick={() => onChange(nextMode)}
        aria-label={`Switch to ${nextMode} mode`}
      >
        <IconLightMode aria-hidden="true" className={styles.lightIcon} />
        <IconDarkMode aria-hidden="true" className={styles.darkIcon} />
      </button>
    </div>
  );
}
