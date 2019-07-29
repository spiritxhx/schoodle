
//formatting the locale time into a timestamp type
const dateFormatting = date => {
  let ans = "";
  let dateArr = date.split(', ');
  let time = dateArr[0].toString().split('/');
  ans = `${time[2]}-${time[0].length === 1 ? '0' + time[0] : '' + time[0]}-${time[1]} ${dateArr[1]}`
  return ans;
};

const createInput = (startTime, endTime) => {
  const $startInput = $('<input>');
  const $endInput = $('<input>');
  const $inputed = $('<p>').text('this is a test');

  $inputed.appendTo($('.dateTime'));
};

$(document).ready(function () {
  let config = {
    target: 'dateTimePicker',
    utcTimezone: 'America/Montreal',
    disableAmPm: true
  };
  let myDatepicker = new MtrDatepicker(config);
  let config2 = {
    target: 'dateTimePicker2',
    utcTimezone: 'America/Montreal',
    disableAmPm: true
  };
  let myDatepicker2 = new MtrDatepicker(config2);
  let numOfTimeSlots = 0;
  $('.addTime').on('click', function () {
    // let startDate = $('#dateTimePicker');
    let startDateTime = dateFormatting(myDatepicker.toLocaleString());
    let endDateTime = dateFormatting(myDatepicker2.toLocaleString());

    createInput(startDateTime, endDateTime);

    console.log(dateFormatting(myDatepicker.toLocaleString()));
    console.log(myDatepicker2.toLocaleString());
  })
});
