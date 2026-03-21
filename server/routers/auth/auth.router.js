const express= require('express');
const AuthController = require('../../controllers/auth/auth.controller');

const authRouter = express.Router();

//username = /
authRouter.get("/", AuthController.getAdminUsername)
authRouter.put("/", AuthController.setAdminUsername)

authRouter.get("/email", AuthController.getAdminEmail)
authRouter.post("/email", AuthController.setAdminEmail)

authRouter.put("/reset-password", AuthController.setAdminPassword)

authRouter.post("/forgot-password/pin", AuthController.checkPin)

authRouter.put("/pin", AuthController.setAdminPin)

authRouter.post("/new-password", AuthController.setNewPasswordWithPin)

authRouter.post("/login", AuthController.login)

authRouter.post("/logout", AuthController.logout)

module.exports = authRouter;