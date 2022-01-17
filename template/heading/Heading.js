import { useState } from 'react';
import styles from './Heading.module.css';
import { useEffect } from 'react';
const Heading = () => {
  useEffect(() => {
    // Perform localStorage action
    const themeSet = localStorage.getItem('dataTheme');
    themeSet === 'dark-theme' ? setstate('dark-theme') : setstate('');
  }, []);
  const [state, setstate] = useState('');
  if (state === 'dark-theme') {
    document.documentElement.setAttribute('data-theme', 'dark-theme');
  }
  const themeHandler = () => {
    if (state === 'dark-theme') {
      setstate('');
      localStorage.setItem('dataTheme', '');
      document.documentElement.setAttribute('data-theme', '');
    } else {
      setstate('dark-theme');
      localStorage.setItem('dataTheme', 'dark-theme');
      document.documentElement.setAttribute('data-theme', 'dark-theme');
    }
  };
  return (
    <div className={styles.headingSec}>
      <span
        className={`${styles.themeChanger} ${state ? styles.active : ''}`}
        onClick={() => themeHandler()}
      ></span>
      <h1 className={styles.headingText}>Weather</h1>
    </div>
  );
};
export default Heading;
