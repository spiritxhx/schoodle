const uuidv4 = require('uuid/v4');
let randomURL = uuidv4();
console.log(randomURL);

router.post("/", (req, res) => {
  let generateEventURLS = {
    newEventURL: uuidv4(),
    newOwnerURL: uuidv4(),
  };
});

router.get("/:newEventURL", (req, res) => {

  res.render("event-invite");
});

router.get("/:newOwnerURL", (req, res) => {

  res.render("event-invite");
});
