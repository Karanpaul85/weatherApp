import Cookies from 'js-cookie';
import styles from './Heading.module.css';
import { useEffect, useState } from 'react';
const Heading = ({ theme }) => {
  const [themeType, setThemeType] = useState('');
  useEffect(() => {
    if (theme === 'dark-theme') {
      setThemeType(theme);
      document.documentElement.setAttribute('data-theme', 'dark-theme');
    }
  }, [theme]);
  const themeHandler = () => {
    if (themeType === 'dark-theme') {
      Cookies.set('dataTheme', 'light-theme');
      setThemeType('light-theme');
      document.documentElement.setAttribute('data-theme', 'light-theme');
    } else {
      Cookies.set('dataTheme', 'dark-theme');
      setThemeType('dark-theme', '');
      document.documentElement.setAttribute('data-theme', 'dark-theme');
    }
  };
  return (
    <div className={styles.headingSec}>
      <span
        className={styles.themeChanger}
        onClick={() => themeHandler()}
      ></span>
      <h1 className={styles.headingText}>Weather</h1>
    </div>
  );
};

export default Heading;
