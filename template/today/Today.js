import Image from 'next/image';
import styles from './Today.module.css';
import weatherIcon from '../icons/icon';
const Today = ({ current, today, cityName, hourly }) => {
  const getHours = (itemdate) => {
    var hours = itemdate.getHours();
    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    var minutes = itemdate.getMinutes();
    var finalTime = hours + ':' + minutes + ' ' + AmOrPm;
    return finalTime;
  };
  const d = new Date();
  const curretDate = d.getDate();
  const finalIcon = `/svg/${weatherIcon(today.weather[0].id)}.svg`;
  const currentDate = new Date(current.dt * 1000);
  const todayHourly = hourly.map((item) => {
    const hourlyIcon = `/svg/${weatherIcon(item.weather[0].id)}.svg`;
    const itemdate = new Date(item.dt * 1000);
    if (curretDate === itemdate.getDate()) {
      return (
        <div key={item.dt} className={styles.hourlyTempSec}>
          <div className={styles.hourlyTempWithIcon}>
            <Image src={hourlyIcon} alt="" width={50} height={50} />
            <div className={styles.hourlyTemp}>
              {Math.ceil(item.temp)}
              <sup>C</sup>
            </div>
          </div>
          <div className={styles.hourlyTime}>{getHours(itemdate)}</div>
        </div>
      );
    }
  });
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
          <div className={styles.temp}>
            {Math.ceil(current.temp)}
            <sup>C</sup>
          </div>
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
      <div className={styles.hourly}>{todayHourly}</div>
    </div>
  );
};
export default Today;
