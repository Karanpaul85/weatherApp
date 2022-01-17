import Image from 'next/image';
import humidity from '../../public/svg/raindrop.svg';
import styles from './Forcast.module.css';
import weatherIcon from '../icons/icon';
const Forcast = ({ daily }) => {
  return (
    <div className={styles.forcast}>
      <div className={styles.forcast_row}>
        <div className={styles.heading}>Yesterday</div>
        <div className={styles.forcast_temp}>
          {Math.ceil(daily[1].temp.min)}
          <sup>C</sup> / {Math.ceil(daily[1].temp.max)}
          <sup>C</sup>
        </div>
      </div>
      {daily.map((item, index) => {
        return (
          <div className={styles.forcast_row} key={index}>
            <div className={styles.heading_bold}>
              {new Date(item.dt * 1000).toLocaleString('en-us', {
                weekday: 'long',
              })}
            </div>
            <div className={styles.heading_bold}>
              <Image src={humidity} alt="" width={24} height={24} />
              {item.humidity}%
            </div>
            <div className={styles.heading_bold}>
              <Image
                src={`/svg/${weatherIcon(item.weather[0].id)}.svg`}
                alt=""
                width={50}
                height={50}
              />
            </div>
            <div className={styles.forcast_temp_bold}>
              {Math.ceil(item.temp.min)}
              <sup>C</sup> / {Math.ceil(item.temp.max)}
              <sup>C</sup>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Forcast;
