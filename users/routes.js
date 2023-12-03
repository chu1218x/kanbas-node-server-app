import * as dao from './dao.js';

// let currentUser = null;

function UserRoutes(app) {

    const updateUser = async (req, res) => {
        const id = req.params.id;
        const newUser = req.body;
        const status = await dao.updateUser(id, newUser);
        const currentUser = await dao.findUserById(id);
        req.session["currentUser"] = currentUser;
        res.json(status);
    };


    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const{userId} = req.params;
        const user = await dao.findUserById(userId);
        res.json(user);
    };
    const createUser = async (req, res) => {
        const {username, password, email, role} = req.params;
        const newUser = await dao.createUser({
            username,
            password,
            email,
            role
        });
        res.json(newUser);
    };
    // const createUser = async (req, res) => {
    //     const user = await dao.createUser(req.body);
    //     res.json(user);
    //   };
    

    const updateFirstName = async (req, res) => {
        const id = req.params.id;
        const newFirstname = req.params.newFirstname;
        const status = await dao.updateUser(id, {firstName:newFirstname});
        res.json(status);
    };

    const deleteUser = async (req, res) => {
        const id = req.params.id;
        const status = await dao.deleteUser(id);
        res.json(status);   
    }

    const signin = async (req, res) => {
        const {username, password} = req.body;
        const user = await dao.findUserByCredentials(username, password);
        if(user) {
            const currentUser = user;
            req.session["currentUser"] = currentUser;
            res.json(user);
        } else {
            res.sendStatus(403);
        }
    }

    const signout = async (req, res) => {
        // currentUser = null;
        req.session.destroy();
        res.sendStatus(200);
    }

    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(
          req.body.username);
        if (user) {
          res.status(400).json(
            { message: "Username already taken" });
        }
        const currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
      };
    

    const account = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if(!currentUser) {
            res.sendStatus(403);
            return;
        }
        res.json(currentUser);
    }


    app.post("/api/users/signin", signin);
    app.post("/api/users/account", account);
    app.post("/api/users/signout", signout);
    app.post("/api/users/signup", signup);

    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.get("/api/users/:username/:password/:email/:role", createUser)
    app.post("/api/users", createUser);
    app.get("/api/users/updateFirstName/:id/:newFirstname", updateFirstName);
    app.put("/api/users/:id", updateUser);
    app.delete("/api/users/:id", deleteUser);
}

export default UserRoutes;