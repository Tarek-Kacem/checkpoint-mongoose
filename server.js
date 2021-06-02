const mongoose = require("mongoose");
const express = require("express");
const app = express();
const user = require("./models/user");

app.use(express.json());
require("dotenv").config({ path: "./config.env" });
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  console.log("connect DB")
);

// user.create({ name: "nour", age: 28, favoriteFoods: ["soupe", "couscous","burritos"] });
// app.get("/", (req, res) => {
//   res.send("hi");
// });

app.get("/users", (req, res) => {
  user.find((err, data) => {
    res.json(data);
  });
});

app.get("/users/foods/:food", (req, res) => {
  user.findOne({ favoriteFoods: req.params.food }, (err, data) => {
    res.json(data);
  });
});

// app.get("/:id", (req, res) => {
//   user.findById({_id: req.params.id},(err, data) => {
//     err ? console.log(err) : res.json(data);
//   });
// });

// app.put("/:id", (req, res) => {
//   user.findById(req.params.id, (err, data) => {
//     console.log(req.params.id);
//     data.favoriteFoods.push(req.body.food);
//     data.save().then((user) => {
//       console.log(user);
//       res.send(user);
//     });
//   });
// });

// app.put("/:name", (req, res) => {
//   user.findOneAndUpdate({name: req.params.name}, {age: 20}, {new: true}, (error,data) => {
//     if(error) {
//       console.log(error)
//     }else{
//       console.log(data)
//     }
//   });
// });

// app.put("/:id", (req, res) => {
//   user.findByIdAndRemove(req.params.id, (error,data) => {
//     if(error) {
//       console.log(error)
//     }else{
//       console.log(data)
//       res.status(200).json(data)
//     }
//   });
// });

// app.put("/remove", (req, res) => {
//   user.remove({name : "tarek"}, (error,data) => {
//     if(error) {
//       console.log(error)
//     }else{
//       console.log(data)
//       res.status(200).json(data)
//     }
//   });
// });

app.put("/filter", (req, res) => {
  user.find({favoriteFoods : {$all : ["burritos"]}})
  .sort({age: "asc"})
  .limit(2)
  .select("-age")
  .exec((error, data) => {
    if(!error) {
      console.log(data)
      res.status(200).json(data)
    }
  })
});

app.post("/user", (req, res) => {
  const newUser = new user(req.body);
  newUser.save().then(res.json(req.body));
});

app.listen("5000", () => console.log("server conect"));
