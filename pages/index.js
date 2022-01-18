import Layout from '../template/Layout';
import Heading from '../template/heading/Heading';
import Today from '../template/today/Today';
import Forcast from '../template/forcast/Forcast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Home = ({ current, daily, hourly, theme, latlang }) => {
  const router = useRouter();
  const initialState = {
    lat: '',
    lang: '',
  };
  const [coords, setCoords] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [blockError, setBlockError] = useState(false);
  useEffect(() => {
    const successHandler = (position) => {
      setCoords({
        lat: position.coords.latitude,
        lang: position.coords.longitude,
      });
      setLoading(false);
      Cookies.set('latlong', JSON.stringify(coords));
    };
    const errorHandler = (error) => {
      setBlockError(true);
      setLoading(false);

      console.log(error.message);
    };
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, [loading, coords]);
  //reload
  const pageReload = () => {
    router.reload(window.location.pathname);
  };
  const Reload = () => {
    return (
      <div>
        You block you location, please allow to check weather{' '}
        <button onClick={() => pageReload()}>Reload</button>
      </div>
    );
  };
  return loading ? (
    'Loading....'
  ) : blockError ? (
    <Reload />
  ) : (
    <Layout title="Current Temprature">
      <Heading theme={theme} />
      <Today current={current} today={daily[0]} />
      <Forcast daily={daily} />
    </Layout>
  );
};
export async function getServerSideProps(ctx) {
  const initialState = {
    lat: '',
    lang: '',
  };
  const { req } = await ctx;
  const { lat, lang } = req.cookies.latlong
    ? JSON.parse(req.cookies.latlong)
    : initialState;
  let weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lang}&units=metric&exclude=alerts,minutely&appid=3279b275644f5e71cba5375e72028012`
  );
  let finalData = await weatherData.json();
  finalData['latlang'] = { lat, lang };
  finalData['theme'] = req.cookies.dataTheme
    ? req.cookies.dataTheme
    : 'light-theme';
  return {
    props: finalData,
  };
}
export default Home;
