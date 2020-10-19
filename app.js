const express = require("express");
const bodyParser = require("body-parser");

const app = express();
// make let item global so that it can be accessed by all functions
let items = ["Buy food", "Cook food"];
let workItems = [];
app.set('view engine', 'ejs');
// required to use body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listTitle: day,
    newListItems: items
  });

  // let currentDay = today.getDay();
  // let day = "";
  // check which day of the week it is
  // switch (currentDay) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //     break;
  //   default:
  //     // checks for errors, writes log in cmd line
  //     console.log("Error: currentDay day is equal to: " + currentDay);
  // }

  // checking to see if it is a weekend
  // if(currentDay === 6 || currentDay === 0) {
  //   day = "Weekend";
  // } else {
  //   day = "Weekday";
  // }
  // res.send("Server is up and running");
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
  // console.log("The user entered: " + req.body.newItem);
  // need to fully initialize body-parser to get to the form submission
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  })
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.listen(3000, function() {
  console.log("Server started at port 3000.");
});
