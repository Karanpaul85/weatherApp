import Image from 'next/image';
import styles from './Today.module.css';
import weatherIcon from '../icons/icon';
const Today = ({ current, today, cityName }) => {
  const finalIcon = `/svg/${weatherIcon(today.weather[0].id)}.svg`;
  const currentDate = new Date(current.dt * 1000);
  return (
    <div className={styles.todayWeatherSec}>
      <div className={styles.areaRow}>
        <div className={styles.area}>{cityName}</div>
        <div className={styles.currentDate}>
          {currentDate.toLocaleString('en-us', { weekday: 'short' })},{' '}
          {currentDate.getDate()}
          {currentDate.toLocaleString('en-us', { month: 'long' })}
        </div>
      </div>
      <div className={styles.temprature}>
        <div className={styles.temp_icons}>
          <div className={styles.icon}>
            <Image src={finalIcon} alt="" width={100} height={100} />
          </div>
          <div className={styles.temp}>{Math.ceil(current.temp)}</div>
        </div>
        <div className={styles.temp_summery}>
          <div className={styles.desc}>{today.weather[0].main}</div>
          <div className={styles.max_min}>
            {Math.ceil(today.temp.min)}
            <sup>C</sup> / {Math.ceil(today.temp.max)}
            <sup>C</sup>
          </div>
          <div className={styles.feel}>
            Feel Like {Math.ceil(current.feels_like)}
            <sup>C</sup>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Today;
