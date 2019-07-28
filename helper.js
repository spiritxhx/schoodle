const uuidv4 = require('uuid/v4');

// router.post("/", (req, res) => {
//   let generateEventURLS = {
//     newEventURL: uuidv4(),
//     newOwnerURL: uuidv4(),
//   };
// });

let generateEventURLS = () =>{
  return {
    newEventURL: uuidv4(),
    newOwnerURL: uuidv4()
  };
};
exports.generateEventURLS = generateEventURLS;

// router.get("/:newEventURL", (req, res) => {

//   res.render("event-invite");
// });

// router.get("/:newOwnerURL", (req, res) => {

//   res.render("event-invite");
// });
