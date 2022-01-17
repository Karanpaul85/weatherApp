import Layout from '../template/Layout';
import Heading from '../template/heading/Heading';
import Today from '../template/today/Today';
import Forcast from '../template/forcast/Forcast';
import { useEffect, useState } from 'react';
const Home = ({ current, daily, hourly }) => {
  const initialState = {
    lat: '',
    lang: '',
  };
  const [coords, setCoords] = useState(initialState);

  useEffect(() => {
    const successHandler = (position) =>
      setCoords({
        lat: position.coords.latitude,
        lang: position.coords.longitude,
      });
    //console.log(position.coords.latitude, position.coords.longitude, 'coord');
    const errorHandler = (error) => console.error(error.message, 'errr');
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);
  return (
    <Layout title="Current Temprature">
      <Heading />
      <Today current={current} today={daily[0]} />
      <Forcast daily={daily} />
    </Layout>
  );
};
export async function getServerSideProps() {
  let weatherData = await fetch(
    'https://api.openweathermap.org/data/2.5/onecall?lat=28.4941239&lon=77.1633527&units=metric&exclude=alerts,minutely&appid=3279b275644f5e71cba5375e72028012'
  );
  let finalData = await weatherData.json();
  return {
    props: finalData,
  };
}
export default Home;
