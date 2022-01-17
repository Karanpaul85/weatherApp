const weatherIcon = (iconCode) => {
  switch (iconCode) {
    case 200:
    case 202:
      return 'thunderstorms-day-rain';
      break;
    case 201:
      return 'thunderstorms-day-overcast';
      break;
    case 210:
      return 'thunderstorms-overcast';
      break;
    case 211:
      return 'lightning-bolt';
      break;
    case 212:
      return 'thunderstorms-night-rain';
      break;
    case 221:
      return 'thunderstorms-day-rain';
      break;
    case 230:
      return 'thunderstorms-day-overcast';
      break;
    case 231:
      return 'thunderstorms-day-rain';
      break;
    case 232:
      return 'thunderstorms-day-rain';
      break;
    case 300:
    case 301:
      return 'drizzle';
      break;

    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      return 'overcast-rain';
      break;
    case 500:
    case 501:
    case 502:
    case 504:
    case 511:
    case 520:
    case 521:
    case 522:
    case 531:
      return 'overcast-rain';
      break;
    case 600:
    case 601:
    case 602:
    case 611:
    case 613:
    case 612:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      return 'snow';
      break;
    case 701:
      return 'mist';
      break;
    case 711:
      return 'smoke';
      break;
    case 721:
      return 'haze';
      break;
    case 731:
      return 'dust';
      break;
    case 741:
      return 'fog';
      break;
    case 751:
    case 761:
    case 762:
      return 'dust-wind';
      break;
    case 771:
      return 'mist';
      break;
    case 781:
      return 'tornado';
      break;
    case 800:
      return 'clear-day';
      break;
    case 801:
      return 'overcast-day';
      break;
    case 802:
    case 803:
    case 804:
      return 'overcast';
      break;
    default:
      return 'clear-day';
  }
};

export default weatherIcon;
