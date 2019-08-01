
//formatting the locale time into a timestamp type
const dateFormatting = date => {
  let ans = "";
  let dateArr = date.split(':');
  ans = (dateArr[0] + ':' + dateArr[1]).toString();
  return ans;
};
const timeFormatting = dateTime => {
  let date = dateTime.slice(0, 10);
  let time = dateTime.slice(11, 16);
  return `${date} ${time}:00`
};

const createInput = (startTime, endTime, num, oriStart, oriEnd) => {
  const $input = $('<input>').attr('name', `time${num}`).val(`${oriStart} + ${oriEnd}`).hide();
  $input.appendTo($('.dateTime'));
  if (num === 1) {
    const $first = $('<p id="choice">').text(`You're chosen time slot:`);
    const $firstInput = $(`<p class="date-selection selection${num}">`).text(`${startTime} to ${endTime}`).hide();
    $first.appendTo($('.dateTime'));
    $firstInput.appendTo($('.dateTime'));
    $firstInput.slideDown();
  } else {
    const $inputed = $(`<p class="date-selection selection${num}">`).text(`${startTime} to ${endTime}`).hide();
    $inputed.appendTo($('.dateTime'));
    $inputed.slideDown();
  }
  // $(`selection${num}`).slideDown();

};

$(document).ready(function () {
  let config = {
    target: 'dateTimePicker',
    utcTimezone: 'America/Montreal',
    future: true,
    smartHours: true
  };
  let myDatepicker = new MtrDatepicker(config);
  let config2 = {
    target: 'dateTimePicker2',
    utcTimezone: 'America/Montreal',
    future: true,
    smartHours: true
  };
  let myDatepicker2 = new MtrDatepicker(config2);

  //initialize the counter for the timeslots
  let numOfTimeSlots = 0;

  //hide the submit button by default
  $('.submitAll').hide();
  $('.addTime').on('click', function () {
    // let startDate = $('#dateTimePicker');
    //add the numOfTimeSlots
    if (new Date(myDatepicker2.toISOString().slice(0,19)).getTime() >= new Date(myDatepicker.toISOString().slice(0,19)).getTime()) {
      numOfTimeSlots++;
      $('.submitAll').show();
      let startDateTime = dateFormatting(myDatepicker.toString());
      let endDateTime = dateFormatting(myDatepicker2.toString());
      let oriStart = (myDatepicker.toISOString());
      let oriEnd = (myDatepicker2.toISOString());

      createInput(startDateTime, endDateTime, numOfTimeSlots, oriStart, oriEnd);
    } else {
      alert("We are not building a time machine! Please pick the end time later than start time!!");
    }
  });
});
