const express= require('express');
const AuthController = require('../../controllers/auth/auth.controller');
const useAuth = require('../../utils/middlewares/useAuth');

const authRouter = express.Router();

//username = /
authRouter.get("/",useAuth, AuthController.getAdminUsername)
authRouter.put("/", useAuth, AuthController.setAdminUsername)

authRouter.get("/email", useAuth, AuthController.getAdminEmail)
authRouter.post("/email", useAuth, AuthController.setAdminEmail)

authRouter.put("/reset-password", useAuth, AuthController.setAdminPassword)

authRouter.post("/forgot-password/pin", useAuth, AuthController.checkPin)

authRouter.put("/pin", useAuth, AuthController.setAdminPin)

authRouter.post("/new-password", useAuth, AuthController.setNewPasswordWithPin)

authRouter.post("/login", AuthController.login)

authRouter.post("/logout", useAuth, AuthController.logout)

module.exports = authRouter;