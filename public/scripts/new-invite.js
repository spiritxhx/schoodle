
$(document).ready(function () {
  //initially hide the update table and add button
  $('.updateAttendee').hide();
  $('.addBtn').hide();

  //when users click on the update button, switch the table to udpate table
  $('.updateBtn').on('click', () => {
    $('.addAttendee').hide();
    $('.updateAttendee').show();
    $('.addBtn').show();
    $('.updateBtn').hide();
  });

  //when users click on the add button, switch the table to add table
  $('.addBtn').on('click', () => {
    $('.addAttendee').show();
    $('.updateAttendee').hide();
    $('.updateBtn').show();
    $('.addBtn').hide();
  });
});
