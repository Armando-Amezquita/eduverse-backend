const { Router } = require("express");
const { routerAuth } = require("./Auth.route.js");
const { routerUsers } = require("./Users.route.js");
const { routerSubjects } = require("./Subjects.route.js");
const router = Router();

router.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

router.use("/api/auth", routerAuth);
router.use("/api/users", routerUsers);
router.use("/api/subject", routerSubjects);

module.exports = {
   router
};
