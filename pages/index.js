import Layout from '../template/Layout';
import Heading from '../template/heading/Heading';
import Today from '../template/today/Today';
import Forcast from '../template/forcast/Forcast';
const Home = ({ current, daily, hourly, theme, cityName, apiData }) => {
  console.log(apiData);
  return (
    <Layout title="Current Temprature">
      <Heading theme={theme} />
      <Today current={current} today={daily[0]} cityName={cityName} />
      <Forcast daily={daily} />
    </Layout>
  );
};
export async function getServerSideProps(ctx) {
  try {
    let apiRes = await fetch(
      'https://api.freegeoip.app/json/?apikey=5833a0a0-5261-11ec-b743-05b2526df30e'
    );
    let apiData = await apiRes.json();
    let { req } = await ctx;
    let weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${apiData.latitude}&lon=${apiData.longitude}&units=metric&exclude=alerts,minutely&appid=3279b275644f5e71cba5375e72028012`
    );
    let finalData = await weatherData.json();
    let cityName = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${apiData.latitude}&lon=${apiData.longitude}&units=metric&exclude=alerts,minutely&appid=3279b275644f5e71cba5375e72028012`
    );
    let cityNamedata = await cityName.json();
    finalData['apiData'] = apiData;
    finalData['cityName'] = cityNamedata.name;
    finalData['theme'] = req.cookies.dataTheme
      ? req.cookies.dataTheme
      : 'light-theme';
    return {
      props: finalData,
    };
  } catch (err) {
    console.log(err);
  }
}
export default Home;
