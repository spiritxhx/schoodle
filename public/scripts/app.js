
//formatting the locale time into a timestamp type
const dateFormatting = date => {
  let ans = "";
  let dateArr = date.split(':');
  ans = (dateArr[0]+':'+dateArr[1]).toString();
  return ans;
};
const timeFormatting = dateTime => {
  let date = dateTime.slice(0, 10);
  let time = dateTime.slice(11, 16);
  return `${date} ${time}:00`
};

const createInput = (startTime, endTime, num, oriStart, oriEnd) => {
  const $input = $('<input>').attr('name', `time${num}`).val(`${oriStart} + ${oriEnd}`).hide();
  const $inputed = $('<p>').text(`You have chosen a time slot from ${startTime} to ${endTime} for your event!`);

  $input.appendTo($('.dateTime'));
  $inputed.appendTo($('.dateTime'));
};

$(document).ready(function () {
  let config = {
    target: 'dateTimePicker',
    utcTimezone: 'America/Montreal',
    future: true
  };
  let myDatepicker = new MtrDatepicker(config);
  let config2 = {
    target: 'dateTimePicker2',
    utcTimezone: 'America/Montreal',
    future: true
  };
  let myDatepicker2 = new MtrDatepicker(config2);

  //initialize the counter for the timeslots
  let numOfTimeSlots = 0;

  //hide the submit button by default
  $('.submitAll').hide();
  $('.addTime').on('click', function () {
    // let startDate = $('#dateTimePicker');
    $('.submitAll').show();

    //add the numOfTimeSlots
    numOfTimeSlots++;
    let startDateTime = dateFormatting(myDatepicker.toString());
    let endDateTime = dateFormatting(myDatepicker2.toString());
    let oriStart = timeFormatting(myDatepicker.toISOString());
    let oriEnd = timeFormatting(myDatepicker2.toISOString());

    createInput(startDateTime, endDateTime, numOfTimeSlots, oriStart, oriEnd);
  });
});
