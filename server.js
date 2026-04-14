const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const User = mongoose.model('User', {
  name: String,
  email: String,
  phone: String,
  city: String,
  role: String,
  message: String
});

app.post('/submit', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("Data saved successfully!");
});

app.listen(80, () => console.log("Server running on port 80"));