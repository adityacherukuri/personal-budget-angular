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
  ],
};

app.get("/budgetOne", (req, res) => {
  res.json(budget);
});

app.get("/budgetTwo", (req, res) => {
  res.sendFile(
    "C:/Users/kotap/Desktop/NBAD/Week03/personal-budget/budget.json"
  );
});

app.listen(port, () => {
  console.log(`app served at http://localhost:${port}`);
});
