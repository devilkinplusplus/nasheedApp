import moment from 'moment-hijri';

export function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export const currentDate = () =>{
  const today = new Date();

  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'long' }); 
  const year = today.getFullYear(); 

  return `${day} ${month} ${year}`
}

export const currentHijriDate = () =>{
  const today = moment(); 
  moment.locale('en');
  const hijriDate = today.format('iD iMMMM iYYYY');
  return hijriDate;
}