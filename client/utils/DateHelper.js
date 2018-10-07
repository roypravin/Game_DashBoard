export const convertDateString = function(dateString) {
  var dateValue = Date.parse(dateString);
  var date = new Date(dateValue);
  var dateReturn = date.toLocaleDateString();
  var timeReturn = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  return dateReturn + ' ' + timeReturn;
}

export const scoreTimeCalculator = function(dateString,second,endSecond) {
  var dateValue = Date.parse(dateString);
  var scoreRecord = {
    scoreStart: new Date(dateValue+second*1000),
    scoreEnd: new Date(dateValue+endSecond*1000)
  }
  return scoreRecord;
}
export const gameDurationCaculator = function(startTime,duration) {
  var dateValue = Date.parse(startTime);
  var endTimePoint = new Date(dateValue + duration);
  return endTimePoint;
}

export const defaultDateString = function(dateString) {
  var dateArray = dateString.split("T");
  return dateArray[0];
}


export const distanceDate = function(arrivalDate,dispatcherDate){
    var startDate = Date.parse(arrivalDate);
    var endDate = Date.parse(dispatcherDate);
    var distance = ((endDate - startDate) / (24 * 3600 * 1000));
    return distance + 1;
}
