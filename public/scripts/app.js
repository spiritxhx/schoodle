// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

//formatting the locale time into a timestamp type
const dateFormatting = date =>{
  let ans = "";
  let dateArr = date.split(', ');
  let time = dateArr[0].toString().split('/');
  ans=`${time[2]}-${time[0].length===1?'0'+time[0]:''+time[0]}-${time[1]} ${dateArr[1]}`
  return ans;
};

$(document).ready(function() {
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
  $('.addTime').on('click', function() {
    // let startDate = $('#dateTimePicker');
    let startDateTime = dateFormatting(myDatepicker.toLocaleString());
    let endDateTime = dateFormatting(myDatepicker2.toLocaleString())
    console.log(dateFormatting(myDatepicker.toLocaleString()));
    console.log(myDatepicker2.toLocaleString());
  })
});
