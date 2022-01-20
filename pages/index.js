import { useEffect, useState } from 'react';
import Layout from '../template/Layout';
import Heading from '../template/heading/Heading';
import Today from '../template/today/Today';
import Forcast from '../template/forcast/Forcast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
const Home = ({ current, daily, hourly, theme, cityName, latlangs }) => {
  const [userPermision, setUserPermision] = useState(false);
  const [finalConfirmation, setFinalConfirmation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (latlangs) {
      setUserPermision(true);
      setFinalConfirmation(true);
    } else {
      const success = ({ coords }) => {
        const latlong = { lat: coords.latitude, long: coords.longitude };
        Cookies.set('latlong', JSON.stringify(latlong));
        setUserPermision(true);
      };
      const error = (errors) => {
        console.log(errors);
      };
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [latlangs, router]);

  const reloadPage = () => {
    setFinalConfirmation(true);
    router.reload(window.location.pathname);
  };
  const UserFinalConfirm = () => {
    return (
      <div className="userConfirm">
        <p>Thankyou for your confirmation</p>
        <button onClick={() => reloadPage()}>Close</button>
      </div>
    );
  };

  const Loading = () => {
    return (
      <div className="new-loader-area">
        <div className="new-loader"></div>
      </div>
    );
  };

  return !userPermision ? (
    <Loading />
  ) : !finalConfirmation ? (
    <UserFinalConfirm />
  ) : (
    <Layout title={`${cityName} - ${Math.ceil(current.temp)}C`}>
      <Heading theme={theme} />
      <Today
        current={current}
        today={daily[0]}
        cityName={cityName}
        hourly={hourly}
      />
      <Forcast daily={daily} />
    </Layout>
  );
};
export async function getServerSideProps(ctx) {
  try {
    let { req } = await ctx;
    let { lat, long } = req.cookies.latlong
      ? JSON.parse(req.cookies.latlong)
      : { lat: '29.7621', long: '76.5546' };
    let weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=alerts,minutely&appid=3279b275644f5e71cba5375e72028012`
    );
    let finalData = await weatherData.json();
    let cityName = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&exclude=alerts,minutely&appid=3279b275644f5e71cba5375e72028012`
    );
    let cityNamedata = await cityName.json();
    finalData['cityName'] = cityNamedata.name;
    finalData['theme'] = req.cookies.dataTheme
      ? req.cookies.dataTheme
      : 'light-theme';
    finalData['latlangs'] = req.cookies.latlong ? true : false;
    return {
      props: finalData,
    };
  } catch (err) {
    console.log(err);
  }
}
export default Home;
