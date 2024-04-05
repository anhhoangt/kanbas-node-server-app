import Database from "../Database/index.js";
export default function UsersRoutes(app) {
  const fetchAllUsers = (req, res) => {
    const users = Database.users;
    res.json(users);
  };
  const findUserById = (req, res) => {
    const { uid } = req.params;
    const user = Database.users.find((user) => user._id === uid);
    if (!user) {
      res.status(404).send(`User ${uid} not found`);
    } else {
      res.json(user);
    }
  };
  app.get("/api/users", fetchAllUsers);
  app.get("/api/users/:id", findUserById);

  app.post("/api/users/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send("Username and password are required");
      return;
    } else if (Database.users.find((u) => u.username === username)) {
      res.status(400).send("Username already exists");
      return;
    }
    const newUser = { username, password, _id: Date.now().toString() };
    Database.users.push(newUser);
    req.session["currentUser"] = newUser;
    res.send(newUser);
  });

  app.post("/api/users/profile", (req, res) => {
    if (!req.session.currentUser) {
      res.status(401).send("Not logged in");
      return;
    }
    res.send(req.session.currentUser);
  });

  app.post("/api/users/logout", (req, res) => {
    req.session.destroy();
    res.send("Logged out");
  });

  app.post("/api/users/login", (req, res) => {
    const { username, password } = req.body;
    const user = Database.users.find(
      (user) => user.username === username && user.password === password
    );
    if (!user) {
      res.status(401).send("Invalid username or password");
    } else {
      req.session.currentUser = user;
      res.send(user);
    }
  });
}
