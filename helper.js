const uuidv4 = require('uuid/v4');

// router.post("/", (req, res) => {
//   let generateEventURLS = {
//     newEventURL: uuidv4(),
//     newOwnerURL: uuidv4(),
//   };
// });

let generateEventURLS = () =>{
  return {
    newEventURL: uuidv4().split('-').join(''),
    newOwnerURL: uuidv4().split('-').join('')
  };
};

// router.get("/:newEventURL", (req, res) => {

//   res.render("event-invite");
// });

// router.get("/:newOwnerURL", (req, res) => {

//   res.render("event-invite");
// });

//a format function for the timestamp type in postgresSQL
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

// exports.generateEventURLS = generateEventURLS;
// exports.timeFormatting = timeFormatting;

module.exports = {generateEventURLS, timeFormatting, dateFormatting};
