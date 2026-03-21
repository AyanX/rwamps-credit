const { desc, eq } = require("drizzle-orm");
const {
  adminEmail,
  adminUsername,
  adminPassword,
  adminPin,
  db,
} = require("../useImports");

const { generateToken, generateRefreshToken } = require("../../utils/jwt/jwt");

const { validEmailToClient, validUsernameToClient } = require("./auth.utils");

const { hashPassword, comparePasswords } = require("../../utils/bcrypt/bcrypt");

class AuthController {
  static async getAdminEmail(req, res) {
    try {
      const email = await db
        .select()
        .from(adminEmail)
        .orderBy(desc(adminEmail.created_at))
        .limit(1);
      if (email.length === 0) {
        return res
          .status(404)
          .json({ error: "Admin email not found", data: null });
      }

      return res.json(validEmailToClient(email));
    } catch (error) {
      console.error("Error fetching admin email:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async setAdminEmail(req, res) {
    try {
      if (!req.body.email) {
        return res.status(400).json({ error: "Email is required" });
      }
      const { email } = req.body;
      await db.insert(adminEmail).values({ email });
      return res.json({
        message: "Admin email set successfully",
        data: req.body,
      });
    } catch (error) {
      console.error("Error setting admin email:", error);
      return res.status(500).json({ message: "Error setting admin email" });
    }
  }

  static async getAdminUsername(req, res) {
    try {
      const username = await db
        .select()
        .from(adminUsername)
        .orderBy(desc(adminUsername.created_at))
        .limit(1);

      if (username.length < 1) {
        return res
          .status(404)
          .json({ error: "Admin username not found", data: null });
      }
      return res.json({ data: validUsernameToClient(username) });
    } catch (error) {
      console.error("Error fetching admin username:", error);
      return res.status(500).json({ message: "Error fetching admin username" });
    }
  }

  static async setAdminUsername(req, res) {
    try {
      if (!req.body.username) {
        return res.status(400).json({ error: "Username is required" });
      }
      const { username } = req.body;
      await db.insert(adminUsername).values({ username });
      return res.json({
        message: "Admin username set successfully",
        data: req.body,
      });
    } catch (error) {
      console.error("Error setting admin username:", error);
      return res.status(500).json({ message: "Error setting admin username" });
    }
  }

  static async setAdminPassword(req, res) {
    try {
      if (!req.body.current_password || !req.body.new_password) {
        return res.status(400).json({ error: "Invalid password format" });
      }
      const currentPassword = await db
        .select()
        .from(adminPassword)
        .orderBy(desc(adminPassword.created_at))
        .limit(1);

      if (currentPassword.length < 1) {
        return res.status(404).json({ error: "Admin password not found" });
      }

      // verify password using bcrypt

      const isPasswordValid = await comparePasswords(
        req.body.current_password,
        currentPassword[0].password,
      );

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Incorrect Password" });
      }
      // hash it using bcrypt
      const hashedPassword = await hashPassword(req.body.new_password);

      await db.insert(adminPassword).values({ password: hashedPassword });
      return res.json({ message: "Admin password set successfully" });
    } catch (error) {
      console.error("Error setting admin password:", error);
      return res.status(500).json({ message: "Error setting admin password" });
    }
  }

  static async setAdminPin(req, res) {
    try {
      if (!req.body.new_pin || !req.body.current_pin) {
        return res.status(400).json({ error: "Invalid pin format" });
      }

      // split new pin and check length is >=4 && <=10 and all are numbers

      const newPinSplit = req.body.new_pin.split("");
      if (newPinSplit.length < 4 || newPinSplit.length > 10) {
        return res
          .status(400)
          .json({ error: "Pin must be between 4 and 10 digits" });
      }

      if (!newPinSplit.every((char) => !isNaN(char))) {
        return res.status(400).json({ error: "Pin must be a number" });
      }

      const currentPin = await db
        .select()
        .from(adminPin)
        .orderBy(desc(adminPin.created_at))
        .limit(1);

      if (currentPin.length < 1) {
        return res.status(404).json({ error: "Admin pin not found" });
      }
      // verify pin using bcrypt

      const isPinValid = await comparePasswords(
        req.body.current_pin,
        currentPin[0].pin,
      );

      if (!isPinValid) {
        return res.status(401).json({ error: "Incorrect Pin" });
      }

      // hash pin using bcrypt and store it

      const hashedPin = await hashPassword(req.body.new_pin);

      await db.insert(adminPin).values({ pin: hashedPin });

      return res.json({ message: "Admin pin set successfully" });
    } catch (error) {
      console.error("Error setting admin pin:", error);
      return res.status(500).json({ message: "Error setting admin pin" });
    }
  }

  static async checkPin(req, res) {
    try {
      if (!req.body.pin) {
        return res.status(400).json({ error: "Pin is required" });
      }

      const currentPin = await db
        .select()
        .from(adminPin)
        .orderBy(desc(adminPin.created_at))
        .limit(1);

      if (currentPin.length < 1) {
        return res.status(404).json({ message: "Admin pin not found" });
      }
      // verify pin using bcrypt

      const isPinValid = await comparePasswords(
        req.body.pin,
        currentPin[0].pin,
      );

      if (!isPinValid) {
        return res.status(401).json({ message: "Incorrect Pin" });
      }

      //generate a random int from 100000 to 999999, bcrypt  hash it and return it as token
      const token = await hashPassword(
        Math.floor(100000 + Math.random() * 900000).toString(),
      );

      // store the token in db under token field of adminPin table i, using fetched currentPin.id
      await db
        .update(adminPin)
        .set({ token })
        .where(eq(adminPin.id, currentPin[0].id));

      return res.json({ message: "Pin verified", token});
    }catch (error) {
      console.error("Error checking admin pin:", error);
      return res.status(500).json({ message: "Error checking admin pin" });
    }
  }

  static async setNewPasswordWithPin(req, res) {
    try {
      if(!req.body.token || !req.body.new_password || !req.body.password) {
        return res.status(400).json({ error: "Invalid request format" });
      }
      //verify passwords match
        if (req.body.new_password !== req.body.password) {
          return res.status(400).json({ message: "Passwords do not match" });
        }
      // verify token from req.body with the token stored in db for adminPin

      const currentPin = await db
        .select()
        .from(adminPin)
        .orderBy(desc(adminPin.created_at))
        .limit(1);

      if (currentPin.length < 1) {
        return res.status(404).json({ message: "Admin pin not found" });
      }

      const isTokenValid = req.body.token === currentPin[0].token;

      if (!isTokenValid) {
        return res.status(401).json({ message: "Invalid token" });
      }


      // here token is verified, now change the password

      // hash it using bcrypt
      const hashedPassword = await hashPassword(req.body.new_password);

      await db.insert(adminPassword).values({ password: hashedPassword });

      // delete the token from db

      await db
        .update(adminPin)
        .set({ token: null })
        .where(eq(adminPin.id, currentPin[0].id));

      return res.json({ message: "Admin password set successfully" });













    } catch (error) {
      console.error("Error setting new password with pin:", error);
      return res.status(500).json({ message: "Error setting new password with pin" });
    }
  }

  static async login(req, res) {
    try {
      if (!req.body.email || !req.body.password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }
      const email = await db
        .select()
        .from(adminEmail)
        .orderBy(desc(adminEmail.created_at))
        .limit(1);

      if (email.length < 1) {
        return res.status(404).json({ error: "Admin email not found" });
      }

      const password = await db
        .select()
        .from(adminPassword)
        .orderBy(desc(adminPassword.created_at))
        .limit(1);

      if (password.length < 1) {
        return res.status(404).json({ error: "Admin password not found" });
      }

      // check emails match
      if (email[0].email !== req.body.email) {
        return res.status(401).json({ error: "Incorrect Login credentials" });
      }
      //check password using bcrypt

      const isPasswordValid = await comparePasswords(
        req.body.password,
        password[0].password,
      );

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Incorrect Login credentials" });
      }
      // cookies implementaation

      const token = generateToken({
        email: email[0].email,
      });

      const refreshToken = generateRefreshToken({
        email: email[0].email,
        name: "admin",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "Lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 1000 * 60 * 10, // 10 minutes
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          path: "/",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

      return res.json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Error during login" });
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
      }) 
      //TODO clear ref token

      return res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error during logout:", error);
      return res.status(500).json({ message: "Error during logout" });
    }
  }
}

module.exports = AuthController;
