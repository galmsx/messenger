export default function(dateString) {
  if(!dateString) return ' ';
  const date = new Date(dateString);
  return date.getHours() + ':' + date.getMinutes() + ' | ' + getDay(date);
}

function getDay(date) {
  const currentDate = new Date();

  if(date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth()){
    return 'Today';
  }
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  const monthName = month[date.getMonth()];
  return monthName + ' ' + date.getDate();
}
