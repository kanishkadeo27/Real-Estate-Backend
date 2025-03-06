import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //! hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //!create a new user and save it in database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      message: "User created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to create user ${error}`,
    });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //! check if the user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    //!check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    //! generate cookie token and send to the user

    // res.setHeader("Set-Cookie", "test=" + "myValue").json({
    //   message: "success",
    // });
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );
    res
      .cookie("token", token, {
        httpOnly: true, //client side js cannot access our cookie
        // secure: true,
        maxAge: age,
      })
      .status(200)
      .json({
        message: "Login Successful",
      });
  } catch (error) {
    res.status(500).json({
      message: `Failed to login ${error}`,
    });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({
    message: "Logout Successfully",
  });
};
