const express = require("express");
const app = express();
const port = 3000;

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
  ],
};

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/budgetOne", (req, res) => {
  res.json(budget);
});

app.get("/budgetTwo", (req, res) => {
  res.sendFile(
    "C:/Users/kotap/Desktop/NBAD/Week03/personal-budget/budget.json"
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
