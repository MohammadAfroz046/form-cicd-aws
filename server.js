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

// ✅ FIX: Start server ONLY after DB connects
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected ✅");

  app.listen(80, () => {
    console.log("Server running on port 80 🚀");
  });

})
.catch(err => {
  console.log("MongoDB Error ❌", err);
});