
//formatting the locale time into a timestamp type
const dateFormatting = date => {
  let ans = "";
  let dateArr = date.split(', ');
  let time = dateArr[0].toString().split('/');
  ans = `${time[2]}-${time[0].length === 1 ? '0' + time[0] : '' + time[0]}-${time[1].length === 1 ? '0' + time[1] : '' + time[1]} ${dateArr[1]}`
  return ans;
};

const createInput = (startTime, endTime, num) => {
  const $input = $('<input>').attr('name', `time${num}`).val(`${startTime} + ${endTime}`).hide();
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
    let startDateTime = dateFormatting(myDatepicker.toLocaleString());
    let endDateTime = dateFormatting(myDatepicker2.toLocaleString());

    createInput(startDateTime, endDateTime, numOfTimeSlots);
  });
});
