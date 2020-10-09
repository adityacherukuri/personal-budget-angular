const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use("/", express.static("public"));
const budget = {
  myBudget: [
    {
      title: "Eat Out",
      budget: 150,
    },
    {
      title: "Rent",
      budget: 500,
    },
    {
      title: "Groceries",
      budget: 200,
    },
    {
      title: "Entertainment",
      budget: 100,
    },
    {
      title: "Maintenance",
      budget: 200,
    },
    {
      title: "Clothing",
      budget: 350,
    },
    {
      title: "Travel",
      budget: 350,
    },
  ],
};

// app.get("/budget", (req, res) => {
//   res.json(budget);
// });

app.get("/budget", (req, res) => {
  res.sendFile(
    "C:/Users/kotap/Desktop/NBAD/personal-budget-angular/server/budget.json"
  );
});

app.listen(port, () => {
  console.log(`app served at http://localhost:${port}`);
});
