const express = require("express");
const connectDB = require("./db/conn"); // Import the connectDB function
const User = require("./models/User");
const Product = require('./models/Product')
const faqController = require('./controllers/faqController');
const AuthController = require('./controllers/AuthController');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//Routes
app.post('/faqs', faqController.createFAQ);
app.get('/faqs/category/:category', faqController.getFAQsByCategory);
app.post('/login', AuthController.login);
app.post('/register', AuthController.register);

app.get("/user", async (req, res) => {
  try {
    const usersData = await User.find();
    res.send(usersData);
  } catch (e) {
    res.send(e);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userData = await User.findById(_id);
    console.log(userData)
    if (!userData) {
      return res.status(404).send();
    } else {
      res.send(userData);
    }
  } catch (e) {
    res.send(e);
  }
});

// Create a user
// app.post("/register", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     let result = await user.save();
//     result = result.toObject;
//     delete result.password;
//     res.status(201).send(user);

//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
  
//     if (req.body.email && req.body.password) {
//       let user = await User.findOne(req.body).select("-password");
//       if (user) {
//         res.send(JSON.stringify(user));
//       } else {
//         res.status(404).send({ error: "No user found" });
//       }
//     } else {
//       res.status(400).send({ error: "Invalid request" });
//     }
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });






app.delete("/user/:id", async(req,res) =>{
  try{
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if(!req.params.id){
      return res.status(400).send()
    }
    res.send(deleteUser)
    }catch(e){
      res.status(500).send(e);
    }
     })

  app.post("/add-product", async (req, res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
  })   

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
