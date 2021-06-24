const getTimezone = () => {
  let date = new Date();
  let offsetInHours: number | string = -date.getTimezoneOffset();
  //tiene minutos
  let hours: number | string = Math.floor(offsetInHours / 60);
  let minutes: number | string = offsetInHours - hours * 60;
  hours =
    hours < 10 && hours >= 0
      ? '0' + hours
      : hours < 0 && hours > -10
      ? '-0' + -hours
      : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  offsetInHours = hours + ':' + minutes;
  return offsetInHours;
};

export default getTimezone;
