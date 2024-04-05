import * as dao from "./dao.js";
let currentUser = null;

export default function UserRoutes(app) {
  // app.get("/api/users", async (req, res) => {
  //   // res.send(db.users);
  //   const wer = await dao.findAllUsers();
  //   res.json(wer);
  // });
  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      console.log("users", users);
      return;
    }

    const users = await dao.findAllUsers();
    res.json(users);
  };
  app.get("/api/users", findAllUsers);

  // app.post("/api/users/profile", async (req, res) => {
  //   console.log("[6] profile");
  //   console.log("[7] req.session", req.session);
  //   if (!req.session.currentUser) {
  //     console.log("[8] Not logged in");
  //     res.status(401).send("Not logged in");
  //     return;
  //   }
  //   console.log("[9] req.session.currentUser", req.session.currentUser);
  //   res.send(req.session.currentUser);
  // });
  const profile = async (req, res) => {
    res.json(currentUser);
  };
  app.post("/api/users/profile", profile);

  app.get("/api/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await dao.findUserById(userId);
    res.send(user);
  });

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  app.get("/api/users/:userId", findUserById);

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  app.delete("/api/users/:userId", deleteUser);

  app.post("/api/users/register", async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await dao.findUserByCredentials(username, password);
    if (existingUser) {
      res.status(400).send("Username already exists");
      return;
    }
    try {
      const newUser = await dao.createUser({ username, password }); //{ username, password, _id: Date.now().toString() };
      req.session["currentUser"] = newUser;
      res.send(newUser);
    } catch (e) {
      console.log("Error Creating User");
    }
  });

  const logout = (req, res) => {
    currentUser = null;
    res.sendStatus(200);
  };
  app.post("/api/users/logout", logout);

  app.post("/api/users/login", async (req, res) => {
    const { username, password } = req.body;
    const ewq = await dao.findUserByCredentials(username, password);
    console.log("ewq", ewq);
    if (ewq) {
      req.session.currentUser = ewq;
      res.send(ewq);
    } else {
      res.status(401).send("Invalid credentials");
    }
  });

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    currentUser = await dao.findUserById(userId);
    res.json(status);
  };
  app.put("/api/users/:userId", updateUser);
}
