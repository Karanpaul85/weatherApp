const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  reactStrictMode: true,
  assetPrefix: isProd ? 'https://your-local-weather-app.netlify.app' : '',
};
