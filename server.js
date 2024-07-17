const express = require("express");
const app = express();
const users = require("./users.json");

app.get("/", (request, response) => {
  const _users = [...users];
  _users.forEach((user) => {
    user.id = Math.random();
  });
  response.send(users);
});

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
