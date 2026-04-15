const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const User = mongoose.model('User', {
  name: String,
  email: String,
  phone: String,
  city: String,
  role: String,
  message: String
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");

  app.listen(80, () => {
    console.log("Server running on port 80 🚀");
  });

})
.catch(err => {
  console.log("MongoDB Error ❌", err);
});

// ✅ ROUTE ADDED BACK
app.post('/submit', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("Data saved successfully ✅");
  } catch (err) {
    console.error(err);
    res.send("Error saving data ❌");
  }
});