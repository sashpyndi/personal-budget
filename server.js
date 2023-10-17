// Budget API
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mongoose = require('mongoose');
app.use(cors());
app.use('/', express.static('public'));
app.use(express.json());
let url =  "mongodb://127.0.0.1:27017/personal_budget_db";
const budgetModel = ("./models/budgetSchema");



mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, }).then(() => {
  console.log("Connected to the database");
})
.catch((connectionError)=>{
   console.log(connectionError);
});
/*const budget = {
  myBudget: [
    {
      title: "Eat out",
      budget: 30,
    },
    {
      title: "Rent",
      budget: 350,
    },
    {
      title: "Rent",
      budget: 90,
    },
  ], 
};*/
/*app.post('/post' , async(req, res)=>{
    console.log('posting the data to the database');
    const newData = budgetModel({
       title: req.body.name,
       budget: req.body.budget,
       color: req.body.color
    })
});*/
app.post('/credit', async (req, res) => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


    console.log("in post");
    console.log(req.body);
    
    const newChart = new budgetModel({
      title: req.body.title,
      value: req.body.value,
      color: req.body.color,
    });

    
    await newChart.save();

    
    await mongoose.connection.close();

    res.json(newChart);
  } catch (error) {
   
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/budget', (req, res) => {
  const budget = require('./budget.json');
  res.json(budget);
  res.json(budget)
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
