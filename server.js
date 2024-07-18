const express = require("express");
const app = express();
const users = require("./users.json");

app.get("/", (request, response) => {
  const _users = [...users];
  _users.forEach((user) => {
    user.id = Math.round(Math.random() * 100);
  });
  response.send(users);
});

app.delete("/:id", (request, response) => {
  console.log("new delete request", request.params.id);
  const { id } = request.params;

  const indexOf = users.findIndex((user) => {
    return user.id === Number(id);
  });

  users.splice(indexOf, 1);

  response.send(users);
});

//====================================

const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
