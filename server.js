const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();

const database = {
  users: [
    {
      id: 123,
      name: "john",
      email: "john@example.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: 124,
      name: "sally",
      email: "sally@example.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.use(cors());
// app.use(console.log);
app.use(express.json());

app.get("/", (req, res) => {
  res.json(database.users);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === Number(id)) {
      found = true;
      return res.json(user);
    }
  });
});

app.post("/signin", (req, res) => {
  // console.log(req);
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]).status(200);
  } else {
    res.status(400).json("Error logging in");
  }
});

app.post("/register", (req, res) => {
  const { name, password, email } = req.body;

  bcrypt.hash(password, null, null, function (err, hash) {
    console.log(hash);
  });

  database.users.push({
    id: 125,
    name: name,
    email: email,
    // password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.put("/image/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === Number(id)) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

app.listen(3000, () => {
  console.log("Server is running and listening on port 3000!");
});

/*
/ --> respond with "This is working!"
/signin --> POST = success or fail
/register --> POST = user 
/profile/:userID --> GET = user
/image --> PUT = user
*/
